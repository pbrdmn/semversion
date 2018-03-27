# SemVersion

Methods to parse and compare SemVer (major.minor.patch) versions

## Test

```
yarn test
```

## Usage

```
const SemVersion = require('semversion')

SemVersion.from('1.2.3')
if (SemVersion.gt('1.5') && SemVersion.lt('2')) {
...
}
```
