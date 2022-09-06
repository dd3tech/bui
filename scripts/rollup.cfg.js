const fs = require('fs')
import { babelConfig } from './babel.cfg'

/**
 * It takes a directory, and returns an array of all the files in that directory and its subdirectories
 * that match the given extensions
 * @param entry - The directory to start searching from
 * @param [extensions] - An array of file extensions to include.
 * @param [excludeExtensions] - An array of file extensions to exclude from the search.
 * @returns An array of file names
 */
export const getFiles = (
    entry,
    extensions = ['.js', '.ts', '.tsx'],
    excludeExtensions = ['.stories.tsx', '.stories', '.stories.tsx', '.test.tsx', '.test.ts', '.spec.tsx']
) => {
    let fileNames = []
    const dirs = fs.readdirSync(entry)

    dirs.forEach((dir) => {
        const path = `${entry}/${dir}`
        if (fs.lstatSync(path).isDirectory()) {
            fileNames = [...fileNames, ...getFiles(path, extensions, excludeExtensions)]
            return
        }

        if (!excludeExtensions.some((exclude) => dir.endsWith(exclude)) && extensions.some((ext) => dir.endsWith(ext))) {
            fileNames.push(path)
        }
    })

    return fileNames
}

/**
 * It returns a babel configuration object that is used to transpile the source code
 * @param targets - The target browsers to support.
 */
export function getBabelOptions(targets) {
    const extensions = ['.js', '.ts', '.tsx']
    return {
        ...babelConfig({ env: (env) => env === 'build' }, targets),
        extensions,
        comments: false,
        babelHelpers: 'bundled'
    }
}

/**
 * It creates a rollup config object that takes in a list of plugins and a format, and returns a config
 * object that will output a module in the specified format
 * @returns A function that takes an object with the following properties:
 *     plugins: an array of plugins
 *     format: a string that can be either 'esm' or 'cjs'
 *     otherProps: any other properties that can be passed to the rollup config
 */
export function createModule({ plugins, format = 'esm', ...otherProps }) {
    const config = {
        input: ['./src/index.ts', ...getFiles('./src/hooks'), ...getFiles('./src/common')],
        output: {
            dir: `dist/${format}`,
            format: `${format}`,
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true
        },
        plugins: plugins,
        external: ['react', 'react-dom'],
        ...otherProps
    }

    if (format === 'cjs') {
        config.output = { ...config.output, dir: 'dist', exports: 'named' }
    }

    return config
}
