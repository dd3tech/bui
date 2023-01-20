'use strict'

const fs = require('fs')
const packageJson = require('../package.json')
const exportsJson = require('../exports.json')

const packageJsonName = './package.json'
const mergedPackage = Object.assign({}, packageJson, exportsJson)

if (JSON.stringify(packageJson) === JSON.stringify(mergedPackage)) {
    console.warn('The packages are equal')
    return
}

try {
    fs.writeFileSync(packageJsonName, JSON.stringify(mergedPackage, null, 4))
    console.log('The files were succesfully merged')
} catch (err) {
    console.error('Oops, there was an error,', err)
}
