"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {

  const pathname = usePathname();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // When the state of isDarkMode changes, the dark class is added/removed from the <html> tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="bg-white shadow dark:bg-gray-900">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
              Note App
            </Link>
          </div>

          <div className="space-x-4">
            <Link
              href="/notes"
              className={`${pathname === "/notes" ? "text-blue-600" : "text-gray-800 : dark:text-white"
                } hover:text-blue-500`} 
            >
              All Notes
            </Link>
            <Link
              href="/notes/new"
              className={`${pathname === "/notes/new" ? "text-blue-600" : "text-gray-800 : dark:text-white"
                } hover:text-blue-500`}
            >
              New Note
            </Link>
            <button
            onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
