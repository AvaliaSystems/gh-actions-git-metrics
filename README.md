# gh-actions-git-metrics

This action extracts git metrics for the repo, by running the `git log` command and processing the outcome.

## Important

Before running the action, you MUST checkout the repository and fetch the entire history. This is done with the `fetch-depth: 0` parameter.

## Example usage

```
name: Extract git metrics

on: [workflow_dispatch]

jobs:
  clone_whole_history_and_run:
    runs-on: ubuntu-latest
    name: A job to extract metrics
    steps:
      - name: Checkout (whole history)
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Extract metrics
        id: extract_metrics
        uses: avaliasystems/gh-actions-git-metrics@main
```