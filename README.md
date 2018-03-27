# sem-ver

Methods to parse and compare SemVer versions

## Test

```
yarn test
```

## Usage

```
const SemVer = require('sem-ver')

SemVer.from('1.2.3')
if (SemVer.gt('1.5') && SemVer.lt('2')) {
...
}
```
