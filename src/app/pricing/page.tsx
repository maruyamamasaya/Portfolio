import Link from 'next/link';

export const metadata = {
  title: '料金表',
};

export default function PricingIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-4">
      <h1 className="text-3xl font-bold mb-6">料金表</h1>
      <ul className="list-disc ml-5 space-y-2">
        <li>
          <Link href="/pricing/business" className="text-primary hover:underline">
            法人向け料金表
          </Link>
        </li>
        <li>
          <Link href="/pricing/tutor" className="text-primary hover:underline">
            家庭教師料金表
          </Link>
        </li>
      </ul>
    </div>
  );
}

