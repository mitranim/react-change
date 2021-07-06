export function shouldComponentUpdate(props, state) {
  return !equal(this.props, props) || !equal(this.state, state)
}

export function equal(a, b) {
  if (is(a, b)) return true
  if (isVirtElem(a)) return isVirtElem(b) && virtElemEqual(a, b)
  if (isInst(a, Date)) return isInst(b, Date) && a.valueOf() === b.valueOf()
  if (isInst(a, URL)) return isInst(b, URL) && a.href === b.href
  if (isArr(a)) return isArr(b) && arrEqual(a, b)
  if (isDict(a)) return isDict(b) && dictEqual(a, b)
  return false
}

export function isVirtElem(val) {
  return isObj(val) && val.$$typeof === Symbol.for('react.element')
}

function virtElemEqual(a, b) {
  return (
    is(a.type, b.type) &&
    is(a.key, b.key) &&
    dictEqual(a.props, b.props)
  )
}

function arrEqual(a, b) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (!equal(a[i], b[i])) return false
  }
  return true
}

function dictEqual(a, b) {
  for (const key in a) {
    if (key === 'children') continue
    if (!equal(a[key], b[key])) return false
  }

  for (const key in b) {
    if (key === 'children') continue
    if (!equal(a[key], b[key])) return false
  }

  return equal(a.children, b.children)
}

function is(a, b) {return a === b || (isNaN(a) && isNaN(b))}

function isNaN(val) {return val !== val}
function isObj(val) {return val !== null && typeof val === 'object'}
function isArr(val) {return isObj(val) && val instanceof Array}
function isInst(val, Cls) {return isObj(val) && val instanceof Cls}

function isDict(val) {
  if (!isObj(val)) return false
  const proto = Object.getPrototypeOf(val)
  return proto === null || proto === Object.prototype
}
