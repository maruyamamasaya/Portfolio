"use client";
import { useEffect, useState } from "react";

export default function HeroAnimation() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const images = ["/images/main-hero01.png", "/images/main-hero02.png"];

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 mix-blend-screen ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          alt="hero"
        />
      ))}
    </div>
  );
}
