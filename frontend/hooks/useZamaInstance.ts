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
      onStatusChange: (s) => console.log(`[useZamaInstance] status: ${s}`),
    })
      .then((inst) => {
        if (!abortController.signal.aborted) {
          setInstance(inst);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (!abortController.signal.aborted) {
          setError(e);
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [isConnected, address, chainId]);

  return { instance, isLoading, error };
}

