"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className="ml-2 p-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-md"
    >
      <motion.span
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="block"
      >
        {dark ? "\uD83C\uDF19" : "\u2600\uFE0F"}
      </motion.span>
    </button>
  );
}
