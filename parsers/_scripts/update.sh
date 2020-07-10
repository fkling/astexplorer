#!/bin/sh

if [ -e '.ignore' ]; then
  echo "ignored"
  exit 0
fi

if [ -n "$FORCE_UPDATE" -o ! -e .updated ]; then
  # always update
  echo "force update"
  touch .updated
else
  # npm outdated --parseable returns data in the format
  # path:have:wanted:latest
  # An error doesn't mean that we need to update. We also need to compare 
  # "have" and "wanted"
  if ! output=$(npm outdated --parseable); then
    needs_update=
    for line in $output; do
      want=$(echo "$line" | cut -d ':' -f 2)
      have=$(echo "$line" | cut -d ':' -f 3)
      if [ "$have" != "$want" ]; then
        needs_update="${needs_update}$have -> $want\n"
      fi
    done
    if [ -n "$needs_update" ]; then
      echo "Need update"
      printf "$needs_update"
      # Without '--force' npm will refuse to install packages because the
      # package name is often the same as the parser that is a dependency
      npm up --force --no-save
      touch .updated
      exit 0
    fi
  fi
  echo "packages up-to-date"
fi
