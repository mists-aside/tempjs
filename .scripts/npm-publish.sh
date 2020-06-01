#! /bin/bash
set -xe

# echo "//npmjs.com/:_authToken=$NPMJS_AUTH_TOKEN" > ~/.npmrc
npm set //npmjs.com/:_authToken $NPMJS_AUTH_TOKEN

npm publish --acccess public

echo 'Congrats on your publication!'
