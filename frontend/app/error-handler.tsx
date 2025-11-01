"use client";

import { useEffect } from "react";

/**
 * Global error handler to suppress expected network errors that don't affect functionality
 */
export function ErrorHandler() {
  useEffect(() => {
    // Helper function to check if error should be suppressed
    const shouldSuppressError = (errorString: string): boolean => {
      return (
        errorString.includes("Failed to fetch") ||
        errorString.includes("fetch failed") ||
        errorString.includes("ECONNREFUSED") ||
        errorString.includes("NetworkError") ||
        errorString.includes("Network request failed") ||
        errorString.includes("ERR_CONNECTION_CLOSED") ||
        errorString.includes("relayer.testnet.zama.cloud") ||
        errorString.includes("ERR_BLOCKED_BY_RESPONSE") ||
        errorString.includes("coinbase.com") ||
        errorString.includes("cca-lite.coinbase.com") ||
        errorString.includes("NotSameOriginAfterDefaultedToSameOriginByCoep") ||
        errorString.includes("Base Account SDK requires") ||
        errorString.includes("Cross-Origin-Opener-Policy header to not be set to 'same-origin'") ||
        errorString.includes("Lit is in dev mode") ||
        errorString.includes("RelayerSDKLoader: window does not contain 'relayerSDK' property")
      );
    };

    // Override console.error to filter out expected network errors
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const errorString = args.join(" ");
      
      // Only log unexpected errors
      if (!shouldSuppressError(errorString)) {
        originalError.apply(console, args);
      }
    };

    // Override console.warn to filter out expected warnings
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const warnString = args.join(" ");
      
      // Suppress expected warnings
      if (!shouldSuppressError(warnString)) {
        originalWarn.apply(console, args);
      }
    };

    // Handle unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.message || String(event.reason || "");
      
      // Suppress expected network errors
      if (shouldSuppressError(errorMessage)) {
        // Prevent the error from appearing in console
        event.preventDefault();
        return;
      }
      
      // Log unexpected errors
      console.error("Unhandled promise rejection:", event.reason);
    };

    // Handle global errors
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || String(event.error || "");
      
      // Suppress expected errors
      if (shouldSuppressError(errorMessage)) {
        event.preventDefault();
        return false;
      }
      
      return true;
    };

    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("error", handleError);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  return null;
}

