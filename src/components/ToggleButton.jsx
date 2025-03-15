"use client";
import { useEffect } from "react";

export default function () {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
    >
      Toggle Theme
    </button>
  );
}
