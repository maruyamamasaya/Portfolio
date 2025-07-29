'use client';
import { useEffect } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';

import Image from 'next/image';

interface ToolInfo {
  name: string;
  icon: string;
  description: string;
}

interface ToolModalProps {
  tool: ToolInfo | null;
  onClose: () => void;
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  useEffect(() => {
    if (tool) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [tool]);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {tool && (
          <m.div
            className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 backdrop-blur-sm transition-base"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
          >
            <m.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-auto p-6 mt-20 relative transition-base"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1, opacity: 1 }}
              exit={reduce ? undefined : { scale: 0.95, opacity: 0 }}
              transition={reduce ? undefined : { duration: 0.3 }}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-500 hover:text-primary cursor-pointer transition-base"

              >
                ×
              </button>
              <Image
                src={tool.icon}
                alt={tool.name}
                width={96}
                height={96}
                className="w-24 h-24 object-contain mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line">
                {tool.description}
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
