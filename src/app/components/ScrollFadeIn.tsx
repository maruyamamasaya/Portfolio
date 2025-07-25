"use client";
import { useEffect, useRef, useState, ReactNode, ElementType } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export default function ScrollFadeIn({
  children,
  className = "",
  as: Component = "div"
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as any}
      className={`${className} ${visible ? "animate-fadeInUp" : "opacity-0"}`}
    >
      {children}
    </Component>
  );
}
