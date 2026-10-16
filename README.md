# Healthcheck

Playwright test runner and Level CI scan sender for the secondary-repository feature.

Repository: <https://github.com/level-ci-secondary-repos/healthcheck>

This repository is intentionally not connected as a Level CI project. It
uploads results to the desktop project and uses the supplied secondary
repository key when a scan originated from checkout.

## Topology

| Repository | Role in Level CI |
| --- | --- |
| `level-ci-secondary-repos/desktop` | Primary repository and application artifact producer |
| `level-ci-secondary-repos/checkout` | Secondary repository and PR comment target |
| `level-ci-secondary-repos/healthcheck` | Unconnected test runner and scan sender |

## Local setup

1. Make checkout available under the desktop fixture, matching the assembled
   CI artifact:

   ```sh
   ln -s ../checkout ../desktop/checkout
   ```

2. Export a valid `CLOUDSMITH_TOKEN`, then install the test dependencies:

   ```sh
   npm ci
   npx playwright install chromium
   ```

3. Generate fresh accessibility reports:

   ```sh
   npm run test:playwright
   ```

The reports are written to `./level-ci-reports`.
Remove `../desktop/checkout` when the local symlink is no longer
needed.

## GitHub Actions

This repository owns the complete test and scan job. `level-ci-secondary-repos/desktop`
sends a `level-ci-scan` repository dispatch containing an assembled application
artifact plus the branch, commit, pull request, and optional secondary
repository key used for Level CI attribution. Requests that originated in
checkout retain checkout's attribution metadata, so the Quality Gate comment
is posted on the checkout pull request. Healthcheck does not know how the
application artifact was assembled.

Configure these secrets and variables on healthcheck:

- secret `LEVEL_CI_TOKEN`
- secret `CLOUDSMITH_TOKEN`
- secret `DESKTOP_ARTIFACT_READ_TOKEN` with Actions read access to desktop
- secret `LEVEL_CI_PROJECT`
- variable `LEVEL_CI_ORGANIZATION`
- variable `LEVEL_CI_SERVER`

On desktop, configure `CHECKOUT_REPOSITORY_READ_TOKEN` with read access to
checkout and `HEALTHCHECK_DISPATCH_TOKEN` with write access to healthcheck's
contents. On checkout, configure `DESKTOP_DISPATCH_TOKEN` with write access to
desktop's contents and set the `LEVEL_CI_SECONDARY_REPOSITORY_KEY` secret.

See `TOKEN-SETUP.md` for the exact fine-grained PAT scopes and locations.

Push the workflows in this order: healthcheck, desktop, then checkout. GitHub
only receives repository dispatch events for workflows present on the target
repository's default branch.
