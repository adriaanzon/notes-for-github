import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import vue from 'rollup-plugin-vue'
import { minify } from 'uglify-js-harmony'

module.exports = {
  entry: 'src/main.js',
  dest: 'dist/build.js',
  format: 'iife',
  plugins: [
    resolve(),
    vue(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = module.exports.plugins.concat([
    uglify({}, minify)
  ])
}
