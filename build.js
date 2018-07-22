'use strict'

const babel = require('@babel/core')
const del = require('del')
const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const pt = require('path')

const SRC  = 'src'
const DIST = 'dist'

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
  del.sync(DIST)
}

function build() {
  clear()
  const t0 = Date.now()

  const paths = glob.sync(`${SRC}/**/*.js`)

  for (const path of paths) {
    const {code} = babel.transformFileSync(path, {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs', {strict: true, noInterop: true}],
      ],
    })

    const distPath = pt.join(DIST, pt.relative(SRC, path))
    const distDir = pt.dirname(distPath)
    if (distDir) mkdirp.sync(distDir)
    fs.writeFileSync(distPath, code)
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

main()
