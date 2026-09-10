const BASE_URL = process.env.SMOKE_BASE_URL ?? 'http://localhost:3000';
const BASIC_USER = process.env.SMOKE_BASIC_USER ?? 'admin';
const BASIC_PASS = process.env.SMOKE_BASIC_PASSWORD ?? 'admin';
const REVALIDATE_SECRET =
  process.env.SMOKE_REVALIDATE_SECRET ?? process.env.REVALIDATE_SECRET ?? '';
const AWS_READY =
  !!(
    process.env.AWS_SES_REGION ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION
  ) &&
  !!(
    process.env.AWS_SES_ACCESS_KEY_ID ||
    process.env.AWS_ACCESS_KEY_ID
  ) &&
  !!(
    process.env.AWS_SES_SECRET_ACCESS_KEY ||
    process.env.AWS_SECRET_ACCESS_KEY
  );

const AUTH = `Basic ${Buffer.from(
  `${BASIC_USER}:${BASIC_PASS}`,
).toString('base64')}`;

const log = (...args) => console.log(...args);

const request = async (path, { method = 'GET', headers = {}, body } = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...headers,
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let parsed;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }
  return { res, body: parsed };
};

const expectStatus = (label, actual, expected) => {
  if (actual !== expected) {
    throw new Error(
      `${label}: expected ${expected}, got ${actual}`,
    );
  }
};

const expectContains = (label, text, needle) => {
  if (typeof text !== 'string' || !text.includes(needle)) {
    throw new Error(`${label}: expected body to include "${needle}"`);
  }
};

