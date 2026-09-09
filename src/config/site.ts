export const siteConfig = {
  name: 'Digi Goose',
  shortName: 'DG',
  description:
    'Web体験、デザイン、AI活用を軸に、実案件を通じて価値が伝わる形へ変えるポートフォリオです。',
  navigation: [
    { href: '/', label: 'ホーム' },
    { href: '/works', label: '制作実績' },
    { href: '/blog', label: 'ブログ' },
    { href: '/about', label: 'プロフィール' },
    { href: '/contact', label: 'コンタクト' },
  ],
  contact: { general: '/contact', business: '/contact/business' },
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/digitalgoosesupport/' },
    { label: 'X', href: 'https://x.com/GooseDigi' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@goosedigi' },
    { label: 'note', href: 'https://note.com/freelancehack' },
    { label: 'LINE', href: 'https://lin.ee/21wyOGD' },
  ],
} as const;

export const siteAssets = {
  service: {
    web: '/images/img2.svg',
    automation: '/images/img3.svg',
    support: '/images/img4.svg',
  },
} as const;
