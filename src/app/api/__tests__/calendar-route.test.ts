import { GET } from '../calendar/route';
import { NextRequest } from 'next/server';

describe('GET /api/calendar', () => {
  it('returns calendar data', async () => {
    const req = new NextRequest(
      'http://localhost/api/calendar?year=2025&month=6',
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('returns 400 for invalid params', async () => {
    const req = new NextRequest('http://localhost/api/calendar');
    const res = await GET(req);
    expect(res.status).toBe(400);
  });
});
