'use client';
import { useEffect } from 'react';

export default function CodeCopyInit() {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((code) => {
      const pre = code.parentElement as HTMLElement | null;
      if (!pre) return;
      if (pre.querySelector('button.copy-btn')) return;
      const btn = document.createElement('button');
      btn.textContent = 'コピー';
      btn.className = 'copy-btn';
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(code.textContent || '');
        btn.textContent = 'コピーしました';
        setTimeout(() => {
          btn.textContent = 'コピー';
        }, 2000);
      });
      pre.classList.add('relative');
      pre.insertBefore(btn, code);
    });
  }, []);
  return null;
}
