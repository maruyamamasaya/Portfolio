import markdownToHtml from '../markdownToHtml';

describe('markdownToHtml', () => {
  it('converts markdown features correctly', async () => {
    const md = [
      '# Title',
      '',
      'See another.md',
      '',
      '| H1 | H2 |',
      '| --- | --- |',
      '| A | B |',
      '',
      '**bold**'
    ].join('\n');

    const { html, headings } = await markdownToHtml(md);
    expect(html).toContain('<table>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<a href="/blog/another">another</a>');
    expect(headings).toEqual([{ id: 'title', text: 'Title', level: 1 }]);
  });
});
