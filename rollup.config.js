import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import svg from 'rollup-plugin-svg'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
// const packageJson = require('./package.json')

// Code Splitting getFiles
import { getFiles } from './.build/rollup'

export default [
    {
        input: ['./src/index.ts', ...getFiles('./src/components')],
        // output: {
        //     dir: 'lib',
        //     format: 'esm',
        //     preserveModules: true,
        //     preserveModulesRoot: 'src/components',
        //     sourcemap: true
        // },
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                clean: true,
                abortOnError: true,
                useTsconfigDeclarationDir: true,
                tsconfig: './.build/tsconfig.build.json'
            }),
            postcss({
                extensions: ['.css']
            }),
            svg(),
            terser({
                compress: {
                    keep_infinity: true,
                    pure_getters: true,
                    passes: 10
                }
            }),
            visualizer({
                filename: 'bundle-analysis.html',
                open: true
            })
        ],
        external: ['react', 'react-dom']
    },
    {
        input: './dist/dts/index.d.ts',
        output: [{ file: 'lib/dd3.d.ts', format: 'es' }],
        external: [/\.css$/], // ignore .scss file
        plugins: [dts()]
    }
]
