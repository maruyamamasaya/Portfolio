export const siteConfig = {
  name: 'Digi Goose',
  shortName: 'DG',
  description:
    '小さな事業のWeb制作、業務改善、AI活用を、相談から運用まで一貫して支援します。',
  navigation: [
    { href: '/', label: 'ホーム' },
    { href: '/services', label: 'サービス' },
    { href: '/works', label: '制作実績' },
    { href: '/about', label: 'プロフィール' },
    { href: '/blog', label: 'ブログ' },
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
