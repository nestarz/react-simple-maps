import VuePlugin from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs'
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json"

const esm = (minify) => ({
  input: "src/index.js",
  output: [
    {
      file: minify ? `${pkg.module.split('.js')[0]}.min.js` : pkg.module,
      format: "es"
    },
  ],
  plugins: [
    VuePlugin(),
    commonjs(),
    minify ? terser() : null,
    resolve({
      mainFields: ['module'],
    })
  ]
});

export default [esm(true), esm(false)]
