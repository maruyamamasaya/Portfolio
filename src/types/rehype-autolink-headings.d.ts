declare module 'rehype-autolink-headings' {
  import type { Plugin } from 'unified';

  interface Options {
    behavior?: 'wrap' | 'prepend' | 'append';
    [key: string]: any;
  }

  const rehypeAutolinkHeadings: Plugin<[Options?]>;
  export default rehypeAutolinkHeadings;
}
