// .mocharc.js

const config = require('./.config');

const chai = [
    'chai/register-assert',  // Using Assert style
    'chai/register-expect',  // Using Expect style
    'chai/register-should',  // Using Should style
];

mochaConfig = {
    recursive: true,
    reporter: 'spec',
    timeout: 5000
};


esConfig = {
    ...mochaConfig,
    require: ['@babel/register', ...chai]
};

tsConfig = {
    ...mochaConfig,
    require: ['ts-node/register', ...chai]
};

module.exports = (config.language === "typescript") ? tsConfig : esConfig;
