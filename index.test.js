const SemVersion = require('./')

describe('SemVersion', () => {
  describe('isSemVersion(version)', () => {
    it('detects major, minor, patch', () => {
      let major = 1,
        minor = 2,
        patch = 3,
        pre = 'alpha',
        meta = 'tagname'

      expect(SemVersion.isSemVersion({ major })).toBe(false)
      expect(SemVersion.isSemVersion({ major, minor })).toBe(false)
      expect(SemVersion.isSemVersion({ major, minor, patch })).toBe(true)
      expect(SemVersion.isSemVersion({ major, minor, patch, pre })).toBe(true)
      expect(SemVersion.isSemVersion({ major, minor, patch, pre, meta })).toBe(true)
    })
  })

  describe('parse(version)', () => {
    let major = 1,
      minor = 2,
      patch = 3,
      pre = 'alpha',
      meta = 'tagname'

    it('ignores SemVersion values', () => {
      const v = { major, minor, patch }
      expect(SemVersion.parse(v)).toBe(v)
    })

    it('parses 1.2.3', () => {
      expect(SemVersion.parse('1.2.3')).toEqual({ major, minor, patch })
    })

    it('parses 1.2.3-alpha', () => {
      expect(SemVersion.parse('1.2.3-alpha')).toEqual({
        major,
        minor,
        patch,
        pre,
      })
    })

    it('parses 1.2.3+tagname', () => {
      expect(SemVersion.parse('1.2.3+tagname')).toEqual({
        major,
        minor,
        patch,
        meta,
      })
    })

    it('parses 1.2.3-alpha+tagname', () => {
      expect(SemVersion.parse('1.2.3-alpha+tagname')).toEqual({
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
      expect(SemVersion.from('1.2.3').get()).toEqual({
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
      expect(SemVersion.from('1.2.3').toString()).toEqual('1.2.3')
    })
  })

  describe('cmp(a, b)', () => {
    describe('major versions', () => {
      it('1 = 1', () => expect(SemVersion.cmp('1', '1')).toEqual(0))
      it('1 < 2', () => expect(SemVersion.cmp('1', '2')).toEqual(-1))
      it('2 > 1', () => expect(SemVersion.cmp('2', '1')).toEqual(1))
    })
    describe('minor versions', () => {
      it('1.1 = 1.1', () => expect(SemVersion.cmp('1.1', '1.1')).toEqual(0))
      it('1.1 < 1.2', () => expect(SemVersion.cmp('1.1', '1.2')).toEqual(-1))
      it('1.2 > 1.1', () => expect(SemVersion.cmp('1.2', '1.1')).toEqual(1))
    })
    describe('patch versions', () => {
      it('1.1.1 = 1.1.1', () => expect(SemVersion.cmp('1.1.1', '1.1.1')).toEqual(0))
      it('1.1.1 < 1.1.2', () =>
        expect(SemVersion.cmp('1.1.1', '1.1.2')).toEqual(-1))
      it('1.1.2 > 1.1.1', () => expect(SemVersion.cmp('1.1.2', '1.1.1')).toEqual(1))
    })
    describe('pre versions', () => {
      it('1.1.1-alpha = 1.1.1-alpha', () =>
        expect(SemVersion.cmp('1.1.1-alpha', '1.1.1-alpha')).toEqual(0))
      it('1.1.1 < 1.1.1-alpha', () =>
        expect(SemVersion.cmp('1.1.1', '1.1.1-alpha')).toEqual(-1))
      it('1.1.1-alpha > 1.1.1', () =>
        expect(SemVersion.cmp('1.1.1-alpha', '1.1.1')).toEqual(1))
      it('1.1.1-alpha < 1.1.1-beta', () =>
        expect(SemVersion.cmp('1.1.1-alpha', '1.1.1-beta')).toEqual(-1))
      it('1.1.1-beta > 1.1.1-alpha', () =>
        expect(SemVersion.cmp('1.1.1-beta', '1.1.1-alpha')).toEqual(1))
    })
    describe('eq', () => {
      it('1.2.3 eq 1.2.3', () =>
        expect(SemVersion.from('1.2.3').eq('1.2.3')).toEqual(true))
      it('1.2.3 eq 1.0.0', () =>
        expect(SemVersion.from('1.2.3').eq('1.0.0')).toEqual(false))
      it('1.2.3 eq 2.0.0', () =>
        expect(SemVersion.from('1.2.3').eq('2.0.0')).toEqual(false))
    })
    describe('gt', () => {
      it('1.2.3 gt 1.2.3', () =>
        expect(SemVersion.from('1.2.3').gt('1.2.3')).toEqual(false))
      it('1.2.3 gt 1.0.0', () =>
        expect(SemVersion.from('1.2.3').gt('1.0.0')).toEqual(true))
      it('1.2.3 gt 2.0.0', () =>
        expect(SemVersion.from('1.2.3').gt('2.0.0')).toEqual(false))
    })
    describe('ge', () => {
      it('1.2.3 ge 1.2.3', () =>
        expect(SemVersion.from('1.2.3').ge('1.2.3')).toEqual(true))
      it('1.2.3 ge 1.0.0', () =>
        expect(SemVersion.from('1.2.3').ge('1.0.0')).toEqual(true))
      it('1.2.3 ge 2.0.0', () =>
        expect(SemVersion.from('1.2.3').ge('2.0.0')).toEqual(false))
    })
    describe('lt', () => {
      it('1.2.3 lt 1.2.3', () =>
        expect(SemVersion.from('1.2.3').lt('1.2.3')).toEqual(false))
      it('1.2.3 lt 1.0.0', () =>
        expect(SemVersion.from('1.2.3').lt('1.0.0')).toEqual(false))
      it('1.2.3 lt 2.0.0', () =>
        expect(SemVersion.from('1.2.3').lt('2.0.0')).toEqual(true))
    })
    describe('le', () => {
      it('1.2.3 le 1.2.3', () =>
        expect(SemVersion.from('1.2.3').le('1.2.3')).toEqual(true))
      it('1.2.3 le 1.0.0', () =>
        expect(SemVersion.from('1.2.3').le('1.0.0')).toEqual(false))
      it('1.2.3 le 2.0.0', () =>
        expect(SemVersion.from('1.2.3').le('2.0.0')).toEqual(true))
    })
  })
})
