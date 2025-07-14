"use client";
import { useState } from 'react';

function getDays(year: number, month: number) {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function Calendar() {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth());
  const days = getDays(year, month);

  return (
    <div className="text-sm">
      <div className="font-bold mb-2 text-center">
        {year} / {month + 1}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center font-semibold">{d}</div>
        ))}
        {days.map(d => (
          <div key={d.toISOString()} className="text-center">
            {d.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

