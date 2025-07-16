"use client";
import { useEffect, useState } from "react";

export default function HeroAnimation() {
  const images = ["/images/main-hero01.png", "/images/main-hero02.png"];
  const [index, setIndex] = useState(() => Math.floor(Math.random() * images.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
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
