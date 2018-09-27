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
  cd $WORKING_DIR
  if [ -d $TARGETPATH ]; then
    echo "Cleaning up worktree"
    git worktree remove -f $TARGETPATH
  fi
}

function build {
  set -e
  # Initialize worktree
  git worktree add $TARGETPATH $BRANCH

  echo "Building..."
  rm -rf out/*
  cd website/
  yarn && yarn build
  cd $WORKING_DIR

  echo "Copying artifacts..."
  cp -R out/ "$TARGETPATH/"
  cp README.md "$TARGETPATH/README.md"
  cp CNAME "$TARGETPATH/CNAME"

  # Commit changes
  cd $TARGETPATH
  git add -A
  if git diff --quiet && git diff --cached --quiet; then
    echo "No changes, nothing to commit..."
    exit 0
  fi

  modified_files=$(git status --short | grep 'M ' | wc -l | tr -d '[:space:]')

  if [ "$modified_files" != "1" ]; then
    echo "More than one file was modified. This probably implies that an existing JS file was updated, which breaks clients because of long term caching. Update the cache breaker instead."
    echo "Changes in this build:"
    git status
    echo "Not committing changes"
    return 123
  else
    ask_commit "Update site"
    return $?
  fi
}

function bump_cache_breaker {
  cache_breaker_file=$WORKING_DIR/website/CACHE_BREAKER
  oldnum=$(cat $cache_breaker_file)
  newnum=$(expr $oldnum + 1)
  echo $newnum > $cache_breaker_file
  echo "New cache breaker: $newnum"
  git diff
  if ask_commit "Bump cache breaker"; then
    return 0
  else
    # restore previous value
    echo $oldnum > $cache_breaker_file
    return 1
  fi
}

function ask_commit {
  echo "Commit changes (y/n)"
  read answer
  if [ "$answer" != "${answer#[Yy]}" ] ;then
    git add .
    git commit -m"$1"
    return 0
  fi
  return 1
}

build && :
rc=$?

if [ $rc -eq 123 ]; then
  echo "Do you want to bump the cache breaker (y/n) ?"
  read answer
  if [ "$answer" != "${answer#[Yy]}" ] ;then
    cleanup
    if bump_cache_breaker; then
      build
    else
      echo "Not bumping cache breaker, either due error or user choice"
    fi
  fi
fi


