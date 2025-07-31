import Link from 'next/link';
import Image from 'next/image';

export default function ProfileCardBlog() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start items-center gap-6 sm:gap-8">
      <Image
        src="/images/profile.jpg"
        alt="プロフィール画像"
        width={96}
        height={96}
        className="w-24 h-24 object-cover rounded-full border border-gray-300 dark:border-gray-700 mr-0 sm:mr-6"
      />
      <div className="flex-1 sm:text-left text-center space-y-2 sm:space-y-4">
        <p className="text-base leading-relaxed mb-6">フルスタックエンジニア</p>
        <p className="text-sm leading-relaxed">分からないを分かるに変える</p>
        <div className="flex justify-center sm:justify-start space-x-3 my-2">
          <Link href="https://x.com" aria-label="X" className="hover:text-primary transition-base">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.64 3H21L14.5 10.69 22.5 21h-5.99L11.47 14.5 5.8 21H2.36l6.97-8.28L1.64 3h5.98l4.65 5.84L17.64 3z" />
            </svg>
          </Link>
          <Link href="https://github.com" aria-label="GitHub" className="hover:text-primary transition-base">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.3 3.49.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.31 1.23a11.6 11.6 0 0 1 6.01 0c2.3-1.55 3.31-1.23 3.31-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.83 1.1.83 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </Link>
          <Link href="https://note.com/freelancehack" aria-label="note" className="hover:text-primary transition-base">
            <Image src="/images/note-200px.png" alt="note" width={20} height={20} className="w-5 h-5" />
          </Link>
          <Link href="https://lin.ee/21wyOGD" aria-label="LINE公式アカウント" className="hover:text-primary transition-base">
            <Image src="/images/LINEdevelop-200px.png" alt="LINE公式アカウント" width={20} height={20} className="w-5 h-5" />
          </Link>
        </div>
        <Link href="/about" className="underline text-sm leading-relaxed transition-base">
          詳しく見る
        </Link>
      </div>
    </div>
  );
}
