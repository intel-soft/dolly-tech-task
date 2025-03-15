import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";
import ToggleButton from "@/components/ToggleButton";

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
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950  dark:text-neutral-100">
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8 dark:bg-slate-950  dark:text-neutral-100">
            {children}
          </main>
          <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600 dark:bg-slate-800  dark:text-neutral-100">
            <ToggleButton />
            <div className="container mx-auto">
              Note-Taking App - Technical Assessment
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
