import babelPlugin from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import ts from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

import { createModule, getBabelOptions } from './scripts/rollup.cfg'

const extensions = ['.js', '.ts', '.tsx']

const plugs = [
  peerDepsExternal(),
  postcss({
    extract: 'dd360.css',
    extensions: ['.css']
  }),
  resolve({ extensions }),
  commonjs(),
  ts({
    tsconfig: './scripts/tsconfig.build.json',
    declaration: true,
    declarationDir: 'dist'
  }),
  svg(),
  terser(),
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
