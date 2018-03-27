const SemVer = require('./')

console.log(SemVer)

describe('SemVer', () => {
  describe('isSemVer', () => {
    it('detects major, minor, patch', () => {
      let major = 1,
        minor = 2,
        patch = 3,
        pre = 'alpha',
        meta = 'tagname'

      expect(SemVer.isSemVer({ major })).toBe(false)
      expect(SemVer.isSemVer({ major, minor })).toBe(false)
      expect(SemVer.isSemVer({ major, minor, patch })).toBe(true)
      expect(SemVer.isSemVer({ major, minor, patch, pre })).toBe(true)
      expect(SemVer.isSemVer({ major, minor, patch, pre, meta })).toBe(true)
    })
  })

  describe('parse', () => {
    let major = 1,
      minor = 2,
      patch = 3,
      pre = 'alpha',
      meta = 'tagname'

    it('ignores SemVer values', () => {
      const v = { major, minor, patch }
      expect(SemVer.parse(v)).toBe(v)
    })

    it('parses 1.2.3', () => {
      expect(SemVer.parse('1.2.3')).toEqual({ major, minor, patch })
    })

    it('parses 1.2.3-alpha', () => {
      expect(SemVer.parse('1.2.3-alpha')).toEqual({
        major,
        minor,
        patch,
        pre,
      })
    })

    it('parses 1.2.3+tagname', () => {
      expect(SemVer.parse('1.2.3+tagname')).toEqual({
        major,
        minor,
        patch,
        meta,
      })
    })

    it('parses 1.2.3-alpha+tagname', () => {
      expect(SemVer.parse('1.2.3-alpha+tagname')).toEqual({
        major,
        minor,
        patch,
        pre,
        meta,
      })
    })
  })

  describe('from', () => {
    it('stores parsed value 1.2.3', () => {
      expect(SemVer.from('1.2.3').get()).toEqual({
        major: 1,
        minor: 2,
        patch: 3,
        pre: undefined,
        meta: undefined,
      })
    })
  })

  describe('toString', () => {
    it('renders as 1.2.3 string', () => {
      expect(SemVer.from('1.2.3').toString()).toEqual('1.2.3')
    })
  })
})
