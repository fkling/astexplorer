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

exit_code=0
modified_files=$(git status --short | grep 'M ' | wc -l | tr -d '[:space:]')

if [ "$modified_files" != "1" ]; then
  echo "More than one file was modified. This probably implies that an existing JS file was updated, which breaks clients because of long term caching. Update the cache breaker instead."
  echo "Changes in this build:"
  git status
  echo "Not committing changes"
  exit_code=1
else
  echo "Commiting changes"
  git commit -m"Update site"
fi

popd

rm -rf $TARGETPATH
git worktree prune
exit $exit_code
