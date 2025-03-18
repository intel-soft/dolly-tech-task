import React, { useEffect } from "react";
import Link from "next/link";
import { initSampleData } from "@/actions/noteActions";

export default async function HomePage() {
  // Initialize sample data on first load
  await initSampleData();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-4xl font-extrabold md:font-bold text-center mb-12">
        Welcome to the Note-Taking App
      </h1>
      <section className="flex space-x-6 mb-6">
        <div className="dark:bg-neutral-700 shadow rounded-lg p-6 mb-6 flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            About This App
          </h2>
          <p className="mb-4 text-sm sm:text-base md:text-lg">
            This application demonstrates an App using Next.js and TypeScript.
          </p>
          <p className="mb-4 text-sm sm:text-base md:text-lg">
            The app is built using Next.js App Router, showcasing how modern
            React applications can be structured.
          </p>
        </div>

        <div className=" dark:bg-neutral-700 shadow rounded-lg p-6  flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Get Started
          </h2>
          <div className="space-y-5">
            <Link
              href="/notes"
              className="block w-full bg-blue-600 dark:bg-sky-400 dark:hover:bg-sky-700 hover:bg-blue-700 text-white dark:text-black font-semibold py-2 px-4 rounded text-center"
            >
              View All Notes
            </Link>
            <Link
              href="/notes/new"
              className="block w-full bg-green-800 dark:bg-green-400 dark:hover:bg-green-800 hover:bg-green-700 text-white dark:text-black font-semibold py-2 px-4 rounded text-center"
            >
              Create New Note
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
