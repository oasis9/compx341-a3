#!/usr/bin/env bash

check() {
  if [ $? != 0 ]; then
    if [ ! -z "$1" ]; then
      echo "$1"
    fi
    echo
    echo "=== PIPELINE FAILED ==="
    exit 1
  fi
}

COMMENT="$1"

echo
echo "=== COMPX341-21A Bookstore Pipeline ==="
echo

(exit $([ ! -z "$COMMENT" ]))
check "Please provide a commit message."

echo "Checking for comments.."
node commentTest.js
check "The above files don't have an author comment."
echo "All .ts files have an author comment."
echo

echo "Running npm install.."
npm install
check "Install failed."
echo "Install done."
echo

echo "Running npm run build.."
npm run build
check "Build failed."
echo "Build done."
echo

echo "Running npm run test.."
CI=true npm test
check "Tests failed."
echo "Tests done."
echo

cd ..
echo "Staging.."
git add .
check "Staging failed."

echo "Committing.."
echo "$1"
git commit -m "$1"
check "Commit failed."
echo "Committed."
echo

echo "Pushing.."
git push
check "Push failed."
echo "Pushed."
echo

git status

echo
echo "=== PIPELINE DONE ==="
