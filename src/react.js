// Note: aside from ES2015 modules, this must be valid ES5.

import {equalBy, is} from 'emerge'

export function shouldComponentUpdate(props, state) {
  return !equal(this.props, props) || !equal(this.state, state)
}

export function equal(left, right) {
  return isReactElement(left)
    ? isReactElement(right) && reactElemEqual(left, right)
    : equalBy(left, right, equal)
}

function isReactElement(value) {
  return isDict(value) &&
    (isString(value.type) || isFunction(value.type)) &&
    isDict(value.props)
}

function reactElemEqual(left, right) {
  return (
    is(left.type, right.type) &&
    is(left.key, right.key) &&
    propsEqual(left.props, right.props)
  )
}

function propsEqual(left, right) {
  var key

  for (key in left) {
    if (key === 'children') continue
    if (!equal(left[key], right[key])) return false
  }

  for (key in right) {
    if (key === 'children') continue
    if (!equal(left[key], right[key])) return false
  }

  return equal(left.children, right.children)
}

function isObject(value) {return value !== null && typeof value === 'object'}

function isString(value) {return typeof value === 'string'}

function isFunction(value) {return typeof value === 'function'}

function isDict(value) {
  if (!isObject(value)) return false
  var proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}
