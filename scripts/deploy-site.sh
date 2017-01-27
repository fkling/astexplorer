#!/bin/sh

set -e

REMOTE=server
BRANCH=gh-pages
TARGETPATH="../$(basename $(pwd))_gh-pages"

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "Cannot build, your index contains uncommitted changes."
  exit 1
fi

# Initialize worktree
rm -rf $TARGETPATH
git worktree prune
git worktree add $TARGETPATH $BRANCH

# Updating
pushd $TARGETPATH
echo "Clear target..."
git pull 
# git rm -rf ./*
popd

echo "Building..."
rm -rf out/*
pushd website/
npm run build
popd
echo "Copying artifacts..."
cp -R out/ "$TARGETPATH/"
cp README.md "$TARGETPATH/README.md"
cp CNAME "$TARGETPATH/CNAME"

# Commit changes
pushd $TARGETPATH
echo "Committing..."
git add -A
if git diff --quiet && git diff --cached --quite; then
  echo "No changes, nothing to commit..."
  exit 0
fi
git commit -m"Update site" --allow-empty
echo "Pushing..."
git push $REMOTE $BRANCH
popd
rm -rf $TARGETPATH
git worktree prune
