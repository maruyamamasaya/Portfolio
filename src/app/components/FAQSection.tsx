'use client';
import { useState } from 'react';

const faqs = [
  { q: 'サポートの対象地域は？', a: 'オンラインのため全国対応可能です。' },
  { q: '相談は無料ですか？', a: '初回相談は無料で承ります。' },
  {
    q: '見積もりだけでもお願いできますか？',
    a: 'もちろん可能です。お気軽にご連絡ください。',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">よくある質問</h2>
      <ul className="space-y-2">
        {faqs.map((f, i) => (
          <li key={i} className="border rounded">
            <button
              className="w-full text-left px-4 py-2 font-semibold flex justify-between items-center"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {f.q}
              <span>{open === i ? '-' : '+'}</span>
            </button>
            {open === i && <p className="px-4 py-2 border-t">{f.a}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
