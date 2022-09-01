import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import { getFiles } from './.build/rollup'

export default {
    input: ['./src/index.ts', ...getFiles('./src/components'), ...getFiles('./src/hooks')],
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
