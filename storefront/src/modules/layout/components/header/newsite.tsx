// components/TopBar.jsx
"use client"; // nodig als je in Next.js 13+ app directory gebruikt
import { useState } from "react";
import Link from "next/link";

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-400 text-black text-center py-2 px-4 font-bold text-sm z-50 transition-opacity duration-500">
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <span className="mr-2">
          🎉 EV Service heeft een nieuwe website!
        </span>
        <Link
          href="https://www.evservice.eu/pagina/ev-service-heeft-een-nieuwe-website"
          target="_blank"
          className="underline hover:text-red-600"
        >
         Meer informatie
        </Link>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-black hover:text-gray-800 font-bold"
          aria-label="Sluit melding"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
