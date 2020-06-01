#! /bin/bash
set -xe

if [[ $TRAVIS_NODE_VERSION == '12' ]] && [[ $TRAVIS_OS_NAME == 'linux' ]]; then

  # echo "//resistry.npmjs.com/:_authToken=$NPMJS_AUTH_TOKEN" > ~/.npmrc
  npm config set registry http://registry.npmjs.com
  npm set //registry.npmjs.com/:_authToken $NPMJS_AUTH_TOKEN

  # npm install -g npm-cli-login
  # npm-cli-login login -u $NPMJS_USER -p $NPMJS_PASS -e $NPMJS_MAIL -r http://registry.npmjs.org

  npm publish #--acccess public

  echo 'Congrats on your publication!'

fi
