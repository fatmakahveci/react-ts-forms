# React TypeScript Form Examples

[![Next.js](https://img.shields.io/badge/Next.js-React-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Examples](https://img.shields.io/badge/Examples-2-4F46E5)](https://github.com/fatmakahveci/react-ts-forms)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE.md)

A collection of two independent Next.js projects exploring typed form state, validation, reusable inputs, and list updates.

## Highlights

- `user-input`: reusable input hook with validation and form-state feedback
- `user-list-forms`: add validated users and render an in-memory user list
- TypeScript models shared across components
- Independent development and production builds for each example

## Technology

- Next.js
- React
- TypeScript
- Formik
- Yup

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
cd user-input
npm install
npm run dev

# Or run the user-list example
cd ../user-list-forms
npm install
npm run dev
```

Each example runs independently on http://localhost:3000. Stop the first development server before starting the other on the same port.

## Quality Checks

```bash
cd user-input && npm run lint && npm run build
cd user-list-forms && npm run lint && npm run build
```

## Repository Structure

- `user-input` — reusable input-hook example
- `user-list-forms` — user creation and list example

## Project Resources

- [Changelog](CHANGELOG.md)
- [Contributing guide](.github/CONTRIBUTING.md)
- [Security policy](.github/SECURITY.md)
- [License](LICENSE.md)
