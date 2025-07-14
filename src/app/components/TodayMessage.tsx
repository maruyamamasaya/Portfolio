export default function TodayMessage() {
  const message = '継続は力なり';
  return (
    <div>
      <h3 className="font-bold mb-2">今日のひとこと</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}
