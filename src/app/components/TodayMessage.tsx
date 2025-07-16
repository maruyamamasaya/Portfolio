"use client";
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-black bg-opacity-70 text-neon p-6 rounded-xl border border-neon mt-10 shadow-xl">
      <h3 className="text-lg font-semibold mb-2 tracking-widest text-white">⌬ Quantum Thought of the Day</h3>
      <p className="text-base italic font-light">{message}</p>
    </div>
  );
}
