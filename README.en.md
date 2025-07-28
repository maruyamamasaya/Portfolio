# DigiSapo | PC Support Blog

![demo](public/images/demo.gif)

DigiSapo is a blog and portfolio site focused on PC troubleshooting and web development tips. Articles are written in Markdown and can be posted directly from the in-browser editor.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Markdown Format](#markdown-format)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Developer Edit Page](#developer-edit-page)
- [Images](#images)
- [Todo](#todo)
- [License](#license)
- [Author](#author)
- [Contributing](#contributing)

## Demo

See `public/images/demo.gif` for a quick look at the UI.

## Features

- ✏️ Write and edit posts in Markdown
- 🗂️ Manage posts by category and tag
- 📱 Responsive design
- 🔍 Search posts across titles, body text, categories and tags

## Tech Stack

- React / Next.js
- TypeScript
- Tailwind CSS
- Prisma
- Framer Motion

## Directory Structure

```text
src/              Application pages and layouts
src/lib/          Utility modules
public/images/    Image assets
blog/             Public blog posts
developers_blog/  Developer-only articles
```

## Markdown Format

A sample of the Markdown front matter used for posts is provided in `docs/markdown-structure.md`. Additional API route details are described in `docs/api-routes.md`.

## Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

### Disable initial mount animation

Add the following to `.env.local` if you want to stop the page transition animation during development:

```env
NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION=true
```

### Basic authentication

The `/developer_edit` page should be protected with Basic authentication. Set your credentials in `.env.local`:

```env
BASIC_AUTH_USERNAME=your_username
BASIC_AUTH_PASSWORD=your_password
```

## Environment Variables

Important variables used by the application are listed below. Copy `.env.example` to `.env.local` as a starting point.

| Variable                              | Description                        |
| ------------------------------------- | ---------------------------------- |
| NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION | Disable initial page fade-in       |
| BASIC_AUTH_USERNAME                   | Username for Basic auth            |
| BASIC_AUTH_PASSWORD                   | Password for Basic auth            |
| REVALIDATE_SECRET                     | Secret token for `/api/revalidate` |

`REVALIDATE_SECRET` is passed to `/api/revalidate?secret=...` to manually trigger incremental static regeneration.

## Deployment

Run a production build and start the server:

```bash
npm run build
npm start
```

Host the server on a Node.js environment such as AWS EC2.

## Developer Edit Page

The `/developer_edit` route allows in-browser creation and editing of Markdown articles. Be sure to protect this page with authentication before exposing it to the public. This repository does not include authentication setup by default.

## Images

Binary files such as images are not included. Place your own icons and backgrounds under `public/images/` and reference them via `/images/filename`.

| Purpose         | File              | Aspect Ratio | Size      |
| --------------- | ----------------- | ------------ | --------- |
| Header icon     | `header_icon.png` | 1:1          | 64×64     |
| Hero background | `hero_bg.png`     | 16:9         | 1920×1080 |
| Footer icon     | `footer_icon.png` | 1:1          | 48×48     |
| Favicon         | `favicon.png`     | 1:1          | 32×32     |
| OGP image       | `eye-catch.png`   | 16:9         | 1200×630  |

Both `favicon.png` and `eye-catch.png` reside in `public/images`. Access them as `/images/favicon.png` and `/images/eye-catch.png`.

## Todo

- Implement additional backend APIs
- Comment feature for articles

## License

[MIT](LICENSE)

## Author

- GitHub: [username](https://github.com/username)
- Twitter: [@user](https://twitter.com/user)

## Contributing

Issues and pull requests are welcome!
