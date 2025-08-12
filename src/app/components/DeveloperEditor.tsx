'use client';
import { useEffect, useMemo, useState } from 'react';
import DeveloperCalendar from './DeveloperCalendar';
import DeveloperDayList from './DeveloperDayList';
import matter from 'gray-matter';
import markdownToHtml from '@/lib/markdownToHtml';
import { categories } from '../../../data/categories';

const POSTS_BASE = 'posts';
const BLOG_PATH = '/blog';

type PostItem = { name: string; title: string };

const sortGroups = <T,>(groups: Record<string, T[]>) =>
  Object.fromEntries(
    Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0])),
  );

const pad = (n: number) => String(n).padStart(2, '0');
const toTokyoYmd = (date: Date) => {
  const tokyo = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  return tokyo.toISOString().slice(0, 10);
};

export default function DeveloperEditor() {
  const todayStr = useMemo(() => toTokyoYmd(new Date()), []);
  const [currentYear, setCurrentYear] = useState<number>(
    Number(todayStr.slice(0, 4)),
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    Number(todayStr.slice(5, 7)),
  );
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const [postsByDate, setPostsByDate] = useState<Record<string, PostItem[]>>({});
  const [fileDates, setFileDates] = useState<Record<string, string>>({});
  const [fileTitles, setFileTitles] = useState<Record<string, string>>({});

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
  const [height, setHeight] = useState(800);
  const [status, setStatus] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [newFilename, setNewFilename] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0].slug);
  const [tagsList, setTagsList] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/${POSTS_BASE}`)
      .then((res) => res.json())
      .then(async (data: string[]) => {
        const groups: Record<string, PostItem[]> = {};
        const dates: Record<string, string> = {};
        const titles: Record<string, string> = {};
        await Promise.all(
          data.map(async (name) => {
            const res = await fetch(
              `/api/${POSTS_BASE}/${encodeURIComponent(name)}`,
            );
            if (res.ok) {
              const fileData = await res.json();
              const parsed = matter(fileData.content);
              const date = (parsed.data.date as string) ?? '';
              const title = (parsed.data.title as string) ?? name;
              dates[name] = date;
              titles[name] = title;
              groups[date] = groups[date]
                ? [...groups[date], { name, title }]
                : [{ name, title }];
            }
          }),
        );
        setFileDates(dates);
        setFileTitles(titles);
        setPostsByDate(sortGroups(groups));
      })
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
  }, []);

  useEffect(() => {
    fetch('/api/search-data')
      .then((res) => res.json())
      .then((data) => setTagsList(data.tags ?? []))
      .catch(() => setTagsList([]));
  }, []);

  const openFile = async (name: string) => {
    setSelected(name);
    const res = await fetch(
      `/api/${POSTS_BASE}/${encodeURIComponent(name)}`,
    );
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

  const newFile = (name: string, category: string) => {
    const safe = name.endsWith('.md') ? name : `${name}.md`;
    setSelected(safe);
    const date = toTokyoYmd(new Date());
    const imageBase = date.replace(/-/g, '');
    setMeta({
      title: '',
      date,
      category,
      tags: '',
      image: `/images/blog/${imageBase}001.jpeg`,
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
    newFile(trimmed, newCategory);
    setNewFilename('');
  };

  const saveFile = async () => {
    if (!selected) return;
    const url = isNew
      ? `/api/${POSTS_BASE}`
      : `/api/${POSTS_BASE}/${encodeURIComponent(selected)}`;
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
      const oldDate = fileDates[selected];
      const title = meta.title || selected;
      setFileDates((prev) => ({ ...prev, [selected]: meta.date }));
      setFileTitles((prev) => ({ ...prev, [selected]: title }));
      setPostsByDate((prev) => {
        const groups = { ...prev };
        if (oldDate && groups[oldDate]) {
          groups[oldDate] = groups[oldDate].filter((p) => p.name !== selected);
          if (!groups[oldDate].length) delete groups[oldDate];
        }
        const entry = { name: selected, title };
        groups[meta.date] = groups[meta.date]
          ? [...groups[meta.date], entry]
          : [entry];
        return sortGroups(groups);
      });
      if (isNew) {
        setIsNew(false);
      }
    } else {
      setStatus('保存に失敗しました');
    }
  };

  const revalidate = async () => {
    if (!selected) return;
    const slug = selected.replace(/\.md$/, '');
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths: [BLOG_PATH, `${BLOG_PATH}/${slug}`] }),
    });
    setStatus('更新しました');
  };

  const deleteFile = async () => {
    if (!selected || isNew) return;
    if (!window.confirm('本当に削除しますか？')) return;
    const res = await fetch(
      `/api/${POSTS_BASE}/${encodeURIComponent(selected)}`,
      { method: 'DELETE' },
    );
    if (res.ok) {
      const date = fileDates[selected];
      setPostsByDate((prev) => {
        const groups = { ...prev };
        if (date && groups[date]) {
          groups[date] = groups[date].filter((p) => p.name !== selected);
          if (!groups[date].length) delete groups[date];
        }
        return groups;
      });
      setFileDates((prev) => {
        const { [selected]: _, ...rest } = prev;
        return rest;
      });
      setFileTitles((prev) => {
        const { [selected]: _, ...rest } = prev;
        return rest;
      });
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
      setStatus('削除しました');
    } else {
      setStatus('削除に失敗しました');
    }
  };

  const togglePreview = async () => {
    if (!preview) {
      const { html } = await markdownToHtml(content);
      setHtml(html);
    }
    setPreview(!preview);
  };

  const hasPosts = (date: string) => !!postsByDate[date]?.length;

  const changeMonth = (diff: number) => {
    const newDate = new Date(currentYear, currentMonth - 1 + diff, 1);
    const y = newDate.getFullYear();
    const m = newDate.getMonth() + 1;
    setCurrentYear(y);
    setCurrentMonth(m);
    setSelectedDate(`${y}-${pad(m)}-01`);
  };

  return (
    <div className="md:flex">
      <div className="md:w-1/5 p-4 space-y-4 border-r">
        <DeveloperCalendar
          year={currentYear}
          month={currentMonth}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
          onPrevMonth={() => changeMonth(-1)}
          onNextMonth={() => changeMonth(1)}
          hasPosts={hasPosts}
        />
        <DeveloperDayList
          date={selectedDate}
          posts={postsByDate[selectedDate] || []}
          onOpen={openFile}
        />
        <div>
          <label className="block mb-1 font-bold">新規記事</label>
          <input
            className="border p-1 w-full mb-1"
            placeholder="filename"
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
          />
          <select
            className="border p-1 w-full mb-1"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            className="px-2 py-1 bg-gray-200 transition-base"
            onClick={createFile}
          >
            作成
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
            <select
              className="border p-1 w-full"
              value={meta.category}
              onChange={(e) => setMeta({ ...meta, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">tags (,)</label>
            <input
              list="tags-list"
              className="border p-1 w-full"
              value={meta.tags}
              onChange={(e) => setMeta({ ...meta, tags: e.target.value })}
            />
            <datalist id="tags-list">
              {tagsList.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
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
            className="px-4 py-2 bg-primary text-white transition-base"
            onClick={saveFile}
          >
            保存
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white transition-base"
            onClick={togglePreview}
          >
            {preview ? '編集' : 'プレビュー'}
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white transition-base"
            onClick={revalidate}
          >
            公開
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white transition-base"
            onClick={deleteFile}
            disabled={!selected || isNew}
          >
            削除
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white transition-base"
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

