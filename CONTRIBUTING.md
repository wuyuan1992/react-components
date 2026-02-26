# Contributing Guide

Thank you for your interest in contributing! Please read this guide before submitting a pull request.

## Development Setup

### Prerequisites

- **Node.js** 20.x (see `.nvmrc`)
- **pnpm** ≥ 9.x
- **PostgreSQL** (local or Docker)

### Getting Started

```bash
# 1. Fork and clone the repo
git clone https://github.com/<your-fork>/2026-next-app.git
cd 2026-next-app

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Set up the database
pnpm db:push

# 5. Start the development server
pnpm dev
```

## Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes following the conventions in [CLAUDE.md](./CLAUDE.md).
3. Add tests for your changes.
4. Ensure all checks pass:
   ```bash
   pnpm lint && pnpm typecheck && pnpm test:run
   ```
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add my feature"
   ```
6. Push and open a Pull Request against `main`.

## Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

## Code Style

- **Biome** handles all linting and formatting. Run `pnpm format` before committing.
- Follow the conventions documented in [CLAUDE.md](./CLAUDE.md).
- All new files must include TypeScript types; avoid `any`.

## Testing

- Add unit tests in `tests/unit/` for new utilities/hooks.
- Add E2E tests in `tests/e2e/` for new user-facing features.
- Maintain coverage ≥ 80% on `lib/` and `hooks/`.

## Pull Request Guidelines

- Keep PRs focused — one concern per PR.
- Fill out the PR template completely.
- PRs must pass all CI checks before merging.
- Squash commits before merging.

## Questions?

Open a [GitHub Discussion](https://github.com/discussions) rather than an issue.
