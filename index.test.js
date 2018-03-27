const SemVer = require('./')

describe('SemVer', () => {
  describe('isSemVer(version)', () => {
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

  describe('parse(version)', () => {
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

  describe('from(version)', () => {
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

  describe('toString()', () => {
    it('renders as 1.2.3 string', () => {
      expect(SemVer.from('1.2.3').toString()).toEqual('1.2.3')
    })
  })

  describe('cmp(a, b)', () => {
    describe('major versions', () => {
      it('1 = 1', () => expect(SemVer.cmp('1', '1')).toEqual(0))
      it('1 < 2', () => expect(SemVer.cmp('1', '2')).toEqual(-1))
      it('2 > 1', () => expect(SemVer.cmp('2', '1')).toEqual(1))
    })
    describe('minor versions', () => {
      it('1.1 = 1.1', () => expect(SemVer.cmp('1.1', '1.1')).toEqual(0))
      it('1.1 < 1.2', () => expect(SemVer.cmp('1.1', '1.2')).toEqual(-1))
      it('1.2 > 1.1', () => expect(SemVer.cmp('1.2', '1.1')).toEqual(1))
    })
    describe('patch versions', () => {
      it('1.1.1 = 1.1.1', () => expect(SemVer.cmp('1.1.1', '1.1.1')).toEqual(0))
      it('1.1.1 < 1.1.2', () =>
        expect(SemVer.cmp('1.1.1', '1.1.2')).toEqual(-1))
      it('1.1.2 > 1.1.1', () => expect(SemVer.cmp('1.1.2', '1.1.1')).toEqual(1))
    })
    describe('pre versions', () => {
      it('1.1.1-alpha = 1.1.1-alpha', () =>
        expect(SemVer.cmp('1.1.1-alpha', '1.1.1-alpha')).toEqual(0))
      it('1.1.1 < 1.1.1-alpha', () =>
        expect(SemVer.cmp('1.1.1', '1.1.1-alpha')).toEqual(-1))
      it('1.1.1-alpha > 1.1.1', () =>
        expect(SemVer.cmp('1.1.1-alpha', '1.1.1')).toEqual(1))
      it('1.1.1-alpha < 1.1.1-beta', () =>
        expect(SemVer.cmp('1.1.1-alpha', '1.1.1-beta')).toEqual(-1))
      it('1.1.1-beta > 1.1.1-alpha', () =>
        expect(SemVer.cmp('1.1.1-beta', '1.1.1-alpha')).toEqual(1))
    })
    describe('eq', () => {
      it('1.2.3 eq 1.2.3', () =>
        expect(SemVer.from('1.2.3').eq('1.2.3')).toEqual(true))
      it('1.2.3 eq 1.0.0', () =>
        expect(SemVer.from('1.2.3').eq('1.0.0')).toEqual(false))
      it('1.2.3 eq 2.0.0', () =>
        expect(SemVer.from('1.2.3').eq('2.0.0')).toEqual(false))
    })
    describe('gt', () => {
      it('1.2.3 gt 1.2.3', () =>
        expect(SemVer.from('1.2.3').gt('1.2.3')).toEqual(false))
      it('1.2.3 gt 1.0.0', () =>
        expect(SemVer.from('1.2.3').gt('1.0.0')).toEqual(true))
      it('1.2.3 gt 2.0.0', () =>
        expect(SemVer.from('1.2.3').gt('2.0.0')).toEqual(false))
    })
    describe('ge', () => {
      it('1.2.3 ge 1.2.3', () =>
        expect(SemVer.from('1.2.3').ge('1.2.3')).toEqual(true))
      it('1.2.3 ge 1.0.0', () =>
        expect(SemVer.from('1.2.3').ge('1.0.0')).toEqual(true))
      it('1.2.3 ge 2.0.0', () =>
        expect(SemVer.from('1.2.3').ge('2.0.0')).toEqual(false))
    })
    describe('lt', () => {
      it('1.2.3 lt 1.2.3', () =>
        expect(SemVer.from('1.2.3').lt('1.2.3')).toEqual(false))
      it('1.2.3 lt 1.0.0', () =>
        expect(SemVer.from('1.2.3').lt('1.0.0')).toEqual(false))
      it('1.2.3 lt 2.0.0', () =>
        expect(SemVer.from('1.2.3').lt('2.0.0')).toEqual(true))
    })
    describe('le', () => {
      it('1.2.3 le 1.2.3', () =>
        expect(SemVer.from('1.2.3').le('1.2.3')).toEqual(true))
      it('1.2.3 le 1.0.0', () =>
        expect(SemVer.from('1.2.3').le('1.0.0')).toEqual(false))
      it('1.2.3 le 2.0.0', () =>
        expect(SemVer.from('1.2.3').le('2.0.0')).toEqual(true))
    })
  })
})
