'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DeveloperCalendar from './DeveloperCalendar';
import { Post } from '@/lib/posts';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

interface Props {
  posts: Post[];
}

export default function SidebarCalendar({ posts }: Props) {
  const router = useRouter();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`
  );

  const postsByDate = useMemo(() => {
    const map: Record<string, Post[]> = {};
    posts.forEach((p) => {
      (map[p.date] = map[p.date] || []).push(p);
    });
    return map;
  }, [posts]);

  const hasPosts = (date: string) => !!postsByDate[date];

  const handleSelect = (date: string) => {
    setSelectedDate(date);
    const daily = postsByDate[date];
    if (!daily || daily.length === 0) return;
    if (daily.length === 1) {
      router.push(`/blog/${daily[0].slug}`);
    } else {
      router.push(`/search?date=${date}`);
    }
  };

  const changeMonth = (diff: number) => {
    const d = new Date(year, month - 1 + diff, 1);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    setYear(y);
    setMonth(m);
    setSelectedDate(`${y}-${pad(m)}-01`);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setNarrow(width < 298);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const months = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(p.date.slice(0, 7)));
    return Array.from(set)
      .map((k) => {
        const [y, m] = k.split('-').map(Number);
        return { year: y, month: m };
      })
      .sort((a, b) =>
        a.year === b.year ? a.month - b.month : a.year - b.year
      );
  }, [posts]);

  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});
  const toggleMonth = (key: string) =>
    setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }));

  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  return (
    <div ref={containerRef}>
      {narrow ? (
        <div>
          {months.map(({ year: y, month: m }) => {
            const key = `${y}-${m}`;
            const open = !!openMonths[key];
            const daysInMonth = new Date(y, m, 0).getDate();
            return (
              <div key={key} className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleMonth(key)}
                  className="flex items-center space-x-2"
                >
                  <span className="w-4 text-center">{open ? '-' : '+'}</span>
                  <span>{`${m}月`}</span>
                </button>
                {open && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const date = `${y}-${pad(m)}-${pad(day)}`;
                      const isSelected = date === selectedDate;
                      const has = hasPosts(date);
                      const isToday = date === today;
                      return (
                        <li key={date}>
                          <button
                            onClick={() => handleSelect(date)}
                            className={`w-full text-left px-2 py-1 rounded transition-base ${
                              isSelected
                                ? 'bg-primary text-white'
                                : isToday
                                  ? 'border border-primary'
                                  : ''
                            } ${
                              has && !isSelected ? 'text-primary' : ''
                            }`}
                          >
                            {day}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <DeveloperCalendar
          year={year}
          month={month}
          selectedDate={selectedDate}
          onSelect={handleSelect}
          onPrevMonth={() => changeMonth(-1)}
          onNextMonth={() => changeMonth(1)}
          hasPosts={hasPosts}
        />
      )}
    </div>
  );
}
