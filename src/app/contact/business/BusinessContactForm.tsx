'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormState {
  name: string;
  email: string;
  message: string;
  website: string;
}

export default function BusinessContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
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
      form.message.length > 1000
    ) {
      setError('入力が長すぎます。');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: '法人向けお問い合わせ', ...form }),
      });
      if (res.ok) {
        setForm({ name: '', email: '', message: '', website: '' });
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
        <label className="block mb-1" htmlFor="message">
          ご相談内容・お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          maxLength={1000}
          value={form.message}
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
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {loading ? '送信中...' : '送信'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

