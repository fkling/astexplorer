#!/bin/bash
# Helper script build a specific or all parsers

printf "Last run: %s\n\n" "$(date +'%Y-%m-%d %H:%M %z')"

if [ ! -f ./build.sh ]; then
  echo "You have to set the current working directory to the location of this script" >&2
  exit 1
fi

export ROOT_DIR=$(realpath .)
export OUT_DIR=$(realpath "${OUT_DIR:-../out/parser}")
export BIN_DIR=$(realpath ./node_modules/.bin)
export SCRIPTS_DIR=$(realpath ./_scripts)
export CONFIGS_DIR=$(realpath ./_configs)

for i in "$@"; do
  case "$i" in
    --force|-f)
      export FORCE_UPDATE=1
      ;;
    *)
      dir="$i"
      ;;
  esac
done

## Find all parsers
for mkfile in $(find . -name 'node_modules' -prune -o -name 'Makefile' -print); do
  pushd $(dirname $mkfile) > /dev/null
  printf "#\n# ${PWD##$ROOT_DIR/}\n#\n"

  if ! $SCRIPTS_DIR/update.sh; then
    echo "Unable to update parser." >&2
    continue
  fi

  bundle_name=$(jq -r '.name // ""' package.json)
  if [ -z "$bundle_name" ]; then
    echo "Unable to determine bundle name." >&2
    continue
  fi

  bundle_path="$OUT_DIR/${bundle_name}.js"

  if ! make "$bundle_path"; then
    echo "Unable to build bundle." >&2
    continue
  fi

  echo
  popd > /dev/null
done
