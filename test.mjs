import {assert as ok} from 'assert'
import * as p from 'preact'
import * as c from 'preact/compat'
import {equal} from './react-change.mjs'

const now = new Date()

test(p.createElement)
test(c.createElement)

function test(E) {
  ok(equal(
    E(
      'div',
      {one: {two: ['three', new URL(`https://example.com`), new Date(now)]}, equal},
      E(Comp, {}, [NaN]),
    ),
    E(
      'div',
      {one: {two: ['three', new URL(`https://example.com`), new Date(now)]}, equal},
      E(Comp, {}, [NaN]),
    ),
  ))

  ok(!equal(
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [NaN])),
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [Infinity])),
  ))

  ok(!equal(
    E('div', {one: {two: ['three']}, equal}, E(Comp, {}, [NaN])),
    E('div', {one: {two: ['four']}, equal},  E(Comp, {}, [NaN])),
  ))

  ok(!equal(
    E('div', {one: {two: [() => {}]}, equal}, E(Comp, {}, [NaN])),
    E('div', {one: {two: [() => {}]}, equal}, E(Comp, {}, [NaN])),
  ))

  ok(equal(new URL(`https://example.com`), new URL(`https://example.com`)))
  ok(!equal(new URL(`https://example.com#one`), new URL(`https://example.com#two`)))

  ok(equal(new Date(now), new Date(now)))
  ok(!equal(new Date(now), new Date(now + 1)))
}

function Comp() {}

console.log(`[test] ok`)
