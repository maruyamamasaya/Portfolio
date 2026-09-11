export default function Loading() {
  return (
    <div className="portfolio-loading" role="status" aria-live="polite">
      <span className="portfolio-loading-light" aria-hidden="true" />
      <span className="sr-only">ページを読み込んでいます</span>
    </div>
  );
}
