# Project Title

Set of shield/badges explaining where to find more information about the project (i.e. Where to look for unit test reports, where to see code coverage and code scans, etc.). You can find a lot of them on https://shields.io/)

[![Npm Version](https://img.shields.io/npm/v/frameworks.svg)](https://www.npmjs.com/package/frameworks)
[![Contributors](https://img.shields.io/github/contributors/mists-aside/tempjs)](https://img.shields.io/github/contributors/mists-aside/tempjs)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/mists-aside/tempjs/issues)

[![TravisCI](https://travis-ci.org/mists-aside/tempjs.svg?branch=master)](https://travis-ci.org/mists-aside/tempjs)
<!-- [![CircleCI](https://circleci.com/gh/mists-aside/tempjs.svg?style=shield)](https://circleci.com/gh/mists-aside/tempjs) -->

[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=mists-aside_tempjs&metric=alert_status)](https://sonarcloud.io/dashboard?id=mists-aside_tempjs) 
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=mists-aside_tempjs&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=mists-aside_tempjs)
[![SonarCloud Bugs](https://sonarcloud.io/api/project_badges/measure?project=mists-aside_tempjs&metric=bugs)](https://sonarcloud.io/component_measures/metric/reliability_rating/list?id=mists-aside_tempjs)
[![SonarCloud Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=mists-aside_tempjs&metric=vulnerabilities)](https://sonarcloud.io/component_measures/metric/security_rating/list?id=mists-aside_tempjs)

<!--
[![Donate to this project using Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://patreon.com/dragoscirjan)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UMMN8JPLVAUR4&source=url)
[![Donate to this project using Flattr](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/balupton)
[![Donate to this project using Liberapay](https://img.shields.io/badge/liberapay-donate-yellow.svg)](https://liberapay.com/dragoscirjan)
[![Donate to this project using Thanks App](https://img.shields.io/badge/thanksapp-donate-yellow.svg)](https://givethanks.app/donate/npm/badges)
[![Donate to this project using Boost Lab](https://img.shields.io/badge/boostlab-donate-yellow.svg)](https://boost-lab.app/dragoscirjan/badges)
[![Donate to this project using Buy Me A Coffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg)](https://buymeacoffee.com/balupton)
[![Donate to this project using Open Collective](https://img.shields.io/badge/open%20collective-donate-yellow.svg)](https://opencollective.com/dragoscirjan)
[![Donate to this project using Cryptocurrency](https://img.shields.io/badge/crypto-donate-yellow.svg)](https://dragoscirjan.me/crypto)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://dragoscirjan.me/paypal)
[![Buy an item on our wishlist for us](https://img.shields.io/badge/wishlist-donate-yellow.svg)](https://dragoscirjan.me/wishlist)
-->

One Paragraph of project description goes here

<!-- TOC -->

- [Project Title](#project-title)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
      - [Code](#code)
      - [Documentation](#documentation)
    - [Development](#development)
      - [Requirements](#requirements)
    - [Testing](#testing)
    - [Deployment](#deployment)
  - [Authors](#authors)
  - [Issues / Support](#issues--support)

<!-- /TOC -->

## Getting Started

### Installation

Use **npm** (or any other package manager) do add this module to your project.

```bash
npm i -D @mists/tempjs
```

#### Code

```typescript
import {FileHandle, tempFile, tempFileOfSize} from '@mists/tempjs';
```

#### Documentation

See documentation [here](/doc/doc.md)

### Development

If you have access to the project clone it, otherwise fork it and clone it:

```
git clone https://github.com/mists-aside/tempjs
# create a new branch if necesary
git create -b new_feature
```

Code ;)

#### Requirements

- Please install [NodeJs](https://nodejs.org/en/). We support version 10.x and above.
- Please instal a JavaScript/TypeScript IDE
  - [Visual Studio Code](https://code.visualstudio.com/) with [ITMCDev Babel Extension Pack](https://marketplace.visualstudio.com/items?itemName=itmcdev.node-babel-extension-pack) or [ITMCDev TypeScript Extension Pack](https://marketplace.visualstudio.com/items?itemName=itmcdev.node-typescript-extension-pack)
  - [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/)
  - [Vim](https://www.vim.org/) with [neoclide/coc.nvim](https://github.com/neoclide/coc.nvim) and [HerringtonDarkholme/yats.vim](https://github.com/HerringtonDarkholme/yats.vim) extensions.
  - Any other IDE you trust.

### Testing

Just run `npm run test`. 

If you wish to run a single test file, use `npm run test:single -- test/file.test.ts`

No need to compile tests, mocha is configured to run TypeScript.

### Deployment

NPM publishing *~~is done~~* will be done automatically, through `.travis.yaml`. Please do not attempt to change the publishig routine.

## Authors

- [Dragos Cirjan](mailto:dragos.cirjan@gmail.com) - Initial work - [Go Template](/mists-aside/tempjs)

See also the list of contributors who participated in this project.

## Issues / Support

Add a set of links to the [issues](/mists-aside/tempjs/issues) page/website, so people can know where to add issues/bugs or ask for support.
