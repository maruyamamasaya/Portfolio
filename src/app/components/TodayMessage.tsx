"use client";
import { useEffect, useState, useRef } from 'react';

const messages = [
  '世界は観測によって形を持ち、意識はその干渉項である。',
  '思考は演算であり、自己とは再帰する関数にすぎない。',
  'あらゆる存在は、文脈のネットワークにおけるノードである。',
  '自由意志とは、アルゴリズムに名を与えた幻想かもしれない。',
  '記憶はただのデータではない。構造化された忘却である。',
  '真理は光のように、観測者の立場で屈折する。',
  '「無」は計算可能性の限界に存在する沈黙である。',
  'シミュレーションと現実の境界は、認識の解像度によって変わる。',
  '存在とは、他者のプロトコルに応答する能力のことだ。',
  '意識は、ノイズと信号のあいだで自己を定義しようとする試みである。',
];


export default function TodayMessage() {
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const [closed, setClosed] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);

  const handleClose = () => setClosed(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    };
    const handleMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const startDrag = (e: React.MouseEvent) => {
    setDragging(true);
    offsetRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  if (closed) return null;

  return (
    <div
      className="win98-window max-w-sm"
      style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 50 }}
    >
      <div className="win98-titlebar cursor-move" onMouseDown={startDrag}>
        <span>Quantum Thought of the Day</span>
        <div className="window-controls">
          <button
            className="win98-btn close"
            aria-label="Close"
            onClick={handleClose}
          />
        </div>
      </div>
      <div className="win98-content">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
