<div align="center">

<img src="https://github.com/user-attachments/assets/c111204d-2016-4343-92e4-83357cac4b19" width="96" height="96" alt="NotionNext Logo" />

# NotionNext

Build an independent website from Notion.

Keep writing in Notion, and publish your content as a blog, portfolio, knowledge base, directory, or product website.

<p>
  <a href="https://preview.tangly1024.com/">Live Preview</a>
  ·
  <a href="https://notionnext.tangly1024.com/user-guide/start-here">Get Started</a>
  ·
  <a href="https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG">Themes</a>
  ·
  <a href="https://notionnext.tangly1024.com/user-guide/showcase">Showcase</a>
  ·
  <a href="https://notionnext.tangly1024.com/">Docs</a>
  ·
  <a href="https://github.com/notionnext-org/NotionNext/discussions">Discussions</a>
</p>

<p>
  <a aria-label="GitHub commit activity" href="https://github.com/notionnext-org/NotionNext/commits/main" title="GitHub commit activity">
    <img src="https://img.shields.io/github/commit-activity/m/notionnext-org/NotionNext?style=for-the-badge"/>
  </a>
  <a aria-label="GitHub contributors" href="https://github.com/notionnext-org/NotionNext/graphs/contributors" title="GitHub contributors">
    <img src="https://img.shields.io/github/contributors/notionnext-org/NotionNext?color=orange&style=for-the-badge"/>
  </a>
  <a aria-label="Build status" href="#" title="Build status">
    <img src="https://img.shields.io/github/deployments/notionnext-org/NotionNext/Production?logo=Vercel&style=for-the-badge"/>
  </a>
  <a aria-label="Powered by Vercel" href="https://vercel.com?utm_source=Craigary&utm_campaign=oss" title="Powered by Vercel">
    <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" height="28"/>
  </a>
</p>

[中文](./README.md) | English

</div>

---

## What Is NotionNext?

NotionNext is an open-source website system built with **Next.js + Notion API**. You keep managing posts, categories, tags, menus, and pages in Notion. NotionNext turns that content into an independent website that can be visited, searched, customized, and operated over the long term.

It is useful for creators, indie hackers, designers, photographers, course authors, open-source maintainers, and small teams that want a fast website for content, docs, portfolios, or product pages.

## What Can You Build?

