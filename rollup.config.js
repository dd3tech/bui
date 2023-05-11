/* eslint-disable camelcase */
import babelPlugin from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import ts from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

import { createModule, getBabelOptions } from './scripts/rollup.cfg'

const plugs = [
  peerDepsExternal(),
  postcss({
    extract: 'dd360.css',
    plugins: [require('cssnano')],
    extensions: ['.css']
  }),
  nodeResolve({
    extensions: ['.js', '.ts', '.tsx']
  }),
  commonjs(),
  ts({
    tsconfig: './scripts/tsconfig.build.json',
    declaration: true,
    declarationDir: 'dist'
  }),
  svg(),
  terser({
    compress: {
      drop_console: true,
      passes: 2,
      unsafe: true,
      unsafe_arrows: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_methods: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_symbols: true,
      unsafe_undefined: true,
      warnings: false
    },
    format: {
      comments: false
    },
    mangle: true
  }),
  visualizer({
    filename: 'bundle-analysis.html'
  })
]

const esmModule = createModule({ plugins: plugs, format: 'esm' })

const cjsModule = createModule({
  plugins: [...plugs, babelPlugin(getBabelOptions({ ie: 11 }))],
  format: 'cjs'
})

export default [
  esmModule,
  cjsModule,
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
]
