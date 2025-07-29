'use client';
import { useEffect, useState } from 'react';

const baseMap = {
  blog: 'posts',
  dev: 'dev-posts',
} as const;

const pathMap = {
  blog: '/blog',
  dev: '/developers_blog',
} as const;

function metaTemplate() {
  const date = new Date().toISOString().slice(0, 10);
  return `---\ntitle: ""\ndate: "${date}"\nimage: "/images/example.png"\ntags:\n  - ""\nupdated: "${date}"\n---\n\n`;
}

export default function DeveloperEditor() {
  const [target, setTarget] = useState<'blog' | 'dev'>('dev');
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [upload, setUpload] = useState<File | null>(null);
  const [isNew, setIsNew] = useState(false);


  useEffect(() => {
    const base = baseMap[target];
    fetch(`/api/${base}`)
      .then((res) => res.json())
      .then((data: string[]) => setFiles(data))
      .catch(() => setStatus('ファイル一覧の取得に失敗しました'));
    setSelected('');
    setContent('');
  }, [target]);

  const openFile = async (name: string) => {
    setSelected(name);
    const base = baseMap[target];
    const res = await fetch(`/api/${base}/${encodeURIComponent(name)}`);
    if (res.ok) {
      const data = await res.json();
      setContent(data.content);
      setIsNew(false);
    }
  };

  const newFile = (name: string) => {
    const safe = name.endsWith('.md') ? name : `${name}.md`;
    setSelected(safe);
    setContent(metaTemplate());
    setIsNew(true);
  };

  const saveFile = async () => {
    if (!selected) return;
    const base = baseMap[target];
    const url = isNew
      ? `/api/${base}`
      : `/api/${base}/${encodeURIComponent(selected)}`;
    const method = isNew ? 'POST' : 'PUT';
    const body = isNew
      ? JSON.stringify({ filename: selected, content })
      : JSON.stringify({ content });
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (res.ok) {
      setStatus('保存しました');
      if (isNew) {
        setFiles((prev) => [...prev, selected]);
        setIsNew(false);
      }
    } else {
      setStatus('保存に失敗しました');
    }
  };

  const revalidate = async () => {
    if (!selected) return;
    const slug = selected.replace(/\.md$/, '');
    const basePath = pathMap[target];
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths: [basePath, `${basePath}/${slug}`] }),
    });
    setStatus('更新しました');
  };

  return (
    <div className="md:flex">
      <div className="md:w-1/5 p-4 space-y-4 border-r">
        <div>
          <label className="block mb-1 font-bold">編集対象</label>
          <select
            className="border p-1 w-full"
            value={target}
            onChange={(e) => setTarget(e.target.value as 'blog' | 'dev')}
          >
            <option value="blog">blog</option>
            <option value="dev">developers_blog</option>
          </select>
        </div>
        <ul className="space-y-2">
          {files.map((name) => (
            <li key={name}>
              <button
                className="accent-text underline"
                onClick={() => openFile(name)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="px-2 py-1 bg-gray-200"
          onClick={() => {
            const name = prompt('新しいファイル名を入力');
            if (name) newFile(name);
          }}
        >
          新規記事
        </button>
        <div className="mt-4">
          <label className="block mb-1 font-bold">画像アップロード</label>
          <input
            type="file"
            onChange={(e) => setUpload(e.target.files?.[0] || null)}
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
                body: form,
              });
              setStatus(
                res.ok ? 'アップロードしました' : 'アップロードに失敗しました',
              );
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
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="mt-2">
          <button
            className="px-4 py-2 bg-primary text-white"
            onClick={saveFile}
          >
            保存
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white ml-2"
            onClick={revalidate}
          >
            更新
          </button>
        </div>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </div>
    </div>
  );
}
