"use client";
import { useEffect, useState } from 'react';

export default function Taskbar() {
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win98-taskbar font-xp">
      <button className="win98-start-button">Start</button>
      <span className="taskbar-clock">{time}</span>
    </div>
  );
}
