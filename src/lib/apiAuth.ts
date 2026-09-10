import { timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

const isSecureEqual = (actual: string | undefined, expected: string | undefined) => {
  if (!actual || !expected) {
    return false;
  }
  try {
    const a = Buffer.from(actual, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
};

const getBasicAuthHeader = (req: Pick<NextRequest, 'headers'>) => {
  const header = req.headers.get('authorization');
  if (!header) return null;
  const [scheme, encoded] = header.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return null;
  }
  return encoded;
};

const getBasicCredentials = (encoded: string | null) => {
  if (!encoded) return null;
  try {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const delimiter = decoded.indexOf(':');
    if (delimiter === -1) return null;
    return {
      user: decoded.slice(0, delimiter),
      password: decoded.slice(delimiter + 1),
    };
  } catch {
    return null;
  }
};

export const isBasicAuthAuthorized = (req: Pick<NextRequest, 'headers'>) => {
  const encoded = getBasicAuthHeader(req);
  const creds = getBasicCredentials(encoded);
  if (!creds) {
    return false;
  }
  const expectedUser = process.env.BASIC_AUTH_USERNAME ?? '';
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD ?? '';
  if (!expectedUser || !expectedPassword) {
    return false;
  }
  return (
    isSecureEqual(creds.user, expectedUser) &&
    isSecureEqual(creds.password, expectedPassword)
  );
};

export const extractRevalidateToken = async (req: NextRequest) => {
  const querySecret = req.nextUrl.searchParams.get('secret') ?? '';
  const headerSecret =
    req.headers.get('x-internal-secret') ?? req.headers.get('authorization') ?? '';

  let bodySecret = '';
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    try {
      const body = await req.clone().json();
      if (typeof body?.secret === 'string') {
        bodySecret = body.secret;
      }
    } catch {
      // no-op
    }
  }

  const bearerMatch = headerSecret.match(/^Bearer\s+(.+)$/i);
  return bodySecret || querySecret || (bearerMatch ? bearerMatch[1] : '');
};

export const isValidRevalidateToken = (token: string | undefined | null) =>
  isSecureEqual(token ?? '', process.env.REVALIDATE_SECRET ?? '');
