export const arcanaImages: string[] = Array.from({ length: 12 }, (_, i) =>
  `/images/arcana/arcanacard${String(i + 1).padStart(5, '0')}.svg`,
);
