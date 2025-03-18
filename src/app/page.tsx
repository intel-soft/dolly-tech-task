import React, { useEffect } from "react";
import Link from "next/link";
import { initSampleData } from "@/actions/noteActions";

export default async function HomePage() {
  // Initialize sample data on first load
  await initSampleData();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-black-900 dark:text-white">
        Welcome to the Note-Taking App
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About This App</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          This application demonstrates an App using Next.js and TypeScript.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The app is built using Next.js App Router, showcasing how modern React
          applications can be structured.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Get Started</h2>
        <div className="space-y-4">
          <Link
            href="/notes"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-center"
          >
            View All Notes
          </Link>
          <Link
            href="/notes/new"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded text-center"
          >
            Create New Note
          </Link>
        </div>
      </div>
    </div>
  );
}
