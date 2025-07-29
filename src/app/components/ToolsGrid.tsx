import React from 'react';

const tools = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: 'N' },
  { name: 'Tailwind CSS', icon: '🌀' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Adobe Creative Cloud (Photoshop / Illustrator / XD)', icon: '🅰️' },
  { name: 'Canva', icon: '🖼️' },
  { name: 'Zapier', icon: '⚡' },
  { name: 'Make.com', icon: '🔗' },
  { name: 'LINE公式アカウント (Messaging API / Bot)', icon: '💬' },
  { name: 'OpenAI GPT (ChatGPT API / Assistant)', icon: '🤖' },
  { name: 'Google Apps Script', icon: '📄' },
  { name: 'Notion / Slack 連携ツール', icon: '📘' },
];

export default function ToolsGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        利用ツール
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="rounded-lg p-4 shadow bg-white dark:bg-gray-800 text-center hover:shadow-lg hover:scale-105 transition"
          >
            <div className="text-2xl mb-2">{tool.icon}</div>
            <p className="text-sm">{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
