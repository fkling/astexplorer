#!/bin/sh

TARGETPATH="../$(basename $(pwd))_gh_pages"

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "Cannot build, your index contains uncommitted changes."
  exit 1
fi

# Initialize worktree
rm -rf $TARGETPATH
git worktree prune
git worktree add $TARGETPATH gh-pages

# Updating
pushd $TARGETPATH
echo "Clear target..."
git pull
git rm -rf ./*
popd

echo "Building..."
rm -rf out/*
npm run build
echo "Copying artifacts..."
cp -R out/ "$TARGETPATH/"
cp README.md "$TARGETPATH/README.md"
cp CNAME "$TARGETPATH/CNAME"

# Commit changes
pushd $TARGETPATH
echo "Committing..."
touch .nojekyll
git add -A
if git diff --quiet && git diff --cached --quite; then
  echo "No changes, nothing to commit..."
  exit 0
fi
git commit -m"Update site"
echo "Pushing..."
git push origin
popd
rm -rf $TARGETPATH
git worktree prune
