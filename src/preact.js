// Note: aside from ES2015 modules, this must be valid ES5.

import {equalBy, is} from 'emerge'

export function shouldComponentUpdate(props, state) {
  return !equal(this.props, props) || !equal(this.state, state)
}

export function equal(left, right) {
  return isPreactElement(left)
    ? isPreactElement(right) && preactElemEqual(left, right)
    : equalBy(left, right, equal)
}

function isPreactElement(value) {
  return isObject(value) && (isString(value.nodeName) || isFunction(value.nodeName))
}

function preactElemEqual(left, right) {
  return (
    is(left.nodeName, right.nodeName) &&
    is(left.key, right.key) &&
    attrsEqual(left.attributes, right.attributes) &&
    equal(left.children, right.children)
  )
}

function attrsEqual(left, right) {
  var key

  for (key in left) {
    if (!equal(left[key], right[key])) return false
  }

  for (key in right) {
    if (key === 'children') continue
    if (!equal(left[key], right[key])) return false
  }

  return true
}

function isObject(value) {return value !== null && typeof value === 'object'}
function isString(value) {return typeof value === 'string'}
function isFunction(value) {return typeof value === 'function'}
