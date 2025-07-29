import Image from 'next/image';

export default function SocialLinks() {
  return (
    <div>
      <h3 className="font-bold mb-2">SNS</h3>
      <ul className="space-y-1 text-sm">
        <li>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-primary"
          >
            <Image
              src="/images/instagram-200px.png"
              alt="Instagram"
              width={20}
              height={20}
              className="w-4 h-4"
            />
            <span>Instagram</span>
          </a>
        </li>
        <li>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 hover:text-primary">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
            <span>X</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-primary"
          >
            <Image
              src="/images/tiktok-200px.png"
              alt="TikTok"
              width={20}
              height={20}
              className="w-4 h-4"
            />
            <span>TikTok</span>
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-primary"
          >
            <Image
              src="/images/youtube-200px.png"
              alt="YouTube"
              width={20}
              height={20}
              className="w-4 h-4"
            />
            <span>YouTube</span>
          </a>
        </li>
        <li>
          <a
            href="https://note.com/freelancehack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-primary"
          >
            <Image
              src="/images/note-200px.png"
              alt="note"
              width={20}
              height={20}
              className="w-4 h-4"
            />
            <span>note</span>
          </a>
        </li>
        <li>
          <a
            href="https://lin.ee/21wyOGD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-primary"
          >
            <Image
              src="/images/LINEdevelop-200px.png"
              alt="LINE公式アカウント"
              width={20}
              height={20}
              className="w-4 h-4"
            />
            <span>LINE公式アカウント</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-primary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 .5C5.4.5 0 6 0 12.6c0 5 3.2 9.2 7.6 10.7.6.1.8-.3.8-.6v-2c-3 0-3.6-1.4-3.6-1.4-.5-1-1.2-1.3-1.2-1.3-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1 3 .8.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.7.9.7 1.7v2.3c0 .3.2.7.8.6A11.8 11.8 0 0024 12.6C24 6 18.6.5 12 .5z" />
            </svg>
            <span>GitHub</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
