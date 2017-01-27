#!/bin/sh

set -e

REMOTE=server
BRANCH=master

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "You have uncommitted changes, you probably don't want to update the server."
  exit 1
fi

echo "Pushing..."
git push $REMOTE $BRANCH
