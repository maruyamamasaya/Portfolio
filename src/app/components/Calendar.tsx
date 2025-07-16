"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DayInfo {
  date: string;
  posts: { slug: string; title: string }[];
}

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [days, setDays] = useState<DayInfo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/calendar?year=${year}&month=${month}`)
      .then(res => res.json())
      .then(setDays)
      .catch(() => setDays([]));
  }, [year, month]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayMap = new Map(days.map(d => [d.date, d.posts]));

  function prevMonth() {
    setSelected(null);
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else {
      setMonth(m => m - 1);
    }
  }

  function nextMonth() {
    setSelected(null);
    if (month === 11) {
      setYear(y => y + 1);
      setMonth(0);
    } else {
      setMonth(m => m + 1);
    }
  }

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  return (
    <div className="calendar-widget text-sm">
      <div className="font-bold mb-2 text-center flex items-center justify-between">
        <button onClick={prevMonth} className="px-2 hover:scale-110 transition">&lt;</button>
        <span className="mx-2">{year} / {month + 1}</span>
        <button onClick={nextMonth} className="px-2 hover:scale-110 transition">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 fade-in">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center font-semibold">{d}</div>
        ))}
        {cells.map((d, idx) => {
          if (!d) return <div key={`e${idx}`} />;
          const dateStr = d.toISOString().split('T')[0];
          const isToday = dateStr === today.toISOString().split('T')[0];
          const hasPosts = dayMap.get(dateStr)?.length;
          return (
            <div key={dateStr} className="text-center">
              <button
                onClick={() => setSelected(dateStr)}
                className={`calendar-day${isToday ? ' calendar-day-today' : ''}${
                  hasPosts ? ' calendar-day-has-posts' : ''
                } hover:scale-110 transition`}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
      {selected && (
        <div className="mt-2 space-y-1 fade-in">
          {dayMap.get(selected)?.length ? (
            dayMap.get(selected)!.map(post => (
              <Link
                key={post.slug}
                href={`/developers_blog/${post.slug}`}
                className="block hover:underline"
              >
                {post.title}
              </Link>
            ))
          ) : (
            <div className="text-center text-xs">No posts</div>
          )}
        </div>
      )}
    </div>
  );
}

