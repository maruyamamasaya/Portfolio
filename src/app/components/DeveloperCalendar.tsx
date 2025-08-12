'use client';
import { useState } from 'react';

const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

type Props = {
  onSelect: (date: string) => void;
};

export default function DeveloperCalendar({ onSelect }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const selectDate = (day: number) => {
    const m = `${month + 1}`.padStart(2, '0');
    const d = `${day}`.padStart(2, '0');
    onSelect(`${year}-${m}-${d}`);
  };

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = Array(firstDay).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length) {
    currentWeek = currentWeek.concat(Array(7 - currentWeek.length).fill(null));
    weeks.push(currentWeek);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button className="px-2" onClick={prevMonth}>
          &lt;
        </button>
        <span>
          {year}年{month + 1}月
        </span>
        <button className="px-2" onClick={nextMonth}>
          &gt;
        </button>
      </div>
      <table className="w-full text-center border-collapse">
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
              {week.map((day, j) => (
                <td key={j} className="border p-1">
                  {day ? (
                    <button
                      className="w-8 h-8 rounded hover:bg-gray-200 transition-base"
                      onClick={() => selectDate(day)}
                    >
                      {day}
                    </button>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

