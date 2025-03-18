import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeToggle";
import { useEffect } from "react";

// Initialize Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note-Taking App",
  description: "A serverless-style note-taking application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ADD-ON: head with meta and favicon*/}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="dns-prefetch preconnect"
          href="https://img.icons8.com/?size=100&id=OENhm99NTnV6&format=png&color=000000"
        />
        <link
          rel="icon"
          href="https://img.icons8.com/?size=100&id=OENhm99NTnV6&format=png&color=000000"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {/* FIX: removed bg-white so theme toggle can be applied*/}
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            {/* NOTE: footer kept with fixed bg colour as it looks well aesthetically*/}
            <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
              <div className="container mx-auto">
                Note-Taking App - Technical Assessment
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
