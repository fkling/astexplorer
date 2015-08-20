#!/bin/bash

if ! git diff-index --quiet HEAD --; then
  echo >&2 "Cannot build, your index contains uncommitted changes."
  exit 1
fi

npm run build
git add -f app.js
git add -f babel.js
git add -f transform.js

git commit -m"${1:-'Update site'}"
