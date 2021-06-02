#!/usr/bin/env bash
node commentTest.js
if [ $? != 0 ]; then
  echo "The above files don't have an author comment"
  echo "=== PIPELINE FAILED ==="
  exit 1
fi
echo INSTALLING
npm install
echo BUILDING
npm run build
echo TESTING
npm run test

cd ..
git add .
echo "Committing.. $1"
git commit -m $1
echo "Pushing.."
git push
git status
echo "== PIPELINE DONE =="
