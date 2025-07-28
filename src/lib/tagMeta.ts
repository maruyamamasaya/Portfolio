export const tagMeta: Record<
  string,
  { icon: string; textColor: string; bgColor: string }
> = {
  開発: { icon: '💡', textColor: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  デザイン: { icon: '🎨', textColor: 'text-pink-700', bgColor: 'bg-pink-100' },
};

export const defaultTagMeta = {
  icon: '🏷',
  textColor: 'text-gray-600 dark:text-gray-100',
  bgColor: 'bg-gray-200 dark:bg-gray-700',
};
