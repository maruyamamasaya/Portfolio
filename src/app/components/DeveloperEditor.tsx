"use client";
import { useEffect, useState } from 'react';

export default function DeveloperEditor() {
  const [target, setTarget] = useState<'blog' | 'dev'>('dev');
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [upload, setUpload] = useState<File | null>(null);

  useEffect(() => {
    const base = target === 'dev' ? 'dev-posts' : 'posts';
    fetch(`/api/${base}`)
      .then(res => res.json())
      .then((data: string[]) => setFiles(data))
      .catch(() => setStatus('ファイル一覧の取得に失敗しました'));
    setSelected('');
    setContent('');
  }, [target]);

  const openFile = async (name: string) => {
    setSelected(name);
    const base = target === 'dev' ? 'dev-posts' : 'posts';
    const res = await fetch(`/api/${base}/${encodeURIComponent(name)}`);
    if (res.ok) {
      const data = await res.json();
      setContent(data.content);
    }
  };

  const saveFile = async () => {
    if (!selected) return;
    const base = target === 'dev' ? 'dev-posts' : 'posts';
    const res = await fetch(`/api/${base}/${encodeURIComponent(selected)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    setStatus(res.ok ? '保存しました' : '保存に失敗しました');
  };

  return (
    <div className="md:flex">
      <div className="md:w-1/4 p-4 space-y-4 border-r">
        <div>
          <label className="block mb-1 font-bold">編集対象</label>
          <select
            className="border p-1 w-full"
            value={target}
            onChange={e => setTarget(e.target.value as 'blog' | 'dev')}
          >
            <option value="blog">blog</option>
            <option value="dev">developers_blog</option>
          </select>
        </div>
        <ul className="space-y-2">
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
        <div className="mt-4">
          <label className="block mb-1 font-bold">画像アップロード</label>
          <input
            type="file"
            onChange={e => setUpload(e.target.files?.[0] || null)}
            className="mb-2"
          />
          <button
            className="px-2 py-1 bg-green-500 text-white"
            onClick={async () => {
              if (!upload) return;
              const form = new FormData();
              form.append('file', upload);
              const res = await fetch('/api/upload-image', {
                method: 'POST',
                body: form
              });
              setStatus(res.ok ? 'アップロードしました' : 'アップロードに失敗しました');
            }}
          >
            アップロード
          </button>
        </div>
      </div>
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
