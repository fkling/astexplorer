#!/bin/sh

set -e

REMOTE=${1:-"server"}
LATEST_BRANCH=${2:-"website-latest"}
STABLE_BRANCH=${3:-"website-stable"}

TARGETPATH="../$(basename $(pwd))_$STABLE_BRANCH"
WORKING_DIR=$(pwd)

trap cleanup EXIT

function cleanup {
  if [ -d $TARGETPATH ]; then
    echo "Cleaning up worktree"
    git worktree remove -f $TARGETPATH
  fi
  cd $WORKING_DIR
}

echo "Creating worktree for $STABLE_BRANCH..."
# Initialize worktree
git worktree add $TARGETPATH $STABLE_BRANCH

cd $TARGETPATH

echo "Merging $LATEST_BRANCH into $STABLE_BRANCH..."
git merge --squash --strategy-option=theirs $LATEST_BRANCH

if ! git diff --cached --quiet; then
  git commit -m"Publish"
  $WORKING_DIR/scripts/deploy.sh $REMOTE $STABLE_BRANCH
else
  echo "Nothing to do"
fi
