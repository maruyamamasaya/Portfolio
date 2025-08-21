import markdownToHtml from '../markdownToHtml';
import fs from 'fs/promises';
import path from 'path';

  describe('markdownToHtml', () => {
    it('converts markdown features correctly', async () => {
      const slug = '20250821001';
      const md = [
        '# Title',
        '',
        `See another.md and [[${slug}]]`,
        '',
        '| H1 | H2 |',
        '| --- | --- |',
        '| A | B |',
        '',
        '**bold**',
      ].join('\n');

      const blogDir = path.join(process.cwd(), 'blog');
      const filePath = path.join(blogDir, `${slug}.md`);
      await fs.mkdir(blogDir, { recursive: true });
      await fs.writeFile(
        filePath,
        [
          '---',
          'title: Test Post',
          'date: \'2025-08-21\'',
          'image: /images/img1.svg',
          'alt: test image',
          '---',
          '',
          'content',
        ].join('\n'),
      );

      try {
        const { html, headings } = await markdownToHtml(md);
        expect(html).toContain('<table>');
        expect(html).toContain('<strong>bold</strong>');
        expect(html).toContain('<a href="/blog/another">another</a>');
        expect(html).toContain('style="max-width: 400px;"');
        expect(html).toContain('<img src="/images/img1.svg" alt="test image"');
        expect(html).toContain('Test Post');
        expect(headings).toEqual([{ id: 'title', text: 'Title', level: 1 }]);
      } finally {
        await fs.unlink(filePath);
      }
    });

    it('converts chat blocks', async () => {
      const md = [':::chat user01 left', 'こんにちは', ':::'].join('\n');
      const { html } = await markdownToHtml(md);
      expect(html).toContain('<div class="chat user01 left">');
      expect(html).toContain('こんにちは');
      expect(html).toContain('/images/usericon01.png');
    });

    it('converts chat blocks with CRLF', async () => {
      const md = [':::chat user02 right', 'hello', ':::'].join('\r\n');
      const { html } = await markdownToHtml(md);
      expect(html).toContain('<div class="chat user02 right">');
      expect(html).toContain('hello');
      expect(html).toContain('/images/usericon02.png');
    });

    it('converts chat blocks with trailing spaces', async () => {
      const md = [':::chat user03 left  ', 'hi', ':::'].join('\n');
      const { html } = await markdownToHtml(md);
      expect(html).toContain('<div class="chat user03 left">');
      expect(html).toContain('hi');
      expect(html).toContain('/images/usericon03.png');
    });
  });
