"use client";

import { useState, useCallback, useEffect } from "react";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { ethers } from "ethers";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { useZamaInstance } from "@/hooks/useZamaInstance";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { EncryptedIdentityAuthAddresses } from "@/abi/EncryptedIdentityAuthAddresses";
import { EncryptedIdentityAuthABI } from "@/abi/EncryptedIdentityAuthABI";
import { FhevmDecryptionSignature } from "@/fhevm/FhevmDecryptionSignature";

export const IdentityAuth = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const ethersSignerPromise = useEthersSigner();
  const { instance: zama, isLoading: zamaLoading, error: zamaError } = useZamaInstance();
  const { storage } = useInMemoryStorage();

  const [userIdentity, setUserIdentity] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rpcError, setRpcError] = useState<string | null>(null);
  const [encryptedHandle, setEncryptedHandle] = useState<string | null>(null);
  const [encryptedResultHandle, setEncryptedResultHandle] = useState<string | null>(null);
  const [decryptedResult, setDecryptedResult] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState<string>("");

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get contract address based on current chain
  useEffect(() => {
    if (chainId && isMounted) {
      const entry = EncryptedIdentityAuthAddresses[chainId.toString() as keyof typeof EncryptedIdentityAuthAddresses];
      if (entry && "address" in entry && entry.address !== ethers.ZeroAddress) {
        setContractAddress(entry.address);
      } else {
        setContractAddress(undefined);
      }
    } else if (!chainId && isMounted) {
      setContractAddress(undefined);
    }
  }, [chainId, isMounted]);

  // Check registration status
  const checkRegistration = useCallback(async () => {
    if (!contractAddress || !address || !publicClient) return;

    try {
      setRpcError(null);
      const registered = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: EncryptedIdentityAuthABI.abi,
        functionName: "isRegistered",
        args: [address as `0x${string}`],
      });
      setIsRegistered(registered as boolean);
    } catch (error: unknown) {
      setIsRegistered(false);

      // Check if it's a network/RPC error
      const errorMessage = error instanceof Error ? error.message : "";
      const isNetworkError =
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("fetch failed") ||
        errorMessage.includes("ECONNREFUSED") ||
        (error instanceof Error && 'code' in error && error.code === "NETWORK_ERROR");
      
      if (isNetworkError) {
        if (chainId === 31337) {
          setRpcError("Hardhat node is not running. Please start it with: npx hardhat node");
        } else {
          setRpcError("Failed to connect to RPC. Please check your network connection.");
        }
        // Don't log network errors to console as they're expected when node is not running
      } else {
        // Only log non-network errors
        console.error("Error checking registration:", error);
      }
    }
  }, [contractAddress, address, publicClient, chainId]);

  useEffect(() => {
    if (isConnected && contractAddress) {
      checkRegistration();
    }
  }, [isConnected, contractAddress, checkRegistration]);

  const handleRegister = useCallback(async () => {
    if (!userIdentity) {
      setMessage("⚠️ Please enter your identity number");
      return;
    }

    if (!isConnected || !address) {
      setMessage("⚠️ Please connect your wallet first");
      return;
    }

    if (!contractAddress) {
      setMessage("⚠️ Contract not deployed on this network. Please switch to the correct network or deploy the contract.");
      return;
    }

    if (zamaLoading) {
      setMessage("⏳ Please wait while the encryption system is loading... This may take a few seconds.");
      return;
    }

    if (!zama) {
      if (zamaError) {
        const errorMsg = zamaError instanceof Error ? zamaError.message : String(zamaError);
        setMessage(`⚠️ Encryption system initialization failed: ${errorMsg}. Please check your network connection and try refreshing the page.`);
      } else if (zamaLoading) {
        setMessage("⏳ Encryption system is loading... Please wait.");
      } else {
        setMessage("⚠️ Encryption system is not ready. Please wait a moment for the encryption system to initialize. If this persists, try refreshing the page.");
      }
      return;
    }

    if (!ethersSignerPromise) {
      setMessage("⚠️ Wallet signer is not available. Please reconnect your wallet.");
      return;
    }

    const identityNum = parseInt(userIdentity);
    if (isNaN(identityNum) || identityNum < 0) {
      setMessage("⚠️ Identity must be a positive number");
      return;
    }

    setIsRegistering(true);
    setCurrentStep("encrypting");
    setMessage("Encrypting identity...");
    setEncryptedHandle(null);

    try {
      const signer = await ethersSignerPromise;
      const contract = new ethers.Contract(
        contractAddress,
        EncryptedIdentityAuthABI.abi,
        signer
      );

      // Encrypt identity
      setCurrentStep("encrypting");
      setMessage(`Encrypting identity "${identityNum}" locally...`);
      const input = zama.createEncryptedInput(contractAddress, address);
      input.add32(identityNum);
      const encrypted = await input.encrypt();
      
      // Store encrypted handle for display
      const handleString = Array.from(encrypted.handles[0]).map(b => b.toString(16).padStart(2, '0')).join('');
      setEncryptedHandle(handleString);
      setMessage(`✓ Encrypted! Handle: ${handleString.slice(0, 20)}...`);

      setCurrentStep("registering");
      setMessage("Sending encrypted identity to blockchain...");
      const tx = await contract.register(encrypted.handles[0], encrypted.inputProof);
      setMessage(`Transaction sent: ${tx.hash}. Waiting for confirmation...`);

      await tx.wait();
      setCurrentStep("complete");
      setMessage("✓ Registration successful! Your encrypted identity is now stored on-chain.");
      setIsRegistered(true);
      // Refresh registration status
      await checkRegistration();
    } catch (error: unknown) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed";
      let errorDetails = "";

      if (error instanceof Error) {
        const errorStr = error.message.toLowerCase();
        
        // Handle user rejection
        if (errorStr.includes("user rejected") || errorStr.includes("user denied") || errorStr.includes("action rejected")) {
          errorMessage = "❌ Transaction rejected";
          errorDetails = "You cancelled the transaction. Please try again if you want to proceed.";
        }
        // Handle insufficient funds
        else if (errorStr.includes("insufficient funds") || errorStr.includes("balance")) {
          errorMessage = "❌ Insufficient funds";
          errorDetails = "You don't have enough funds to pay for the transaction gas fees.";
        }
        // Handle network errors
        else if (errorStr.includes("network") || errorStr.includes("rpc") || errorStr.includes("connection")) {
          errorMessage = "❌ Network error";
          if (chainId === 31337) {
            errorDetails = "Cannot connect to Hardhat node. Please make sure it's running with: npx hardhat node";
          } else {
            errorDetails = "Failed to connect to the blockchain network. Please check your internet connection and try again.";
          }
        }
        // Handle encryption errors
        else if (errorStr.includes("encrypt") || errorStr.includes("fhevm") || errorStr.includes("relayer")) {
          errorMessage = "❌ Encryption error";
          errorDetails = "Failed to encrypt your identity. This might be due to network issues with the encryption service. Please try again.";
        }
        // Handle contract errors
        else if (errorStr.includes("already registered") || errorStr.includes("duplicate")) {
          errorMessage = "⚠️ Already registered";
          errorDetails = "This identity is already registered. You can verify it using the verification section below.";
          setIsRegistered(true);
          await checkRegistration();
        }
        // Generic error
        else {
          errorMessage = "❌ Registration failed";
          errorDetails = error.message;
        }
      } else {
        errorDetails = String(error);
      }

      setMessage(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
      setCurrentStep("");
    } finally {
      setIsRegistering(false);
    }
  }, [userIdentity, zama, zamaLoading, zamaError, ethersSignerPromise, contractAddress, address, isConnected, chainId, checkRegistration]);

  const handleVerify = useCallback(async () => {
    if (!userIdentity) {
      setMessage("⚠️ Please enter your identity number");
      return;
    }

    if (!isConnected || !address) {
      setMessage("⚠️ Please connect your wallet first");
      return;
    }

    if (!contractAddress) {
      setMessage("⚠️ Contract not deployed on this network. Please switch to the correct network or deploy the contract.");
      return;
    }

    if (zamaLoading) {
      setMessage("⏳ Please wait while the encryption system is loading... This may take a few seconds.");
      return;
    }

    if (!zama) {
      if (zamaError) {
        const errorMsg = zamaError instanceof Error ? zamaError.message : String(zamaError);
        setMessage(`⚠️ Encryption system initialization failed: ${errorMsg}. Please check your network connection and try refreshing the page.`);
      } else if (zamaLoading) {
        setMessage("⏳ Encryption system is loading... Please wait.");
      } else {
        setMessage("⚠️ Encryption system is not ready. Please wait a moment for the encryption system to initialize. If this persists, try refreshing the page.");
      }
      return;
    }

    if (!ethersSignerPromise) {
      setMessage("⚠️ Wallet signer is not available. Please reconnect your wallet.");
      return;
    }

    const identityNum = parseInt(userIdentity);
    if (isNaN(identityNum) || identityNum < 0) {
      setMessage("⚠️ Identity must be a positive number");
      return;
    }

    setIsVerifying(true);
    setCurrentStep("encrypting");
    setMessage("Encrypting identity for verification...");
    setEncryptedHandle(null);
    setEncryptedResultHandle(null);
    setDecryptedResult(null);

    try {
      const signer = await ethersSignerPromise;
      const contract = new ethers.Contract(
        contractAddress,
        EncryptedIdentityAuthABI.abi,
        signer
      );

      // Step 1: Encrypt identity
      setCurrentStep("encrypting");
      setMessage(`Step 1/3: Encrypting identity "${identityNum}" locally...`);
      const input = zama.createEncryptedInput(contractAddress, address);
      input.add32(identityNum);
      const encrypted = await input.encrypt();
      const handleString = Array.from(encrypted.handles[0]).map(b => b.toString(16).padStart(2, '0')).join('');
      setEncryptedHandle(handleString);
      setMessage(`✓ Step 1 Complete: Encrypted! Handle: ${handleString.slice(0, 20)}...`);

      // Step 2: Verify on-chain (FHE comparison)
      setCurrentStep("verifying");
      setMessage("Step 2/3: Comparing encrypted identities on-chain (FHE operation)...");
      
      // Call verify function - it returns an ebool (handle string)
      // In ethers.js, non-view functions that return values will return the value after transaction confirmation
      const verifyResult = await contract.verify(encrypted.handles[0], encrypted.inputProof);
      
      // Extract the handle string from the result
      // The result should be a string (handle), but handle different return types
      let encryptedResult: string;
      if (typeof verifyResult === 'string') {
        encryptedResult = verifyResult;
      } else if (verifyResult && typeof verifyResult === 'object') {
        // If it's an object, it might be a transaction response
        // Wait for it and try to get the return value
        if ('wait' in verifyResult) {
          await verifyResult.wait();
          // Try to extract return value from receipt
          // For FHE contracts, the return value is usually the handle string
          // We might need to decode it from logs or use a different approach
          // For now, let's use staticCall to get the return value without sending a transaction
          const staticResult = await contract.verify.staticCall(encrypted.handles[0], encrypted.inputProof);
          encryptedResult = typeof staticResult === 'string' ? staticResult : String(staticResult);
        } else {
          encryptedResult = String(verifyResult);
        }
      } else {
        encryptedResult = String(verifyResult);
      }
      
      setEncryptedResultHandle(encryptedResult);
      setMessage(`✓ Step 2 Complete: FHE comparison done! Encrypted result handle: ${encryptedResult.slice(0, 20)}...`);

      // Step 3: Decrypt result
      setCurrentStep("decrypting");
      setMessage("Step 3/3: Decrypting verification result locally...");
      
      // Get decryption signature
      const sig = await FhevmDecryptionSignature.loadOrSign(
        zama,
        [contractAddress],
        signer,
        storage
      );

      if (!sig) {
        setMessage("Failed to get decryption signature");
        return;
      }

      // Decrypt result - ensure encryptedResult is a string
      const resultHandle = typeof encryptedResult === 'string' ? encryptedResult : String(encryptedResult);
      const result = await zama.userDecrypt(
        [{ handle: resultHandle, contractAddress }],
        sig.privateKey,
        sig.publicKey,
        sig.signature,
        sig.contractAddresses,
        sig.userAddress,
        sig.startTimestamp,
        sig.durationDays
      );

      const isValid = result[resultHandle] === true;
      setDecryptedResult(isValid);
      setVerificationResult(isValid);
      setCurrentStep("complete");
      setMessage(isValid 
        ? "✓ Step 3 Complete: Decrypted result = true. Verification successful! Identity matches." 
        : "✓ Step 3 Complete: Decrypted result = false. Verification failed. Identity does not match.");
    } catch (error: unknown) {
      console.error("Verification error:", error);
      
      let errorMessage = "Verification failed";
      let errorDetails = "";

      if (error instanceof Error) {
        const errorStr = error.message.toLowerCase();
        
        // Handle user rejection
        if (errorStr.includes("user rejected") || errorStr.includes("user denied") || errorStr.includes("action rejected")) {
          errorMessage = "❌ Transaction rejected";
          errorDetails = "You cancelled the transaction. Please try again if you want to proceed.";
        }
        // Handle insufficient funds
        else if (errorStr.includes("insufficient funds") || errorStr.includes("balance")) {
          errorMessage = "❌ Insufficient funds";
          errorDetails = "You don't have enough funds to pay for the transaction gas fees.";
        }
        // Handle network errors
        else if (errorStr.includes("network") || errorStr.includes("rpc") || errorStr.includes("connection")) {
          errorMessage = "❌ Network error";
          if (chainId === 31337) {
            errorDetails = "Cannot connect to Hardhat node. Please make sure it's running with: npx hardhat node";
          } else {
            errorDetails = "Failed to connect to the blockchain network. Please check your internet connection and try again.";
          }
        }
        // Handle encryption errors
        else if (errorStr.includes("encrypt") || errorStr.includes("decrypt") || errorStr.includes("fhevm") || errorStr.includes("relayer")) {
          errorMessage = "❌ Encryption/Decryption error";
          errorDetails = "Failed to encrypt or decrypt your identity. This might be due to network issues with the encryption service. Please try again.";
        }
        // Handle contract errors
        else if (errorStr.includes("not registered")) {
          errorMessage = "⚠️ Identity not registered";
          errorDetails = "This identity has not been registered yet. Please register it first using the registration section above.";
        }
        // Generic error
        else {
          errorMessage = "❌ Verification failed";
          errorDetails = error.message;
        }
      } else {
        errorDetails = String(error);
      }

      setMessage(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
      setVerificationResult(null);
      setCurrentStep("");
    } finally {
      setIsVerifying(false);
    }
  }, [userIdentity, zama, zamaLoading, zamaError, ethersSignerPromise, contractAddress, address, isConnected, chainId, storage]);

  // Prevent hydration mismatch - show loading state until mounted
  if (!isMounted) {
    return (
      <div className="mx-auto mt-20 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Loading...</h2>
          <p className="text-gray-600">Initializing application...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="mx-auto mt-20 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet using the button in the top right corner to get started.</p>
        </div>
      </div>
    );
  }

  if (!contractAddress) {
    const chainName = chainId === 31337 ? "Hardhat Local" : chainId === 11155111 ? "Sepolia Testnet" : `Chain ID ${chainId || "unknown"}`;
    return (
      <div className="mx-auto mt-20 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Contract Not Deployed</h2>
          <p className="text-gray-600 mb-4">
            The contract is not deployed on {chainName}. Please deploy it first or switch to the correct network.
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p><strong>Supported Networks:</strong></p>
            <p>• Hardhat Local (Chain ID: 31337) - For local development</p>
            <p>• Sepolia Testnet (Chain ID: 11155111) - For testing</p>
          </div>
        </div>
      </div>
    );
  }

  const buttonClass =
    "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg " +
    "transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

  return (
    <div className="grid w-full gap-6">
      <div className="col-span-full mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Encrypted Identity Authentication
          </h2>

          {rpcError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-red-800">RPC Connection Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{rpcError}</p>
                    {chainId === 31337 && (
                      <div className="mt-3 p-3 bg-red-100 rounded-md">
                        <p className="font-semibold mb-1">To start Hardhat node:</p>
                        <code className="text-xs block bg-white p-2 rounded border border-red-200">
                          cd pro15 && npx hardhat node
                        </code>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setRpcError(null)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {zamaError && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-orange-800">Encryption System Initialization Error</h3>
                  <div className="mt-2 text-sm text-orange-700">
                    <p>{zamaError instanceof Error ? zamaError.message : String(zamaError)}</p>
                    {chainId === 31337 && (
                      <div className="mt-3 p-3 bg-orange-100 rounded-md">
                        <p className="font-semibold mb-1">For local Hardhat node:</p>
                        <code className="text-xs block bg-white p-2 rounded border border-orange-200">
                          cd pro15 && npx hardhat node
                        </code>
                      </div>
                    )}
                    <div className="mt-3 p-3 bg-orange-100 rounded-md">
                      <p className="font-semibold mb-1">Troubleshooting:</p>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>Check your network connection</li>
                        <li>Try refreshing the page (Ctrl+R or Cmd+R)</li>
                        <li>Wait a moment and try again (relayer server may be temporarily busy)</li>
                        <li>Ensure your wallet is connected</li>
                        <li>For local development, ensure Hardhat node is running with FHEVM support</li>
                        {zamaError instanceof Error && zamaError.message.includes("Bad JSON") && (
                          <li className="font-semibold text-orange-800 mt-2">
                            💡 Tip: &quot;Bad JSON&quot; errors are often temporary. Try refreshing after a few seconds.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Identity (Number)
              </label>
              <input
                type="number"
                value={userIdentity}
                onChange={(e) => setUserIdentity(e.target.value)}
                placeholder="Enter your identity number (e.g., 12345)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isRegistering || isVerifying}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Status:</strong> {isRegistered ? (
                  <span className="text-green-600">✓ Registered</span>
                ) : (
                  <span className="text-orange-600">Not Registered</span>
                )}
              </p>
            </div>

            {/* Encryption Section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">🔐 Encryption & Registration</h3>
              <p className="text-sm text-gray-600 mb-4">
                Encrypt your identity locally and register it on the blockchain.
              </p>
              <button
                className={buttonClass}
                onClick={handleRegister}
                disabled={!userIdentity || isRegistering || isVerifying || zamaLoading || isRegistered}
              >
                {isRegistering ? "Encrypting & Registering..." : "🔒 Encrypt & Register Identity"}
              </button>
              {isRegistered && (
                <p className="text-xs text-green-600 mt-2">✓ Identity already registered</p>
              )}
            </div>

            {/* Decryption Section */}
            {isRegistered && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-4">🔓 Verification & Decryption</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Verify your identity by encrypting it, comparing on-chain, and decrypting the result.
                </p>
                <button
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                  onClick={handleVerify}
                  disabled={!userIdentity || isRegistering || isVerifying || zamaLoading}
                >
                  {isVerifying ? "Verifying & Decrypting..." : "🔓 Verify & Decrypt Result"}
                </button>
              </div>
            )}

            {/* Encryption/Decryption Process Details - Hidden */}
            {false && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-900">🔐 Encryption/Decryption Process</h3>
                  <button
                    onClick={() => {}}
                    className="text-purple-400 hover:text-purple-600"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Plaintext Identity */}
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-purple-700">1️⃣ Plaintext Identity</span>
                    </div>
                    <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                      {userIdentity || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Your original identity number</p>
                  </div>

                  {/* Encrypted Handle */}
                  {encryptedHandle && (
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-purple-700">2️⃣ Encrypted Identity (Handle)</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Encrypted Locally</span>
                      </div>
                      <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded break-all">
                        {typeof encryptedHandle === 'string' ? encryptedHandle : String(encryptedHandle)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Your identity encrypted using FHE, stored on-chain</p>
                    </div>
                  )}

                  {/* Encrypted Result Handle (from verification) */}
                  {encryptedResultHandle && (
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-purple-700">3️⃣ Encrypted Comparison Result</span>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">FHE Operation</span>
                      </div>
                      <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded break-all">
                        {typeof encryptedResultHandle === 'string' ? encryptedResultHandle : String(encryptedResultHandle)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Result of encrypted comparison (still encrypted)</p>
                    </div>
                  )}

                  {/* Decrypted Result */}
                  {decryptedResult !== null && (
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-purple-700">4️⃣ Decrypted Result</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          decryptedResult 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          Decrypted Locally
                        </span>
                      </div>
                      <p className={`text-lg font-bold font-mono p-2 rounded ${
                        decryptedResult 
                          ? "bg-green-50 text-green-700" 
                          : "bg-red-50 text-red-700"
                      }`}>
                        {decryptedResult ? "true" : "false"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Final decrypted result: {decryptedResult ? "Identity matches!" : "Identity does not match"}
                      </p>
                    </div>
                  )}

                  {/* Current Step Indicator */}
                  {currentStep && currentStep !== "complete" && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-blue-800 font-medium">
                          Current Step: {currentStep === "encrypting" ? "Encrypting..." : 
                                        currentStep === "verifying" ? "Verifying on-chain..." : 
                                        currentStep === "decrypting" ? "Decrypting..." : currentStep}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {verificationResult !== null && (
              <div className={`rounded-lg p-4 ${
                verificationResult
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}>
                <p className={`font-semibold ${
                  verificationResult ? "text-green-800" : "text-red-800"
                }`}>
                  {verificationResult
                    ? "✓ Verification Successful: Identity matches!"
                    : "✗ Verification Failed: Identity does not match"}
                </p>
              </div>
            )}

            {message && (
              <div className={`rounded-lg p-4 border ${
                message.startsWith("✓") || message.startsWith("✅")
                  ? "bg-green-50 border-green-200"
                  : message.startsWith("❌") || message.startsWith("⚠️")
                  ? "bg-red-50 border-red-200"
                  : message.startsWith("⏳")
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}>
                <p className={`text-sm ${
                  message.startsWith("✓") || message.startsWith("✅")
                    ? "text-green-800 font-medium"
                    : message.startsWith("❌")
                    ? "text-red-800 font-medium"
                    : message.startsWith("⚠️")
                    ? "text-orange-800 font-medium"
                    : message.startsWith("⏳")
                    ? "text-blue-800 font-medium"
                    : "text-gray-700"
                }`}>{message}</p>
              </div>
            )}

            {/* Network Info - Hidden */}
            {false && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-600">
                  <strong>Network:</strong> {chainId === 31337 ? "Hardhat Local" : chainId === 11155111 ? "Sepolia Testnet" : `Chain ID ${chainId}`}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Contract Address:</strong> {contractAddress}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Your Address:</strong> {address}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