const run = async () => {
  const createdPosts = [];
  const createdWorks = [];
  let failures = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      log(`✅ ${name}`);
    } catch (err) {
      failures += 1;
      log(`❌ ${name}:`, err.message);
    }
  };

  try {
    await test('contact: 送信バリデーション失敗(メール必須)', async () => {
      const { res, body } = await request('/api/contact', {
        method: 'POST',
        body: { name: 'Tester', email: '', message: 'hello' },
      });
      expectStatus('contact missing email', res.status, 400);
      expectContains('contact missing email message', body.error ?? '', '必須');
    });

    await test('contact: honeypot で拒否', async () => {
      const { res, body } = await request('/api/contact', {
        method: 'POST',
        body: {
          name: 'Tester',
          email: 't@example.com',
          message: 'hello',
          website: 'spam',
        },
      });
      expectStatus('contact honeypot', res.status, 400);
      expectContains('contact honeypot message', body.error ?? '', '不正');
    });

    await test('contact: レート制限（429）', async () => {
      const headers = { 'x-forwarded-for': '203.0.113.9' };
      for (let i = 0; i < 5; i++) {
        await request('/api/contact', {
          method: 'POST',
          headers: { ...headers },
          body: { name: 'Tester', email: 't@example.com', message: 'ok' },
        });
      }
      const { res } = await request('/api/contact', {
        method: 'POST',
        headers: { ...headers },
        body: { name: 'Tester', email: 't@example.com', message: 'ok' },
      });
      expectStatus('contact rate limit', res.status, 429);
    });

    if (AWS_READY) {
      await test('contact: 正常送信（環境変数あり）', async () => {
        const { res, body } = await request('/api/contact', {
          method: 'POST',
          body: {
            name: 'Smoke',
            email: 'smoke@example.com',
            message: 'portfolio smoke test',
          },
        });
        expectStatus('contact success', res.status, 200);
        if (body?.success !== true) {
          throw new Error('contact success: expected success=true');
        }
      });
    } else {
      log('ℹ️ contact正常送信はAWS環境変数が未設定のためスキップ');
    }

    await test('posts: 未認証401', async () => {
      const { res } = await request('/api/posts', {
        method: 'POST',
        body: { filename: `smoke-post-${Date.now()}.md`, content: 'tmp' },
      });
      expectStatus('posts unauthorized', res.status, 401);
    });

    const postFile = `smoke-post-${Date.now()}.md`;
    createdPosts.push(postFile);
    await test('posts: 認証投稿→更新→削除の流れ', async () => {
      const create = await request('/api/posts', {
        method: 'POST',
        headers: { Authorization: AUTH },
        body: { filename: postFile, content: '# before' },
      });
      expectStatus('posts create', create.res.status, 200);

      const get = await request(`/api/posts/${encodeURIComponent(postFile)}`, {
        headers: { Authorization: AUTH },
      });
      expectStatus('posts get', get.res.status, 200);
      expectContains('posts created content', get.body.content ?? '', 'before');

      const update = await request(`/api/posts/${encodeURIComponent(postFile)}`, {
        method: 'PUT',
        headers: { Authorization: AUTH },
        body: { content: '# after' },
      });
      expectStatus('posts update', update.res.status, 200);

      const getAfter = await request(`/api/posts/${encodeURIComponent(postFile)}`, {
        headers: { Authorization: AUTH },
      });
      expectStatus('posts get after update', getAfter.res.status, 200);
      expectContains('posts updated content', getAfter.body.content ?? '', 'after');

      const del = await request(`/api/posts/${encodeURIComponent(postFile)}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH },
      });
      expectStatus('posts delete', del.res.status, 200);
      createdPosts.splice(createdPosts.indexOf(postFile), 1);
    });

    await test('posts: 404応答', async () => {
      const { res } = await request(
        `/api/posts/non-existent-${Date.now()}.md`,
        { headers: { Authorization: AUTH } },
      );
      expectStatus('posts get 404', res.status, 404);
    });

    await test('revalidate: 未認証401', async () => {
      const { res } = await request('/api/revalidate', {
        method: 'POST',
        body: { paths: ['/blog'] },
      });
      expectStatus('revalidate unauthorized', res.status, 401);
    });

    if (REVALIDATE_SECRET) {
      await test('revalidate: secretで再検証成功', async () => {
        const { res, body } = await request(
          `/api/revalidate?secret=${encodeURIComponent(
            REVALIDATE_SECRET,
          )}`,
          {
            method: 'POST',
            body: { paths: ['/blog', '/works'] },
          },
        );
        expectStatus('revalidate success', res.status, 200);
        if (body?.revalidated !== true) {
          throw new Error('revalidate success: expected revalidated=true');
        }
      });
    } else {
      log('ℹ️ revalidate 成功検証は SMOKE_REVALIDATE_SECRET または REVALIDATE_SECRET 未設定のためスキップ');
    }

    await test('works: 未認証401', async () => {
      const { res } = await request('/api/works', {
        method: 'POST',
        body: { filename: `smoke-work-${Date.now()}.md`, content: '# before' },
      });
      expectStatus('works unauthorized', res.status, 401);
    });

      const workFile = `smoke-work-${Date.now()}.md`;
    createdWorks.push(workFile);
    await test('works: 認証作成→更新→削除の流れ', async () => {
      const create = await request('/api/works', {
        method: 'POST',
        headers: { Authorization: AUTH },
        body: { filename: workFile, content: '# before' },
      });
      expectStatus('works create', create.res.status, 200);

      const update = await request(`/api/works/${encodeURIComponent(workFile)}`, {
        method: 'PUT',
        headers: { Authorization: AUTH },
        body: { content: '# after' },
      });
      expectStatus('works update', update.res.status, 200);

      const del = await request(`/api/works/${encodeURIComponent(workFile)}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH },
      });
      expectStatus('works delete', del.res.status, 200);
      createdWorks.splice(createdWorks.indexOf(workFile), 1);
    });

    await test('works: 404応答', async () => {
      const { res } = await request(
        `/api/works/non-existent-${Date.now()}.md`,
        { headers: { Authorization: AUTH } },
      );
      expectStatus('works get 404', res.status, 404);
    });
  } finally {
    for (const post of createdPosts) {
      await request(`/api/posts/${encodeURIComponent(post)}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH },
      });
    }
    for (const work of createdWorks) {
      await request(`/api/works/${encodeURIComponent(work)}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH },
      });
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
    log(`\n完了: 失敗 ${failures} 件`);
  } else {
    log('\n完了: 全件成功');
  }
};

run().catch((err) => {
  console.error('スモーク全体で例外', err);
  process.exit(1);
});
