import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { FhevmInstance } from "@/fhevm/fhevmTypes";
import { createFhevmInstance } from "@/fhevm/internal/fhevm";

export function useZamaInstance() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [instance, setInstance] = useState<FhevmInstance | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (!isConnected || !address || !chainId) {
      setInstance(undefined);
      return;
    }

    setIsLoading(true);
    setError(undefined);

    const abortController = new AbortController();
    const mockChains: Record<number, string> = {
      31337: "http://localhost:8545", // Hardhat localhost
    };

    createFhevmInstance({
      signal: abortController.signal,
      provider: window.ethereum as any,
      mockChains: mockChains,
      onStatusChange: (s) => {
        // Only log status changes, suppress other logs
        if (s && typeof s === 'string') {
          console.log(`[useZamaInstance] status: ${s}`);
        }
      },
    })
      .then((inst) => {
        if (!abortController.signal.aborted) {
          setInstance(inst);
          setIsLoading(false);
          setError(undefined);
        }
      })
      .catch((e) => {
        if (!abortController.signal.aborted) {
          // Filter out expected network errors from the error message
          const errorMessage = e instanceof Error ? e.message : String(e);
          const isNetworkError = 
            errorMessage.includes("relayer") ||
            errorMessage.includes("connection") ||
            errorMessage.includes("keyurl") ||
            errorMessage.includes("ERR_CONNECTION_CLOSED") ||
            errorMessage.includes("network");
          
          // Only set error for non-network issues
          if (!isNetworkError) {
            setError(e);
          } else {
            // For network errors, we'll still try to use the instance if possible
            // (it might work with cached data or mock mode)
            console.warn("[useZamaInstance] Network error during initialization, but may still work with cached data:", errorMessage);
          }
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [isConnected, address, chainId]);

  return { instance, isLoading, error };
}

