#!/bin/sh

SOURCE_DIR=$1
TARGET_DIR=$2

for source_file in $(ls $1); do
  target_path=$TARGET_DIR/$source_file
  source_path=$SOURCE_DIR/$source_file

  if ! [ -f $target_path ]; then
    # If a file with the same name doesn't exist in the target directory, all is
    # good.
    continue
  fi

  case $source_file in
    # These files are allowed to differ since the are
    # not cached
    index.html|favicon.png)
      continue
      ;;
  esac

  if ! diff --brief $target_path $source_path > /dev/null; then
    echo "File '$source_file' already exists but has different content."
    conflict=1
  fi
done

if [ -n "$conflict" ]; then
  echo "Bump the cache breaker."
  exit 1
fi
