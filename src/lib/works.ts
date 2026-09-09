import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { FileNotFoundError } from './errors';

export interface Work {
  slug: string;
  title: string;
  date: string;
  publishedAt?: string;
  draft?: boolean;
  image?: string;
  alt?: string;
  category: string;
  tags?: string[];
  summary?: string;
  updated?: string;
  content: string;
}

export type WorkVisibilityOptions = {
  includeDraft?: boolean;
  includeScheduled?: boolean;
  now?: Date;
};

const worksDirectory = path.join(process.cwd(), 'content', 'works');

export async function getWork(
  slug: string,
  options: WorkVisibilityOptions = {},
): Promise<Work> {
  return getWorkBySlug(slug, {
    includeDraft: false,
    includeScheduled: false,
    ...options,
  });
}

async function getWorkBySlug(
  slug: string,
  options: WorkVisibilityOptions = {},
): Promise<Work> {
  const {
    includeDraft = false,
    includeScheduled = false,
    now = new Date(),
  } = options;
  const fullPath = path.join(worksDirectory, `${slug}.md`);
  try {
    await fs.access(fullPath);
  } catch {
    throw new FileNotFoundError(`Work not found: ${slug}`);
  }

  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const work: Work = {
    slug,
    title: (data.title as string) ?? '',
    date: (data.date as string) ?? '',
    publishedAt: (data.publishedAt as string) ?? '',
    draft: Boolean(data.draft),
    image: data.image as string | undefined,
    alt: data.alt as string | undefined,
    category: ((data.category as string | undefined) ?? 'プロジェクト') as string,
    tags: data.tags as string[] | undefined,
    summary: (data.summary as string | undefined) ?? '',
    updated: data.updated as string | undefined,
    content,
  };

  if (work.draft && !includeDraft) {
    throw new FileNotFoundError(`Work not found: ${slug}`);
  }
  if (!includeScheduled && isScheduledFutureWork(work, now)) {
    throw new FileNotFoundError(`Work not found: ${slug}`);
  }

  return work;
}

function parseWorkDate(value: string | undefined): number {
  if (!value) return Number.NEGATIVE_INFINITY;
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return Number.NEGATIVE_INFINITY;
  return timestamp;
}

export async function getSortedWorks(): Promise<Work[]> {
  const fileNames: string[] = (await fs.readdir(worksDirectory)).filter((file) =>
    file.endsWith('.md'),
  );
  const works = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(worksDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: (data.title as string) ?? '',
        date: (data.date as string) ?? '',
        publishedAt: (data.publishedAt as string) ?? '',
        draft: Boolean(data.draft),
        image: data.image as string | undefined,
        alt: data.alt as string | undefined,
        category: ((data.category as string | undefined) ?? 'プロジェクト') as string,
        tags: data.tags as string[] | undefined,
        summary: (data.summary as string | undefined) ?? '',
        updated: data.updated as string | undefined,
        content,
      };
    }),
  );

  return works
    .filter((work) => !isDraftWork(work))
    .filter((work) => !isScheduledFutureWork(work))
    .sort((a, b) => {
      const aAt = parseWorkDate(workSortValue(a));
      const bAt = parseWorkDate(workSortValue(b));
      if (aAt !== bAt) {
        // Newer works first.
        return bAt - aAt;
      }
      if (a.publishedAt !== b.publishedAt) {
        return (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');
      }
      if (a.date !== b.date) {
        return (b.date ?? '').localeCompare(a.date ?? '');
      }
      return a.slug.localeCompare(b.slug);
    });
}

function workSortValue(work: Work): string {
  return work.publishedAt || work.date;
}

function getScheduledTimestamp(work: Work): number {
  const publishAt = parseWorkDate(work.publishedAt);
  if (publishAt > Number.NEGATIVE_INFINITY) return publishAt;

  const contentDate = parseWorkDate(work.date);
  return contentDate > Number.NEGATIVE_INFINITY ? contentDate : Number.NEGATIVE_INFINITY;
}

function isScheduledFutureWork(work: Work, now = new Date()): boolean {
  const target = getScheduledTimestamp(work);
  if (target <= Number.NEGATIVE_INFINITY) return false;
  return target > now.getTime();
}

function isDraftWork(work: Work): boolean {
  return Boolean(work.draft);
}
