#!/bin/sh

################# BACKEND #################
# Not necessary, we use Python pre-commit package

################# FRONTEND #################
if [ -d "./apps/frontend" ]; then
  cd ./apps/frontend || exit 1
  echo "***** FRONTEND | Running format, lint & test ******"
  docker-compose run -i -t --rm --entrypoint=sh web -c "yarn format || exit 1; yarn lint || exit 1; yarn test || exit 1" || exit 1
  cd ../..
fi
