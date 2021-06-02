#!/usr/bin/env bash
echo "Checking for comments.."
node commentTest.js
if [ $? != 0 ]; then
  echo "The above files don't have an author comment"
  echo "=== PIPELINE FAILED ==="
  exit 1
fi

echo "Running npm install.."
npm install
echo "Install done"
echo

echo "Running npm run build.."
npm run build
echo "Build done"
echo

echo "Running npm run test.."
CI=true npm test
echo "Tests done"
echo

cd ..
git add .
echo "Committing.."
echo "$1"
git commit -m "$1"
echo "Pushing.."
git push
git status
echo
echo "=== PIPELINE DONE ==="
