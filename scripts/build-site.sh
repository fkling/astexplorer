#!/bin/sh

set -e

BRANCH=${1:-"gh-pages"}
TARGETPATH="../$(basename $(pwd))_gh-pages"

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "Cannot build, your index contains uncommitted changes."
  exit 1
fi

# Initialize worktree
rm -rf $TARGETPATH
git worktree prune
git worktree add $TARGETPATH $BRANCH

echo "Building..."
rm -rf out/*
pushd website/
yarn build
popd
echo "Copying artifacts..."
cp -R out/ "$TARGETPATH/"
cp README.md "$TARGETPATH/README.md"
cp CNAME "$TARGETPATH/CNAME"

# Commit changes
pushd $TARGETPATH
echo "Committing..."
git add -A
if git diff --quiet && git diff --cached --quiet; then
  echo "No changes, nothing to commit..."
  exit 0
fi
git commit -m"Update site"
popd

rm -rf $TARGETPATH
git worktree prune
