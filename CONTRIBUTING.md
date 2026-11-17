# Contributing

- [Repository and organization](#repository-and-organization)
- [First contribution](#first-contribution)
- [Setup](#setup)
- [Community and governance](#community-and-governance)
- [Creating new themes](#creating-new-themes)
- [Adding localizations](#adding-localizations)
- [Environment Variables](#environment-variables)

Thanks for considering to contribute!

## Repository and organization

The canonical repository is now under the **[notionnext-org](https://github.com/notionnext-org)** GitHub organization (moved from personal ownership for clearer governance):

**https://github.com/notionnext-org/NotionNext**

If you contribute long-term or help with org-wide automation, check the organization page for how to join. **You are welcome to request membership** when that fits your role.

If you cloned the repo before the transfer, update your default remote so you do not rely on redirects forever:

```bash
git remote set-url origin https://github.com/notionnext-org/NotionNext.git
git remote -v
```

The fork-and-PR workflow is unchanged; open pull requests against **notionnext-org/NotionNext**.

## First contribution

1. Pick an issue labeled **`good first issue`**, or fix a doc page you are reading.  
2. Docs: edit `docs/user-guide/**/*.md`, preview with `yarn docs:site:dev`, open a PR. See [maintain-docs](./docs/user-guide/maintain-docs.md).  
3. Code: use a feature branch, run lint/type-check/tests, open a PR.  
4. Larger changes: read [RFC guide](./docs/developer/rfc/README.md) or start a [Discussion](https://github.com/notionnext-org/NotionNext/discussions) first.  
5. Maintainer path: [community-participate](./docs/user-guide/community-participate.md) · [MAINTAINERS.md](./MAINTAINERS.md).

## Setup

To contribute to NotionNext, follow these steps:

1. [Fork][fork] the repository to your GitHub account.
2. Clone the repository to your device (or use something like Codespaces).
3. Create a new branch in the repository.
4. Make your modifications.
5. Commit your modifications and push the branch.
6. [Create a PR][pr] from the branch in your fork to NotionNext' `main` branch.

## Required Workflow Rules

Please follow these rules for every contribution:

1. Create a dedicated branch for each task (do not commit directly to `main`).
2. Keep PRs focused and minimal (avoid mixing unrelated refactors/config edits).
3. Do not commit personal/local files such as `.env.local`.
4. Do not submit personalized config defaults that can affect other contributors.
5. Run lint/tests before opening PR.

Core maintainers should also read [Maintenance and change-control philosophy](./docs/developer/MAINTENANCE_PHILOSOPHY.en.md) to keep `main` stable and reviewable.

For full Chinese workflow guidance, see:

- [Docs Navigation](./docs/README.md)
- [Contribution Workflow](./docs/CONTRIBUTION_WORKFLOW.md)
- [Configuration Rules](./docs/CONFIGURATION.md)

This project is built with [Next.js][next.js] and `yarn` as the package manager.
Here are some commands that you can use:

- `yarn`: install dependencies
- `yarn dev`: compile and hot-reload for development
- `yarn build`: compile and minify for production
- `yarn start`: serve the compiled build in production mode

## Creating new themes

If you want to submit your custom theme to NotionNext, copy a new folder in
[`themes`][themes-dir] from [`example`][example]. The folder name  will be the
theme's key. 

## Adding localizations

If your language is not yet supported by NotionNext, please contribute a
localization! Follow these steps to add a new localization:

1. Copy one of the [en-US.js][en-US.js] in [lang-dir][lang-dir] and rename the new
   directory into your language's code ( e.g. `zh-CN.js`).
2. Start translating the strings.
3. Add your language config to [lang.js][lang.js]. 
4. [Create a PR][pr] with your localization updates.

## Environment Variables

NotionNext uses environment variables for configuration. To set up your development environment:

1. Copy `.env.example` to `.env.local`
2. Fill in the required values in `.env.local`
3. Never commit `.env.local` to version control

## Community and governance

- [Participate](./docs/user-guide/community-participate.md)  
- [Governance](./GOVERNANCE.md) · [Maintainers](./MAINTAINERS.md)  
- [Code of Conduct](./CODE_OF_CONDUCT.md)  
- [Discussions](https://github.com/notionnext-org/NotionNext/discussions)

The configuration priority is:
1. Notion Config Table (highest)
2. Environment Variables
3. blog.config.js (lowest)

[fork]: https://github.com/notionnext-org/NotionNext/fork
[pr]: https://github.com/notionnext-org/NotionNext/compare
[next.js]: https://github.com/vercel/next.js
[themes-dir]: themes
[example]: themes/example
[lang-dir]: lib/lang
[en-US.js]: lib/lang/en-US.js
[lang.js]: lib/lang.js
