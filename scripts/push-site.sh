#!/bin/sh

TARGETPATH="../$(basename $(pwd))_gh_pages"
REMOTE=$(git remote -v | grep origin | grep "(push)" | cut -f 2 | cut -d ' ' -f 1)

if ! git diff --quiet && git diff --cached --quiet; then
  echo >&2 "Cannot build, your index contains uncommitted changes."
  exit 1
fi

if [ ! -d "$TARGETPATH" ]; then
  echo "Cloning into '$TARGETPATH'..."
  git clone ./ "$TARGETPATH"
  cd "$TARGETPATH"
  git checkout gh-pages
  git remote set-url --push origin $REMOTE
  cd - > /dev/null
fi

# Updating
echo "Clear target..."
cd "$TARGETPATH"
git pull origin
git rm -rf *
cd - > /dev/null

echo "Building..."
rm -rf out/*
npm run build
echo "Copying artifacts..."
cp -R out/ "$TARGETPATH/"
cp README.md "$TARGETPATH/README.md"
cp CNAME "$TARGETPATH/CNAME"

# Commit changes
cd $TARGETPATH
if git diff --quiet && git diff --cached --quite; then
  echo "No changes, nothing to commit..."
  exit 0
fi
echo "Committing..."
git add -A
git commit -m"Update site"
echo "Pushing..."
git push origin
echo "done"
