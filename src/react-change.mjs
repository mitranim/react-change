/*
Note: the transpiler is configured only for ES2015 modules. Other code must be
valid ES5.
*/

import {equalBy, is} from 'emerge'

export function shouldComponentUpdate(props, state) {
  return !equal(this.props, props) || !equal(this.state, state)
}

export function equal(left, right) {
  return isVirtualElement(left)
    ? isVirtualElement(right) && virtualElementsEqual(left, right)
    : equalBy(left, right, equal)
}

function isVirtualElement(value) {
  return isReactElement(value) || isPreactElement(value)
}

function isReactElement(value) {
  return isObject(value) &&
    (isString(value.type) || isFunction(value.type)) &&
    isDict(value.props)
}

function isPreactElement(value) {
  return isObject(value) && (isString(value.nodeName) || isFunction(value.nodeName))
}

function virtualElementsEqual(left, right) {
  return isReactElement(left) ? reactElementsEqual(left, right) : preactElementsEqual(left, right)
}

function reactElementsEqual(left, right) {
  return (
    is(left.type, right.type) &&
    is(left.key, right.key) &&
    propsEqual(left.props, right.props)
  )
}

function preactElementsEqual(left, right) {
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
