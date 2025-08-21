'use client';
import { useEffect } from 'react';

export default function CodeCopyInit() {
  useEffect(() => {
    const init = () => {
      document.querySelectorAll('pre code').forEach((code) => {
        // highlight code block
        (window as any).hljs?.highlightElement(code as HTMLElement);

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
    };

    if (!(window as any).hljs) {
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
      script.onload = init;
      document.head.appendChild(script);
    } else {
      init();
    }
  }, []);
  return null;
}
