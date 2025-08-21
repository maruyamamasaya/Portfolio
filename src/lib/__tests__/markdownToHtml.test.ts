import markdownToHtml from '../markdownToHtml';

describe('markdownToHtml', () => {
  it('converts markdown features correctly', async () => {
    const md = [
      '# Title',
      '',
      'See another.md and [[20250821001]]',
      '',
      '| H1 | H2 |',
      '| --- | --- |',
      '| A | B |',
      '',
      '**bold**',
    ].join('\n');

    const { html, headings } = await markdownToHtml(md);
    expect(html).toContain('<table>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<a href="/blog/another">another</a>');
    expect(html).toContain('<a href="/blog/20250821001"');
    expect(html).toContain('<img src="/images/img1.svg" alt="20250821001"');
    expect(headings).toEqual([{ id: 'title', text: 'Title', level: 1 }]);
  });
});
