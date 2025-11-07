#!/bin/bash
# Deploy script that avoids gh-pages cache issues

set -e

# Remove cache
rm -rf node_modules/.cache/gh-pages || true

# Stash any uncommitted changes
git stash push -m "Stash before deploy" || true

# Use git directly to deploy
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Add only files needed for deployment
git add index.html 404.html .nojekyll
git add css/ js/ projects/ public/
git add -f .nojekyll

git commit -m "Deploy to GitHub Pages" || true
git push origin gh-pages --force
git checkout main

# Restore stashed changes
git stash pop || true

echo "Deployment complete!"

