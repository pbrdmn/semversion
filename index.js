const SemVersion = (() => {
  let version = {
    major: 0,
    minor: 0,
    patch: 0,
    pre: undefined,
    meta: undefined,
  }

  const isSemVersion = v =>
    v &&
    v.hasOwnProperty('major') &&
    typeof v.major === 'number' &&
    v.hasOwnProperty('minor') &&
    typeof v.minor === 'number' &&
    v.hasOwnProperty('patch') &&
    typeof v.patch === 'number'

  const parse = v => {
    if (isSemVersion(v)) return v

    const [nonMeta, meta] = v.split('+', 2)
    const [nonPre, pre] = nonMeta.split('-', 2)
    const [major = 0, minor = 0, patch = 0] = nonPre
      .split('.', 3)
      .map(part => parseInt(part, 10))

    return { major, minor, patch, pre, meta }
  }

  function from(v) {
    version = parse(v)
    return this
  }

  const get = () => version

  const toString = (v = version) => {
    let string = [v.major, v.minor, v.patch].join('.')
    if (v.pre) string += `-${v.pre}`
    if (v.meta) string += `+${v.meta}`
    return string
  }

  const cmp = (a, b) => {
    if (a.major == b.major && a.minor == b.minor && a.patch == b.patch) {
      if (typeof a.pre == 'undefined' && typeof b.pre == 'undefined') {
        return 0
      }

      if (typeof a.pre == 'undefined' || typeof b.pre == 'undefined') {
        if (typeof a.pre !== 'undefined') return 1
        if (typeof b.pre !== 'undefined') return -1
      }  

      if (a.pre == b.pre) return 0

      return a.pre > b.pre ? 1 : -1
    }

    if (
      a.major > b.major ||
      (a.major == b.major && a.minor > b.minor) ||
      (a.major == b.major && a.minor === b.minor && a.patch > b.patch)
    )
      return 1

    if (
      a.major < b.major ||
      (a.major == b.major && a.minor < b.minor) ||
      (a.major == b.major && a.minor === b.minor && a.patch < b.patch)
    )
      return -1

    return 0
  }

  return {
    isSemVersion,
    parse,
    from,
    get,
    toString,
    cmp: (a, b) => cmp(parse(a), parse(b)),
    eq: v => cmp(version, parse(v)) === 0,
    gt: v => cmp(version, parse(v)) > 0,
    ge: v => cmp(version, parse(v)) >= 0,
    lt: v => cmp(version, parse(v)) < 0,
    le: v => cmp(version, parse(v)) <= 0,
  }
})()

module.exports = SemVersion
