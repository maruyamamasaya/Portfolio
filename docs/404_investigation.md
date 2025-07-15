# 404 Investigation: "充電が80％で止まる理由と対処法" Article

## Summary
A user reported a 404 error when accessing `/blog/%E3%80%90iPhone%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%BF%85%E8%A6%8B%E3%80%91%E5%85%85%E9%9B%BB%E3%81%8C80%EF%BC%85%E3%81%A7%E6%AD%A2%E3%81%BE%E3%82%8B%E7%90%86%E7%94%B1%E3%81%A8%E5%AF%BE%E5%87%A6%E6%B3%95`.

## Findings
- Searching the repository showed no Markdown file for this article.
- The dynamic blog pages load Markdown files from the `blog/` directory based on the slug (file name) via `getPost`.
- Because the article file was missing, the route resulted in a 404.

## Fix
A new Markdown file was created at:
`blog/【iPhoneユーザー必見】充電が80％で止まる理由と対処法.md`
This file contains brief content explaining the iPhone charging behavior.

## Result
With the file present, the blog page should be generated correctly and the 404 error resolved after redeploying the site.
