import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <div className="mb-8 animate-pulse text-center">
        <h1 className="text-5xl font-extrabold tracking-widest text-neon mb-4">
          404: SYSTEM LOST
        </h1>
        <p className="text-lg text-gray-400">
          ❖ 仮想空間内に 該当ノードが見つかりませんでした。
        </p>
        <p className="text-sm text-gray-500 mt-2">[ CODE: ∅404∅ · LOCATION: UNKNOWN ]</p>
      </div>

      <Link
        href="/"
        className="mt-6 px-6 py-3 border border-neon rounded-xl hover:bg-neon hover:text-black motion-safe:transition-colors motion-reduce:transition-none duration-300 ease-in-out"
      >
        ⟵ メインフレームへ帰還
      </Link>
    </div>
  );
}
