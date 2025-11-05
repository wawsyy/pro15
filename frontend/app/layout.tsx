import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "./client-providers";

export const metadata: Metadata = {
  title: "Encrypted Identity Authentication",
  description: "Privacy-preserving identity authentication using FHE",
  keywords: ["FHE", "blockchain", "privacy", "authentication", "encryption"],
  authors: [{ name: "Encrypted Identity Auth Team" }],
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-br from-blue-50 to-indigo-100 text-foreground antialiased`}>
        <div className="fixed inset-0 w-full h-full z-[-20] min-w-[850px]"></div>
        <ClientProviders>
          <main className="flex flex-col max-w-screen-lg mx-auto pb-20 min-w-[850px]">
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}

