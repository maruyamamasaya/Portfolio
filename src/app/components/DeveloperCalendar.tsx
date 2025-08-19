'use client';
import { useEffect, useMemo, useState } from 'react';

const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

type Props = {
  year: number;
  month: number; // 1-12
  selectedDate: string; // YYYY-MM-DD
  onSelect: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  hasPosts: (date: string) => boolean;
};

const pad = (n: number) => String(n).padStart(2, '0');
const toYmd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function DeveloperCalendar({
  year,
  month,
  selectedDate,
  onSelect,
  onPrevMonth,
  onNextMonth,
  hasPosts,
}: Props) {
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(toYmd(new Date()));
  }, []);

  const cells = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = new Date(year, month - 1, 0).getDate();

    const temp: { date: string; day: number; current: boolean }[] = [];

    // previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 2, prevMonthDays - i);
      temp.push({ date: toYmd(date), day: date.getDate(), current: false });
    }
    // current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${pad(month)}-${pad(day)}`;
      temp.push({ date, day, current: true });
    }
    // next month
    let nextDay = 1;
    while (temp.length % 7 !== 0) {
      const date = new Date(year, month, nextDay);
      temp.push({ date: toYmd(date), day: nextDay, current: false });
      nextDay++;
    }
    return temp;
  }, [year, month]);

  const weeks = useMemo(() => {
    const w: (typeof cells)[] = [];
    for (let i = 0; i < cells.length; i += 7) {
      w.push(cells.slice(i, i + 7));
    }
    return w;
  }, [cells]);

  return (
    <div className="min-w-[362px] min-h-[362px]">
      <div className="flex justify-between items-center mb-2">
        <button aria-label="前の月" className="px-2" onClick={onPrevMonth}>
          &lt;
        </button>
        <h2 className="font-bold">
          {year}年{month}月
        </h2>
        <button aria-label="次の月" className="px-2" onClick={onNextMonth}>
          &gt;
        </button>
      </div>
      <table role="grid" className="w-full text-center border-collapse">
        <thead>
          <tr>
            {dayLabels.map((d) => (
              <th key={d} className="w-8">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((cell) => {
                const isSelected = cell.date === selectedDate;
                const has = hasPosts(cell.date);
                const isToday = cell.date === today;
                return (
                  <td key={cell.date} className="p-1">
                    <button
                      role="gridcell"
                      aria-selected={isSelected}
                      aria-label={cell.date}
                      onClick={() => onSelect(cell.date)}
                      className={`relative w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-base ${
                        cell.current ? '' : 'text-gray-400'
                      } ${
                        isSelected
                          ? 'bg-primary text-white'
                          : isToday
                            ? 'border border-primary'
                            : ''
                      } ${
                        has && !isSelected
                          ? 'after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full'
                          : ''
                      }`}
                    >
                      {cell.day}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
