#!/bin/sh

set -e

REMOTE=${1:-"server"}
BRANCH=${2:-"gh-pages"}
TARGETPATH="../$(basename $(pwd))_gh-pages"

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "Cannot build, your index contains uncommitted changes."
  exit 1
fi

for i in {5..1}; do
  printf "\rPushing '$BRANCH' to '$REMOTE' in $i ..." && sleep 1;
done

echo ''

# Initialize worktree
rm -rf $TARGETPATH
git worktree prune
git worktree add $TARGETPATH $BRANCH

# Updating
pushd $TARGETPATH
echo "Fetch latest changes from origin..."
git pull 
popd

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
if git diff --quiet && git diff --cached --quite; then
  echo "No changes, nothing to commit..."
else
  git commit -m"Update site"
fi

echo "Pushing..."
git push $REMOTE $BRANCH
popd
rm -rf $TARGETPATH
git worktree prune
