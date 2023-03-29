const { resolve } = require('path')

const r = (p) => resolve(__dirname, p)

module.exports.alias = {
  '@': r('./src'),
  components: r('./src/components'),
  common: r('./src/common'),
  hooks: r('./src/hooks'),
  interfaces: r('./src/interfaces'),
  lib: r('./src/lib'),
  theme: r('./src/theme')
}
