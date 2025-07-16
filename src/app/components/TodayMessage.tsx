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
    <div className="win98-window max-w-sm mx-auto mt-6">
      <div className="win98-titlebar">Quantum Thought of the Day</div>
      <div className="win98-content">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
