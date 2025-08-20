import Image from 'next/image';

export default function FunImages() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <Image src="/images/good_anime.gif" alt="グッド" width={120} height={120} />
      <Image src="/images/fanfare_anime.gif" alt="ファンファーレ" width={120} height={120} />
      <Image src="/images/click_anime.gif" alt="クリック" width={120} height={120} />
    </div>
  );
}
