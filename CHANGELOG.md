# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
where applicable.

## [Unreleased]

### Added

- Responsive Form Studio interfaces with accessible field errors and status feedback.
- Persistent people directory with editing, search, sorting and delete/undo.
- Defensive storage parsing, duplicate detection and whole-number age validation.
- Docker Compose support, health checks and non-root production containers.
- Behavioral regression tests, ESLint, TypeScript and formatting checks.

### Changed

- Organized independent applications under `apps/form-validation` and `apps/user-management`.
- Replaced blocking error dialogs with inline errors and first-invalid-field focus.
- Strengthened input-state typing and email validation.

### Removed

- Unused example components, placeholder files and unused runtime dependencies.

<!--
When preparing a release, move relevant entries from Unreleased into a dated
version section. Use Added, Changed, Deprecated, Removed, Fixed, and Security
headings as appropriate.
-->
