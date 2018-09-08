#!/bin/sh

set -e

BRANCH=${1:-"website-latest"}
TARGETPATH="../$(basename $(pwd))_$BRANCH"
WORKING_DIR=$(pwd)

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "Cannot build, your index contains uncommitted changes."
  exit 1
fi

trap cleanup EXIT

function cleanup {
  if [ -d $TARGETPATH ]; then
    echo "Cleaning up worktree"
    git worktree remove -f $TARGETPATH
  fi
  cd $WORKING_DIR
}

# Initialize worktree
git worktree add $TARGETPATH $BRANCH

echo "Building..."
rm -rf out/*
cd website/
yarn build
cd $WORKING_DIR

echo "Copying artifacts..."
cp -R out/ "$TARGETPATH/"
cp README.md "$TARGETPATH/README.md"
cp CNAME "$TARGETPATH/CNAME"

# Commit changes
echo "Committing..."
cd $TARGETPATH
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

exit $exit_code
