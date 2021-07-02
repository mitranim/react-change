import * as p from 'preact'
import * as c from 'preact/compat'
import {equal} from './react-change.mjs'

test(p.createElement)
test(c.createElement)

function test(E) {
  if (!equal(
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [NaN])),
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [NaN])),
  )) {
    throw Error(`unexpected inequality`)
  }

  if (equal(
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [NaN])),
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [Infinity])),
  )) {
    throw Error(`unexpected equality`)
  }

  if (equal(
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [NaN])),
    E('div', {one: {two: ['four']}, equal},  E(Comp, {}, [NaN])),
  )) {
    throw Error(`unexpected equality`)
  }

  if (equal(
    E('div', {one: {two: [() => {}]}, equal}, E(Comp, {}, [NaN])),
    E('div', {one: {two: [() => {}]}, equal}, E(Comp, {}, [NaN])),
  )) {
    throw Error(`unexpected equality`)
  }
}

function Comp() {}

console.log(`[test] ok`)
