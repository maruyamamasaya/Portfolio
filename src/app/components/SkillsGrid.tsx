'use client';
import React from 'react';

const categories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛️', level: '★★★' },
      { name: 'Next.js', icon: '🧭', level: '★★★' },
      { name: 'TypeScript', icon: '📝', level: '★★★' },
      { name: 'Tailwind CSS', icon: '🌀', level: '★★★' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢', level: '★★' },
      { name: 'Express', icon: '🚂', level: '★★' },
      { name: 'Firebase', icon: '🔥', level: '★★' },
      { name: 'Supabase', icon: '🍋', level: '★' },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Figma', icon: '🎨', level: '★★★' },
      { name: 'Illustrator', icon: '✒️', level: '★★' },
      { name: 'Photoshop', icon: '🖌️', level: '★★' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: '🌱', level: '★★★' },
      { name: 'GitHub', icon: '🐱', level: '★★★' },
      { name: 'Docker', icon: '🐳', level: '★' },
      { name: 'VSCode', icon: '🖥️', level: '★★★' },
    ],
  },
];

export default function SkillsGrid() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">スキルセット</h2>
      {categories.map((category) => (
        <div key={category.title} className="space-y-2">
          <h3 className="text-lg font-semibold">{category.title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <div className="text-4xl mb-2">{skill.icon}</div>
                <p className="font-bold text-sm mb-1">{skill.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
