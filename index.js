const SemVer = (() => {
  let version = {
    major: 0,
    minor: 0,
    patch: 0,
    pre: undefined,
    meta: undefined,
  }

  const isSemVer = v =>
    v &&
    v.hasOwnProperty('major') &&
    typeof v.major === 'number' &&
    v.hasOwnProperty('minor') &&
    typeof v.minor === 'number' &&
    v.hasOwnProperty('patch') &&
    typeof v.patch === 'number'

  const parse = v => {
    if (isSemVer(v)) return v

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

  const toString = () => {
    let string = [version.major, version.minor, version.patch].join('.')
    if (version.pre) string += `-${version.pre}`
    if (version.meta) string += `+${version.meta}`
    return string
  }

  return {
    isSemVer,
    parse,
    from,
    get,
    toString,
  }
})()

module.exports = SemVer
