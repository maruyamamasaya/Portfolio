'use client';

export default function SkillBars() {
  const skills = [
    { name: 'React', icon: '⚛', level: 90 },
    { name: 'Next.js', icon: 'N', level: 85 },
    { name: 'Tailwind', icon: '🌀', level: 80 },
    { name: 'Figma', icon: '🎨', level: 70 },
    { name: 'Zapier', icon: '⚡', level: 60 },
  ];
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">スキルセット</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center space-x-2">
                <span>{skill.icon}</span>
                <span>{skill.name}</span>
              </span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
              <div
                className="bg-primary h-2 rounded"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
