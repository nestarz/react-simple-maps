import VuePlugin from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs'
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json"

export default [{
  input: "src/index.js",
  output: [{
    file: pkg.main,
    format: "cjs"
  },
  {
    file: pkg.module,
    format: "es"
  },
  ],
  plugins: [
    VuePlugin(),
    commonjs(),
    resolve({
      mainFields: ['module', 'browser'],
    })
  ],
}]
