import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import { getFiles } from './.build/rollup'

const buildConfiguration = {
    input: ['./src/index.ts', ...getFiles('./src/components'), ...getFiles('./src/hooks'), ...getFiles('./src/common')],
    output: {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './.build/tsconfig.build.json'
        }),
        postcss({
            extensions: ['.css']
        }),
        svg(),
        terser(),
        visualizer({
            filename: 'bundle-analysis.html',
            open: true
        })
    ],
    external: ['react', 'react-dom']
}

const mapTypes = {
    input: './dist/index.d.ts',
    output: [{ file: 'dist/dd3.d.ts', format: 'es' }],
    external: [/\.css$/], // ignore .scss file
    plugins: [dts()]
}

export default [buildConfiguration, mapTypes]
