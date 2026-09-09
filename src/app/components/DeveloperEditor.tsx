'use client';
import { useEffect, useMemo, useState } from 'react';
import DeveloperCalendar from './DeveloperCalendar';
import DeveloperDayList from './DeveloperDayList';
import matter from 'gray-matter';
import markdownToHtml from '@/lib/markdownToHtml';
import { categories } from '../../../data/categories';

type ContentTarget = 'posts' | 'works';

type TargetConfig = {
  label: string;
  apiBase: ContentTarget;
  listLabel: string;
  revalidatePaths: string[];
  defaultCategory: string;
  placeholderImage: string;
  showCategoryList: boolean;
};

const TARGETS: Record<ContentTarget, TargetConfig> = {
  posts: {
    label: '記事（Journal）',
    apiBase: 'posts',
    listLabel: '記事一覧',
    revalidatePaths: ['/blog'],
    defaultCategory: 'ai-course',
    placeholderImage: '/images/blog/',
    showCategoryList: true,
  },
  works: {
    label: '制作実績（Works）',
    apiBase: 'works',
    listLabel: '作品一覧',
    revalidatePaths: ['/works'],
    defaultCategory: 'Web',
    placeholderImage: '/images/img1.svg',
    showCategoryList: false,
  },
};

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

const getDateParts = (dateStr: string) => ({
  year: Number(dateStr.slice(0, 4)),
  month: Number(dateStr.slice(5, 7)),
});

