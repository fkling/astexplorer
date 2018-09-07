#!/bin/sh

# This script pushes the provided version to the live server

set -e

REMOTE=${1:-"server"}
COMMIT=${2:-"gh-pages"}

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "You have uncommitted changes, you probably don't want to update the server."
  exit 1
fi

for i in {8..1}; do
  printf "\rPushing '$COMMIT' to '$REMOTE' in $i ..." && sleep 1;
done

echo "\nMarking commit..."
git tag -f website-current $COMMIT

echo "Pushing..."
git push -f $REMOTE refs/tags/website-current:refs/tags/website-current
