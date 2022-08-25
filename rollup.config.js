import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import svg from 'rollup-plugin-svg'

import { terser } from 'rollup-plugin-terser'

const packageJson = require('./package.json')

export default [
    {
        input: './src/index.ts',
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
            typescript({ useTsconfigDeclarationDir: true, tsconfig: './tsconfig.json' }),
            postcss({
                extensions: ['.css']
            }),
            svg(),
            terser()
        ]
    },
    {
        input: './dist/dts/index.d.ts',
        output: [{ file: 'lib/dd3.d.ts', format: 'es' }],
        external: [/\.css$/], // ignore .scss file
        plugins: [dts()]
    }
]
