# GitHub token setup

Create four separate fine-grained personal access tokens (PATs):

GitHub → Settings → Developer settings → Personal access tokens →
Fine-grained tokens → Generate new token

The PAT display name identifies the token in your GitHub account. The Actions
secret name is the name used by the workflows.

## 1. Desktop dispatch token

PAT display name:

`desktop-dispatch`

Repository access:

- Only `level-ci-secondary-repos/desktop`

Repository permissions:

- Contents: **Read and write**
- Metadata: **Read-only** (added automatically)
- Everything else: **No access**

Add the token as an Actions repository secret in:

- `level-ci-secondary-repos/checkout`

Use this secret name:

`DESKTOP_DISPATCH_TOKEN`

This token allows checkout to send a `repository_dispatch` event to desktop.

## 2. Checkout repository read token

PAT display name:

`checkout-read`

Repository access:

- Only `level-ci-secondary-repos/checkout`

Repository permissions:

- Contents: **Read-only**
- Metadata: **Read-only** (added automatically)
- Everything else: **No access**

Add the token as an Actions repository secret in:

- `level-ci-secondary-repos/desktop`

Use this secret name:

`CHECKOUT_REPOSITORY_READ_TOKEN`

This token allows desktop to assemble the application with either checkout
`main` or the checkout commit that requested the scan.

## 3. Healthcheck dispatch token

PAT display name:

`healthcheck-dispatch`

Repository access:

- Only `level-ci-secondary-repos/healthcheck`

Repository permissions:

- Contents: **Read and write**
- Metadata: **Read-only** (added automatically)
- Everything else: **No access**

Add the token as an Actions repository secret in:

- `level-ci-secondary-repos/desktop`

Use this secret name:

`HEALTHCHECK_DISPATCH_TOKEN`

This token allows desktop to send a `repository_dispatch` event to
healthcheck after uploading the assembled application.

## 4. Desktop artifact read token

PAT display name:

`desktop-artifact-read`

Repository access:

- Only `level-ci-secondary-repos/desktop`

Repository permissions:

- Actions: **Read-only**
- Metadata: **Read-only** (added automatically)
- Everything else: **No access**

Add the token as an Actions repository secret in:

- `level-ci-secondary-repos/healthcheck`

Use this secret name:

`DESKTOP_ARTIFACT_READ_TOKEN`

This token allows healthcheck to download the assembled application artifact
from the desktop workflow run.

## Adding an Actions repository secret

In each target repository, open:

Settings → Secrets and variables → Actions → New repository secret

If `level-ci-secondary-repos` is an organization, organization-owner approval may be
required before a fine-grained token can access its selected repositories.
