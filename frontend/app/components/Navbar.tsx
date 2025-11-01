"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useChainId } from "wagmi";

export function Navbar() {
  const chainId = useChainId();
  
  const getNetworkBadge = () => {
    if (chainId === 31337) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Hardhat Local
        </span>
      );
    } else if (chainId === 11155111) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          Sepolia
        </span>
      );
    }
    return null;
  };

  return (
    <nav className="flex w-full px-3 md:px-0 h-fit py-6 justify-between items-center bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">🔐</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Encrypted Identity Auth
          </h1>
          {getNetworkBadge()}
        </div>
      </div>
      <ConnectButton />
    </nav>
  );
}

