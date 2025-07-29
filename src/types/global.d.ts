declare const process: any;
declare const Buffer: any;

declare module '*';

declare module 'fs/promises';
declare module 'path';
declare module 'gray-matter';
declare module 'unified';
declare module 'remark-parse';
declare module 'remark-rehype';
declare module 'rehype-stringify';
declare module 'next';
declare module 'next/link';
declare module 'next/navigation';
declare module 'next/font/google';
declare module 'next/image';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
}
