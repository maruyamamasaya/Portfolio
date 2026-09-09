import { getSortedWorks, getWork } from '../works';
import { FileNotFoundError } from '../errors';

describe('works utilities', () => {
  it('getSortedWorks returns an array of works', async () => {
    const works = await getSortedWorks();
    expect(Array.isArray(works)).toBe(true);
    expect(works.length).toBeGreaterThan(0);
  });

  it('getSortedWorks filters out draft works and sorts by publishedAt desc', async () => {
    const works = await getSortedWorks();

    expect(works.find((work) => work.slug === 'draft-portfolio-check')).toBeUndefined();
    expect(works[0]?.slug).toBe('line-traffic-design');

    if (works.length > 1) {
      expect(
        Date.parse(works[0].publishedAt || works[0].date || ''),
      ).toBeGreaterThanOrEqual(
        Date.parse(works[1].publishedAt || works[1].date || ''),
      );
    }
  });

  it('getWork throws FileNotFoundError for missing file', async () => {
    await expect(getWork('does-not-exist')).rejects.toBeInstanceOf(
      FileNotFoundError,
    );
  });

  it('getWork does not return draft content without explicit include', async () => {
    await expect(getWork('draft-portfolio-check')).rejects.toBeInstanceOf(
      FileNotFoundError,
    );
  });

  it('getSortedWorks does not include future scheduled works', async () => {
    const works = await getSortedWorks();
    expect(works.find((work) => work.slug === 'scheduled-portfolio-preview')).toBeUndefined();
  });

  it('getWork can include future scheduled works when preview option is set', async () => {
    const work = await getWork('scheduled-portfolio-preview', {
      includeScheduled: true,
      includeDraft: true,
    });
    expect(work.slug).toBe('scheduled-portfolio-preview');
  });
});