export default function DeveloperEditor() {
  const todayStr = useMemo(() => toTokyoYmd(new Date()), []);
  const [currentYear, setCurrentYear] = useState<number>(getDateParts(todayStr).year);
  const [currentMonth, setCurrentMonth] = useState<number>(getDateParts(todayStr).month);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const [postsByDate, setPostsByDate] = useState<Record<string, PostItem[]>>({});
  const [fileDates, setFileDates] = useState<Record<string, string>>({});
  const [fileTitles, setFileTitles] = useState<Record<string, string>>({});

  const [selected, setSelected] = useState('');
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({
    title: '',
    date: '',
    publishedAt: '',
    category: '',
    tags: '',
    image: '',
    updated: '',
    draft: false,
  });
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState('');
  const [height, setHeight] = useState(800);
  const [status, setStatus] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [newFilename, setNewFilename] = useState('');
  const [newCategory, setNewCategory] = useState('ai-course');
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [target, setTarget] = useState<ContentTarget>('posts');

  const targetConfig = TARGETS[target];

  useEffect(() => {
    fetch('/api/search-data')
      .then((res) => res.json())
      .then((data) => setTagsList(data.tags ?? []))
      .catch(() => setTagsList([]));
  }, []);

  useEffect(() => {
    setNewCategory(targetConfig.defaultCategory);
    setSelected('');
    setContent('');
    setMeta({
      title: '',
      date: '',
      publishedAt: '',
      category: '',
      tags: '',
      image: '',
      updated: '',
      draft: false,
    });
    setIsNew(false);
    setStatus('');

    fetch(`/api/${targetConfig.apiBase}`)
      .then((res) => res.json())
      .then(async (data: string[]) => {
        const groups: Record<string, PostItem[]> = {};
        const dates: Record<string, string> = {};
        const titles: Record<string, string> = {};
        await Promise.all(
          data.map(async (name) => {
            const res = await fetch(
              `/api/${targetConfig.apiBase}/${encodeURIComponent(name)}`,
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
  }, [targetConfig.apiBase, targetConfig.defaultCategory, target]);

  const openFile = async (name: string) => {
    setSelected(name);
    const res = await fetch(`/api/${targetConfig.apiBase}/${encodeURIComponent(name)}`);
    if (res.ok) {
      const data = await res.json();
      const parsed = matter(data.content);
      setContent(parsed.content);
      setMeta({
        title: (parsed.data.title as string) ?? '',
        date: (parsed.data.date as string) ?? '',
        publishedAt: (parsed.data.publishedAt as string) ?? '',
        category: (parsed.data.category as string) ?? '',
        tags: Array.isArray(parsed.data.tags)
          ? parsed.data.tags.join(', ')
          : '',
        image: (parsed.data.image as string) ?? '',
        updated: (parsed.data.updated as string) ?? '',
        draft: Boolean(parsed.data.draft),
      });
      setIsNew(false);
      setCopyStatus('');
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
      publishedAt: date,
      category,
      tags: '',
      image:
        target === 'posts'
          ? `/images/blog/${imageBase}001.jpeg`
          : targetConfig.placeholderImage,
      updated: date,
      draft: false,
    });
    setContent('');
    setIsNew(true);
    setCopyStatus('');
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
      ? `/api/${targetConfig.apiBase}`
      : `/api/${targetConfig.apiBase}/${encodeURIComponent(selected)}`;
    const method = isNew ? 'POST' : 'PUT';
    const front = {
      ...meta,
      publishedAt: meta.publishedAt || meta.date,
      tags: meta.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
      draft: meta.draft,
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
      setCopyStatus('');
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
      body: JSON.stringify({
        paths: [...targetConfig.revalidatePaths, `/${targetConfig.apiBase}/${slug}`],
      }),
    });
    setStatus('更新しました');
  };

  const deleteFile = async () => {
    if (!selected || isNew) return;
    if (!window.confirm('本当に削除しますか？')) return;
    const res = await fetch(
      `/api/${targetConfig.apiBase}/${encodeURIComponent(selected)}`,
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
        publishedAt: '',
        category: '',
        tags: '',
        image: '',
        updated: '',
        draft: false,
      });
      setStatus('削除しました');
      setCopyStatus('');
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

  const getWorkPreviewUrl = (filename: string) => {
    if (!window || !filename) return '';
    const slug = filename.replace(/\.md$/, '');
    const base = window.location.origin;
    const secret =
      process.env.NEXT_PUBLIC_WORKS_PREVIEW_SECRET ??
      process.env.NEXT_PUBLIC_REVALIDATE_SECRET ??
      '';
    return secret ? `${base}/works/preview/${encodeURIComponent(slug)}?secret=${encodeURIComponent(secret)}` : `${base}/works/preview/${encodeURIComponent(slug)}`;
  };

  const copyWorkPreviewUrl = async () => {
    if (!selected) {
      setCopyStatus('ファイルを選択してください');
      return;
    }
    const url = getWorkPreviewUrl(selected);
    try {
      if (!url) throw new Error('url-empty');
      await navigator.clipboard.writeText(url);
      setCopyStatus('プレビューURLをコピーしました');
      setTimeout(() => setCopyStatus(''), 3000);
    } catch {
      setCopyStatus('コピーに失敗しました');
      setTimeout(() => setCopyStatus(''), 3000);
    }
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
        <label className="block text-sm font-bold">編集対象</label>
        <select
          className="border p-1 w-full mb-2"
          value={target}
          onChange={(e) => setTarget(e.target.value as ContentTarget)}
        >
          {Object.entries(TARGETS).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
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
          <label className="block mb-1 font-bold">
            {targetConfig.listLabel}（新規）
          </label>
          <p className="text-xs text-gray-600 mb-1">slug 形式で入力（拡張子省略可）</p>
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
            {targetConfig.showCategoryList &&
              categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            {!targetConfig.showCategoryList && (
              <>
                <option value="Web">Web</option>
                <option value="UI/UX">UI/UX</option>
                <option value="AI">AI</option>
                <option value="提案">提案</option>
              </>
            )}
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
            <label className="block text-sm">publishedAt</label>
            <input
              className="border p-1 w-full"
              value={meta.publishedAt}
              onChange={(e) => setMeta({ ...meta, publishedAt: e.target.value })}
              placeholder="YYYY-MM-DD"
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
          <div>
            <label className="block text-sm">draft</label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={meta.draft}
                onChange={(e) =>
                  setMeta({ ...meta, draft: e.target.checked })
                }
              />
              下書きとして公開抑止
            </label>
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
            className="px-4 py-2 bg-green-700 text-white transition-base"
            onClick={copyWorkPreviewUrl}
            disabled={!selected || target !== 'works'}
          >
            公開予約プレビューURLコピー
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
                publishedAt: '',
                category: '',
                tags: '',
                image: '',
                updated: '',
                draft: false,
              });
            }}
          >
            キャンセル
          </button>
        </div>
        {status && <p className="mt-2 text-sm">{status}</p>}
        {copyStatus && (
          <p className="mt-2 text-sm text-slate-600">
            {copyStatus}
            {(
              !process.env.NEXT_PUBLIC_WORKS_PREVIEW_SECRET &&
              !process.env.NEXT_PUBLIC_REVALIDATE_SECRET &&
              selected &&
              target === 'works'
            ) && (
              <span className="ml-1 block text-xs">
                ※現在の環境変数にプレビュー用シークレットが未設定のため、URL末尾は未付与です
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
