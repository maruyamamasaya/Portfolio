'use client';
import { useEffect } from 'react';

export default function CodeCopyInit() {
  useEffect(() => {
    const init = () => {
      (window as any).hljs?.highlightAll();

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
    };

    const loadHighlight = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css';
      link.dataset.hljs = 'true';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
      script.onload = init;
      document.head.appendChild(script);
    };

    if (!(window as any).hljs) {
      if (!document.querySelector('link[data-hljs]')) {
        loadHighlight();
      } else {
        const script = document.createElement('script');
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
        script.onload = init;
        document.head.appendChild(script);
      }
    } else {
      init();
    }
  }, []);
  return null;
}
