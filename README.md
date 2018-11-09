# SemVersion

Methods to parse and compare SemVer (major.minor.patch) versions

[![Build Status](https://travis-ci.org/dustykeyboard/semversion.svg?branch=master)](https://travis-ci.org/dustykeyboard/semversion)

## Installation

```
npm install semversion
```

## Test

```
npm run test
```

## Usage

```
const SemVersion = require('semversion')

SemVersion.from('1.2.3')
if (SemVersion.gt('1.5') && SemVersion.lt('2')) {
...
}
```