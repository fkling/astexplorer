#!/bin/sh

set -e

REMOTE=${1:-"server"}
BRANCH=${2:-"master"}

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "You have uncommitted changes, you probably don't want to update the server."
  exit 1
fi

for i in {5..1}; do
  printf "\rPushing '$BRANCH' to '$REMOTE' in $i ..." && sleep 1;
done

echo "\nPushing..."
git push $REMOTE $BRANCH
