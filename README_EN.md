# Free Installation and Usage Guide

Click here to access the help documentation: NotionNext Help Manual - (Completely Free)

## Rights Statement

This project's tutorial is a free and open resource intended solely for personal learning use. It is strictly prohibited for any individual or organization to use this tutorial for commercial purposes, including but not limited to direct sales, indirect charges, or any other forms of profit. When reproducing, copying, or sharing this tutorial, the author's information must be retained, and the source clearly cited.

This project only offers paid consultation services authorized by the author's team. Please be vigilant against fraud. Any unauthorized paid services may be subject to legal risks.

You can set up your personal website in just a few minutes. Here is the link to my free tutorial:

# NotionNext

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


[中文文档](./README.md) | README in English

<hr/>

A static blog system built with NextJS and Notion API, deployed on Vercel. Designed for Notion and all creators.

**Repository hosting:** The main repository is maintained by the GitHub organization **[notionnext-org](https://github.com/notionnext-org)** (canonical: `https://github.com/notionnext-org/NotionNext`). Contributions are welcome; see the org page for collaboration. If you cloned before the transfer, run `git remote set-url origin https://github.com/notionnext-org/NotionNext.git` and verify with `git remote -v`.

## Community

| | |
| --- | --- |
| **Participate** | [community-participate.md](./docs/user-guide/community-participate.md) · [Discussions](https://github.com/notionnext-org/NotionNext/discussions) |
| **Contributing** | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| **Governance** | [GOVERNANCE.md](./GOVERNANCE.md) · [MAINTAINERS.md](./MAINTAINERS.md) |
| **Code of Conduct** | [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) |
| **Docs site** | [notionnext.tangly1024.com](https://notionnext.tangly1024.com) |

## 3-Minute Quick Start

```bash
# 1) Use Node 22 (nvm recommended; Node 20 cannot install current dependencies)
nvm use || nvm install

# 2) Install Yarn if needed
npm i -g yarn

# 3) Install dependencies and start dev server
yarn
yarn dev
```

Common commands:

- Local development: `yarn dev`
- Production build: `yarn build`
- Static export: `yarn export`

Note: local workflow stays simple (`yarn`), while lockfile consistency is enforced in CI.

## Developer Docs Navigation

To help new contributors get started quickly, the project keeps docs bilingual with clear entry points:

- [Docs index (中文)](./docs/README.md)
- [Developer docs (English)](./docs/developer/README.en.md)
- [Contribution (中文)](./CONTRIBUTING.zh-CN.md)
- [Contribution Guide (English)](./CONTRIBUTING.md)

## Themes & preview

- **Live theme switcher**: [preview.tangly1024.com](https://preview.tangly1024.com/)
- **All 25 themes**: [THEMES_CATALOG.md](./docs/user-guide/themes/THEMES_CATALOG.md)
- New theme? See [CONTRIBUTING.md](./CONTRIBUTING.md) and [Theme Migration Guide](./docs/developer/THEME_MIGRATION_GUIDE.md)

## Acknowledgements

Special thanks to Craig Hart for initiating the Nobelium project.

<table><tr align="left">
  <td align="center"><a href="https://github.com/craigary" title="Craig Hart"><img src="https://avatars.githubusercontent.com/u/10571717" width="64px;"alt="Craig Hart"/></a><br/><a href="https://github.com/craigary" title="Craig Hart">Craig Hart</a></td>
</tr></table>

## Contributors

This project exists thanks to all the people who contribute.

[![Contributors](https://contrib.rocks/image?repo=notionnext-org/NotionNext)](https://github.com/notionnext-org/NotionNext/graphs/contributors)

## Technologies Used

- **Technical Framework**: [Next.js](https://nextjs.org)
- **Styles**: [Tailwind CSS](https://www.tailwindcss.cn/)
- **Rendering Tool**: [React-notion-x](https://github.com/NotionX/react-notion-x)
- **COMMENT**: [Twikoo](https://github.com/imaegoo/twikoo), [Giscus](https://giscus.app/zh-CN), [Gitalk](https://gitalk.github.io), [Cusdis](https://cusdis.com), [Utterances](https://utteranc.es)
- **ICON**: [Fontawesome](https://fontawesome.com/v6/icons/)


## License

The MIT License.
