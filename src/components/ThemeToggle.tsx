"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeSwitch = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="top-2 right-2 m-2 md:top-2 md:right-2 md:bottom-auto md:left-auto">
      <motion.button
        className="relative flex h-8 w-16 items-center rounded-full bg-gray-300 p-1 shadow-inner dark:bg-gray-700"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute left-1 h-6 w-6 rounded-full bg-white shadow-md"
          animate={{
            left: isDark ? "calc(100% - 28px)" : "4px",
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
        />
        <motion.div
          className="flex h-full w-full items-center justify-between px-1"
          animate={{
            opacity: 1,
          }}
          initial={{
            opacity: 0,
          }}
        >
          <Sun className="h-4 w-4 text-yellow-500" />
          <Moon className="h-4 w-4 text-gray-800" />
        </motion.div>
        <span className="sr-only">{isDark ? "Dark Mode" : "Light Mode"}</span>
      </motion.button>
    </div>
  );
};

export default ThemeSwitch;
