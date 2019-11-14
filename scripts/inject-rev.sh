#!/bin/sh

# This script replaces the special character sequence @@COMMIT@@ in a file with
# a link to the commit on GitHub. The file path is passed as argument but is
# likely just out/index.html

rev=$(git rev-parse --short HEAD)
sed -i "s%@@COMMIT@@%Build: <a href='https://github.com/fkling/astexplorer/commits/$rev'>$rev</a>%" "$1"
