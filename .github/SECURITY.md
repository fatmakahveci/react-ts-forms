# Security Policy

## Scope

This policy covers the `apps/form-validation` and `apps/user-management` examples, their
dependencies, and the build and CI configuration in this repository.

These applications demonstrate client-side form handling. Their validation
is intended for user feedback and is not a security boundary. If you adapt
the examples to accept or persist data on a server, validate input and enforce
authorization on that server as well. Use synthetic data when testing the
examples or recording demos.

## Supported Versions

Security fixes target the latest code on `main`. Older releases, other
branches, and forks are not maintained separately for security updates.

## Reporting a Vulnerability

Please do not disclose security vulnerabilities in public issues, discussions,
or pull requests.

Report a vulnerability through this repository's
[private vulnerability reporting](https://github.com/fatmakahveci/react-ts-forms/security/advisories/new).
If that option is unavailable, contact the repository owner through the
[GitHub profile](https://github.com/fatmakahveci) to arrange a private reporting
channel.

Include the following where available:

- A short description of the vulnerability and its potential impact.
- The affected application, file, or dependency, with a commit SHA or version.
- Reproduction steps and a minimal proof of concept using synthetic data.
- Any prerequisites, such as a particular configuration or deployment setup.
- Relevant logs with credentials, tokens, and personal information removed.
- Suggested mitigations or a proposed fix, if you have one.

For dependency findings, include the package name, installed version, advisory
identifier, and how the vulnerable behavior can be reached in these examples.
Do not include real secrets or other people's data in a report.

## Handling and Disclosure

Maintainers will review reports as availability permits, investigate the
impact, and coordinate fixes and disclosure through the private reporting
channel. This project does not guarantee response or remediation deadlines.

Please keep vulnerability details and proof-of-concept code private while
a fix is being coordinated. Discuss a disclosure date and any desired credit
with the maintainers before publishing details.

## Responsible Testing

Reproduce suspected vulnerabilities in a local environment or a deployment
you own or have explicit permission to test. Avoid accessing other people's
data, disrupting services, or testing unrelated third-party infrastructure.

Ordinary bugs and feature requests can be reported through public issues.
If you are unsure whether a finding has security implications, use the
private reporting channel first.
