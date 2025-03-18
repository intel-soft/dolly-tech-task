"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="shadow">
      <div className="container mx-auto px-6 py-4 ">
        <div className="flex justify-between items-center">
          <div>
            <Link
              href="/"
              className="text-xl md:text-2xl xl:text-3xl font-bold"
            >
              Note App
            </Link>
          </div>

          <div className="flex space-x-4 gap-4 text-base md:text-lg xl:text-xl">
            <Link href="/notes">All Notes</Link>
            <Link href="/notes/new">New Note</Link>
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
