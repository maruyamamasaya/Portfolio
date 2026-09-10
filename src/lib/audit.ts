export type AuditAction =
  | 'contact.submit'
  | 'posts.create'
  | 'posts.update'
  | 'posts.delete'
  | 'works.create'
  | 'works.update'
  | 'works.delete'
  | 'cache.revalidate';

export type AuditOutcome = 'success' | 'deny' | 'error';

export type AuditEvent = {
  action: AuditAction;
  outcome: AuditOutcome;
  status: number;
  ip?: string;
  requestId?: string;
  filename?: string;
  paths?: string[];
  reason?: string;
};

const safeValue = (value?: string | null) =>
  typeof value === 'string' && value.trim() !== '' ? value : 'unknown';

export const recordAuditEvent = (event: AuditEvent) => {
  const payload = {
    at: new Date().toISOString(),
    action: event.action,
    outcome: event.outcome,
    status: event.status,
    ip: safeValue(event.ip),
    requestId: safeValue(event.requestId),
    filename: event.filename ? safeValue(event.filename) : undefined,
    paths: event.paths,
    reason: event.reason,
  };
  console.info('[audit]', JSON.stringify(payload));
};