| Goal | Recommended Entry | Best For |
| --- | --- | --- |
| Personal blog | [Get started](https://notionnext.tangly1024.com/user-guide/start-here) | Writers, developers, students |
| Portfolio or personal brand | [Choose a theme by use case](https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG) | Designers, photographers, freelancers |
| Product website or SaaS landing page | [Starter / Landing / Proxio](https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG) | Indie products, startups, small teams |
| Knowledge base or docs site | [GitBook / Claude](https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG) | Open-source projects, course authors, teams |
| Directory or resource hub | [Nav theme](https://notionnext.tangly1024.com/user-guide/themes/nav) | Curators and community operators |

## Why NotionNext?

- **Keep using Notion**: posts, categories, tags, covers, menus, and pages stay in Notion.
- **Short path to launch**: duplicate the Notion template, fork the repository, connect Vercel, and deploy.
- **Many built-in themes**: 26 themes for blogs, docs, portfolios, product sites, galleries, and directories.
- **Built for long-term operation**: custom domains, SEO, Sitemap, RSS, comments, analytics, search, ads, and email subscription.
- **Open-source and controllable**: source code, configuration, and themes live in your own repository.
- **Clear data path**: Notion stores the content, the website handles publishing, and future migration remains possible.

## 20-Minute Deployment Path

1. Open the [theme preview site](https://preview.tangly1024.com/) and choose the site style you want.
2. Duplicate the official NotionNext Notion template.
3. Fork this repository to your GitHub account.
4. Deploy with [Vercel](https://notionnext.tangly1024.com/user-guide/deploy-vercel).
5. Set `NOTION_PAGE_ID` and other required environment variables.
6. After launch, configure your theme, domain, comments, analytics, and search as needed.

New users should start with the [Get Started guide](https://notionnext.tangly1024.com/user-guide/start-here).

## Themes

- Live theme switcher: [preview.tangly1024.com](https://preview.tangly1024.com/)
- Built-in themes: [Themes catalog](https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG)
- Theme docs in this repository: [docs/user-guide/themes/](./docs/user-guide/themes/)

| Use Case | Start With |
| --- | --- |
| Personal blog | `simple`, `hexo`, `nobelium`, `typography` |
| Docs / knowledge base | `gitbook`, `claude`, `thoughtlite` |
| Portfolio / personal brand | `opc`, `proxio`, `starter`, `landing` |
| Product website | `starter`, `landing`, `commerce` |
| Photo / visual content | `photo`, `plog`, `magzine` |
| Directory | `nav` |

## Local Development

Use Node 22 and Yarn 1. Node 20 cannot install the current dependency set because `@ai-sdk/google` requires Node >=22.

```bash
nvm use || nvm install
npm i -g yarn
yarn
yarn dev
```

Common commands:

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start local development |
| `yarn build` | Build for production |
| `yarn export` | Static export |
| `yarn docs:site:dev` | Preview the docs site locally |
| `yarn docs:site:build` | Build the docs site |

## Documentation

| Content | Link |
| --- | --- |
| Docs site | [notionnext.tangly1024.com](https://notionnext.tangly1024.com) |
| New user guide | [Get started](https://notionnext.tangly1024.com/user-guide/start-here) |
| Use-case templates | [Choose by goal](https://notionnext.tangly1024.com/user-guide/templates) |
| Configuration index | [Features and configuration](https://notionnext.tangly1024.com/user-guide/reference/features) |
| Theme docs | [26 built-in themes](https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG) |
| Showcase | [User websites](https://notionnext.tangly1024.com/user-guide/showcase): submit your site after launch |
| Docs source | [docs/](./docs/) |

## Community

The canonical repository is maintained by [notionnext-org](https://github.com/notionnext-org). Contributions to code, docs, themes, issues, reviews, and discussions are welcome.

| Content | Link |
| --- | --- |
| Community guide | [community-participate.md](./docs/user-guide/community-participate.md) |
| Vision and roadmap | [VISION_ROADMAP.md](./docs/developer/VISION_ROADMAP.md) |
| Contributing | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Governance | [GOVERNANCE.md](./GOVERNANCE.md) |
| Maintainers | [MAINTAINERS.md](./MAINTAINERS.md) |
| Code of Conduct | [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) |
| Discussions | [GitHub Discussions](https://github.com/notionnext-org/NotionNext/discussions) |

If you cloned from the old repository before the transfer, update your remote:

```bash
git remote set-url origin https://github.com/notionnext-org/NotionNext.git
git remote -v
```

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Styles**: [Tailwind CSS](https://tailwindcss.com/)
- **Rendering**: [react-notion-x](https://github.com/NotionX/react-notion-x)
- **Comments**: Twikoo, Giscus, Gitalk, Cusdis, Utterances
- **Deployment**: [Vercel](https://vercel.com)

## Acknowledgements

Special thanks to Craig Hart for initiating the Nobelium project.

<table><tr align="left">
  <td align="center"><a href="https://github.com/craigary" title="Craig Hart"><img src="https://avatars.githubusercontent.com/u/10571717" width="64px;" alt="Craig Hart"/></a><br/><a href="https://github.com/craigary" title="Craig Hart">Craig Hart</a></td>
</tr></table>

Thanks to everyone who contributes code, themes, docs, issues, reviews, and release maintenance.

[![Contributors](https://contrib.rocks/image?repo=notionnext-org/NotionNext)](https://github.com/notionnext-org/NotionNext/graphs/contributors)

## Usage Statement

This project is free and open source. Use it for personal learning and lawful website publishing. Do not use it to publish illegal content or conduct unlawful activities.

## License

The MIT License.
