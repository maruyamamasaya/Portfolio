'use client';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';
import markdownToHtml from '@/lib/markdownToHtml';

const baseMap = {
  blog: 'posts',
  dev: 'dev-posts',
} as const;

const pathMap = {
  blog: '/blog',
  dev: '/developers_blog',
} as const;

export default function DeveloperEditor() {
  const [target, setTarget] = useState<'blog' | 'dev'>('dev');
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({
    title: '',
    date: '',
    category: '',
    tags: '',
    image: '',
    updated: '',
  });
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState('');
  const [height, setHeight] = useState(400);
  const [status, setStatus] = useState('');
  const [upload, setUpload] = useState<File | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [newFilename, setNewFilename] = useState('');


  useEffect(() => {
    const base = baseMap[target];
    fetch(`/api/${base}`)
      .then((res) => res.json())
      .then((data: string[]) => setFiles(data))
      .catch(() => setStatus('ファイル一覧の取得に失敗しました'));
    setSelected('');
    setContent('');
    setMeta({
      title: '',
      date: '',
      category: '',
      tags: '',
      image: '',
      updated: '',
    });
  }, [target]);

  const openFile = async (name: string) => {
    setSelected(name);
    const base = baseMap[target];
    const res = await fetch(`/api/${base}/${encodeURIComponent(name)}`);
    if (res.ok) {
      const data = await res.json();
      const parsed = matter(data.content);
      setContent(parsed.content);
      setMeta({
        title: (parsed.data.title as string) ?? '',
        date: (parsed.data.date as string) ?? '',
        category: (parsed.data.category as string) ?? '',
        tags: Array.isArray(parsed.data.tags)
          ? parsed.data.tags.join(', ')
          : '',
        image: (parsed.data.image as string) ?? '',
        updated: (parsed.data.updated as string) ?? '',
      });
      setIsNew(false);
    }
  };

  const newFile = (name: string) => {
    const safe = name.endsWith('.md') ? name : `${name}.md`;
    setSelected(safe);
    const date = new Date().toISOString().slice(0, 10);
    setMeta({
      title: '',
      date,
      category: '',
      tags: '',
      image: '/images/example.png',
      updated: date,
    });
    setContent('');
    setIsNew(true);
  };

  const createFile = () => {
    const trimmed = newFilename.trim();
    if (!trimmed || /[\\/]/.test(trimmed)) {
      setStatus('ファイル名が不正です');
      return;
    }
    newFile(trimmed);
    setNewFilename('');
  };

  const saveFile = async () => {
    if (!selected) return;
    const base = baseMap[target];
    const url = isNew
      ? `/api/${base}`
      : `/api/${base}/${encodeURIComponent(selected)}`;
    const method = isNew ? 'POST' : 'PUT';
    const front = {
      ...meta,
      tags: meta.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
    };
    const markdown = matter.stringify(content, front);
    const body = isNew
      ? JSON.stringify({ filename: selected, content: markdown })
      : JSON.stringify({ content: markdown });
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

  const togglePreview = async () => {
    if (!preview) {
      const { html } = await markdownToHtml(content);
      setHtml(html);
    }
    setPreview(!preview);
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
        <div>
          <label className="block mb-1 font-bold">新規記事</label>
          <input
            className="border p-1 w-full mb-1"
            placeholder="filename"
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
          />
          <button className="px-2 py-1 bg-gray-200" onClick={createFile}>
            作成
          </button>
        </div>
        <div
          className="mt-4 border p-2 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) setUpload(file);
          }}
        >
          <label className="block mb-1 font-bold">画像アップロード</label>
          <input
            type="file"
            onChange={(e) => setUpload(e.target.files?.[0] || null)}
            className="mb-2"
          />
          {upload && (
            <img
              src={URL.createObjectURL(upload)}
              alt="preview"
              className="mx-auto mb-2 max-h-40"
            />
          )}
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
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm">title</label>
            <input
              className="border p-1 w-full"
              value={meta.title}
              onChange={(e) => setMeta({ ...meta, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm">date</label>
            <input
              className="border p-1 w-full"
              value={meta.date}
              onChange={(e) => setMeta({ ...meta, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm">category</label>
            <input
              className="border p-1 w-full"
              value={meta.category}
              onChange={(e) => setMeta({ ...meta, category: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm">tags (,)</label>
            <input
              className="border p-1 w-full"
              value={meta.tags}
              onChange={(e) => setMeta({ ...meta, tags: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm">image</label>
            <input
              className="border p-1 w-full"
              value={meta.image}
              onChange={(e) => setMeta({ ...meta, image: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm">updated</label>
            <input
              className="border p-1 w-full"
              value={meta.updated}
              onChange={(e) => setMeta({ ...meta, updated: e.target.value })}
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-sm">高さ: {height}px</label>
          <input
            type="range"
            min="200"
            max="800"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
        {!preview ? (
          <textarea
            className="w-full border p-2"
            style={{ height }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div
            className="prose border p-2"
            style={{ height, overflow: 'auto' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        <div className="mt-2 space-x-2">
          <button
            className="px-4 py-2 bg-primary text-white"
            onClick={saveFile}
          >
            保存
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white"
            onClick={togglePreview}
          >
            {preview ? '編集' : 'プレビュー'}
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white"
            onClick={revalidate}
          >
            公開
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white"
            onClick={() => {
              setSelected('');
              setContent('');
              setMeta({
                title: '',
                date: '',
                category: '',
                tags: '',
                image: '',
                updated: '',
              });
            }}
          >
            キャンセル
          </button>
        </div>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </div>
    </div>
  );
}
