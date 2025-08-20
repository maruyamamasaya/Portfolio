'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormState {
  name: string;
  email: string;
  inquiry: string;
  desired: string;
  consultation: string;
  website: string;
}

export default function TutorContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    inquiry: '',
    desired: '',
    consultation: '',
    website: '',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('メールアドレスの形式が正しくありません。');
      return;
    }
    if (
      form.name.length > 100 ||
      form.email.length > 200 ||
      form.inquiry.length > 1000 ||
      form.desired.length > 1000 ||
      form.consultation.length > 1000
    ) {
      setError('入力が長すぎます。');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: '家庭教師お問い合わせ', ...form }),
      });
      if (res.ok) {
        setForm({
          name: '',
          email: '',
          inquiry: '',
          desired: '',
          consultation: '',
          website: '',
        });
        router.push('/contact/complete');
      } else {
        setError('送信に失敗しました。');
      }
    } catch {
      setError('送信に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1" htmlFor="name">
          お名前<span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="email">
          メールアドレス<span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="inquiry">
          お問い合わせ内容
        </label>
        <textarea
          id="inquiry"
          name="inquiry"
          maxLength={1000}
          value={form.inquiry}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="desired">
          受講したい内容
        </label>
        <textarea
          id="desired"
          name="desired"
          maxLength={1000}
          value={form.desired}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="consultation">
          無料のご相談内容
        </label>
        <textarea
          id="consultation"
          name="consultation"
          maxLength={1000}
          value={form.consultation}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-tutor-pink text-white rounded"
      >
        {loading ? '送信中...' : '送信'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

