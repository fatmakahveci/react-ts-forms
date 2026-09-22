# Form Studio

Two focused React and TypeScript applications for accessible form validation and a personal people directory. Run both with Docker or develop each independently with Next.js.

![Form Studio: validation and people directory walkthrough](demo.gif)

## Applications

| Application      | Features                                                                                      | Docker URL            |
| ---------------- | --------------------------------------------------------------------------------------------- | --------------------- |
| Form validation  | Name and email checks, inline errors, first-error focus, progress, reset and success feedback | http://localhost:3000 |
| People directory | Add, edit, search, sort, delete and undo; browser storage; duplicate-name protection          | http://localhost:3001 |

Both interfaces support small screens, keyboard navigation, visible focus, labeled inputs and status announcements. They use system fonts and do not request external font services.

## Run with Docker

Start Docker Desktop, or Docker Engine with Compose v2, then run from the repository root:

```bash
docker compose up --build -d --wait
```

The two production containers run as non-root users with health checks. Host ports are bound to localhost. No local Node.js installation is needed.

```bash
# Optional host ports
FORM_VALIDATION_PORT=3100 USER_MANAGEMENT_PORT=3101 docker compose up --build -d --wait

# Start only one application
docker compose up --build -d --wait form-validation

# Inspect or stop the applications
docker compose ps
docker compose logs -f
docker compose down
```

Rebuild after code changes. Docker runs production builds; use the development servers for hot reload.

## Local development

Use Node.js 22.12+ (Node.js 22) and npm. From the repository root:

```bash
npm ci
npm ci --prefix apps/form-validation
npm ci --prefix apps/user-management

# Terminal 1
npm --prefix apps/form-validation run dev -- --port 3000

# Terminal 2
npm --prefix apps/user-management run dev -- --port 3001
```

Stop the Docker containers first if they are using these ports.

Both apps consume `packages/ui` as the local `@form-studio/ui` package.
Their `.npmrc` files install a package copy so each production build remains
self-contained. After editing shared styles or icons, refresh both copies:

```bash
npm ci --prefix apps/form-validation
npm ci --prefix apps/user-management
```

Restart the development servers after refreshing the package. Docker builds
copy the current shared package automatically.

## Quality checks

Run from the repository root after installing all three sets of dependencies:

```bash
npm run format:check
npm test
npm run lint
npm run typecheck
npm run build
```

Behavior tests cover field validation, reset, duplicate names, editing, search, sorting, persistence, delete/undo, malformed saved data and storage failures. CI runs tests, lint, type checking and both production builds.

## Data and validation

- The validation form accepts names of 2–60 characters and an email with a domain. Successful submissions only show a confirmation; no data is transmitted or stored.
- The directory accepts names of 2–60 characters and whole-number ages from 12 to 120. Names must be unique ignoring case and surrounding spaces.
- Up to 1,000 people can be saved to `localStorage` under `form-studio.users.v1`. Records survive page reloads in the same browser and origin. Different ports have separate storage.
- There is no backend, authentication, cross-device sync or automatic cross-tab synchronization. Use synthetic data for this demo. The directory is not intended for sensitive personal records.
- Storage failures are shown in the interface. Invalid saved data is preserved, and the current visit works in memory. Removing the storage key through browser site-data settings resets the directory.
- Undo restores the most recently deleted person. A successful add or edit replaces that undo opportunity.

Client-side checks improve usability; applications that add a backend must also validate input and enforce authorization on the server.

## Project structure

```text
apps/
  form-validation/
    src/app/                 Next.js routes
    src/components/forms/    Validation form
    src/hooks/               Typed input-state hook
    src/shared/              Shared types
  user-management/
    src/app/                 Directory page and global styles
    src/components/users/    Person form and list
    src/shared/              Types, validation and storage parsing
packages/ui/                 Shared styles and icon component
tests/                       Behavioral regression tests
Dockerfile                   Shared multi-stage production build
compose.yaml                 Both applications and local ports
```

Directories use lowercase kebab-case. React components use PascalCase filenames; non-JSX files use `.ts`. Next.js convention files retain names such as `page.tsx` and `layout.tsx`.

## Project resources

- [Changelog](CHANGELOG.md)
- [Contributing guide](.github/CONTRIBUTING.md)
- [Security policy](.github/SECURITY.md)
- [Apache 2.0 license](LICENSE.md)
