'use client';
import { useState, useMemo } from 'react';
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

  return (
    <DeveloperCalendar
      year={year}
      month={month}
      selectedDate={selectedDate}
      onSelect={handleSelect}
      onPrevMonth={() => changeMonth(-1)}
      onNextMonth={() => changeMonth(1)}
      hasPosts={hasPosts}
    />
  );
}
