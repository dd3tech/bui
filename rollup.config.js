import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import babelPlugin from '@rollup/plugin-babel'
import { createModule, getBabelOptions } from './scripts/rollup.cfg'

const extensions = ['.js', '.ts', '.tsx']

const plugs = [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs(),
    ts({
        tsconfig: './scripts/tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist'
    }),
    postcss({
        extensions: ['.css']
    }),
    svg(),
    terser(),
    visualizer({
        filename: 'bundle-analysis.html'
    })
]

const esmModule = createModule({ plugins: plugs, format: 'esm' })

const cjsModule = createModule({ plugins: [...plugs, babelPlugin(getBabelOptions({ ie: 11 }))], format: 'cjs' })

export default [esmModule, cjsModule]
