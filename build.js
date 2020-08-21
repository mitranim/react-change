'use strict'

const babel = require('@babel/core')
const del = require('del')
const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const pt = require('path')

const SRC  = 'src'
const DEST = 'dist'

function main() {
  const cmd = process.argv[2]
  if (!cmd) {
    build()
  }
  else if (cmd === 'watch') {
    watch()
    buildOrReport()
  }
  else {
    throw Error(`Unrecognized command: ${cmd}`)
  }
}

function clear() {
  del.sync(DEST)
}

function build() {
  clear()
  const t0 = Date.now()

  const paths = glob.sync(`${SRC}/**/*.mjs`)

  for (const path of paths) {
    const {code} = babel.transformFileSync(path, {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs', {strict: true, noInterop: true}],
      ],
    })

    const destPath = pt.join(DEST, pt.relative(SRC, renameExtension(path, '.js')))
    const destDir = pt.dirname(destPath)
    if (destDir) mkdirp.sync(destDir)
    fs.writeFileSync(destPath, code)
  }

  const t1 = Date.now()
  console.info(`Built in ${t1 - t0}ms`)
}

function watch() {
  fs.watch(SRC, buildOrReport)
}

function buildOrReport() {
  try {
    build()
  }
  catch (err) {
    console.error(err)
  }
}

function renameExtension(path, ext) {
  const parsed = pt.parse(path)
  parsed.ext = ext
  parsed.base = undefined
  return pt.format(parsed)
}

main()
