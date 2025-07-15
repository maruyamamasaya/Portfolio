"use client";
import { useEffect, useState } from 'react';

export default function DeveloperEditor() {
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/dev-posts')
      .then(res => res.json())
      .then((data: string[]) => setFiles(data))
      .catch(() => setStatus('ファイル一覧の取得に失敗しました'));
  }, []);

  const openFile = async (name: string) => {
    setSelected(name);
    const res = await fetch(`/api/dev-posts/${encodeURIComponent(name)}`);
    if (res.ok) {
      const data = await res.json();
      setContent(data.content);
    }
  };

  const saveFile = async () => {
    if (!selected) return;
    const res = await fetch(`/api/dev-posts/${encodeURIComponent(selected)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    setStatus(res.ok ? '保存しました' : '保存に失敗しました');
  };

  return (
    <div className="md:flex">
      <ul className="md:w-1/4 p-4 space-y-2 border-r">
        {files.map(name => (
          <li key={name}>
            <button
              className="text-blue-600 underline"
              onClick={() => openFile(name)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
      <div className="md:w-3/4 p-4">
        {selected && <h2 className="font-bold mb-2">{selected}</h2>}
        <textarea
          className="w-full h-96 border p-2"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="mt-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white"
            onClick={saveFile}
          >
            保存
          </button>
        </div>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </div>
    </div>
  );
}
