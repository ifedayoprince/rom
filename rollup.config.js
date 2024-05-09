import sass from 'rollup-plugin-sass'
import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript2'
import {nodeExternals} from 'rollup-plugin-node-externals';


import pkg from './package.json' assert { type: "json" };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'esm',
      exports: 'named',
      sourcemap: false,
      strict: true,
    },
  ],
  plugins: [sass({ insert: true }), typescript(), uglify(), nodeExternals({})],
  external: ['react', 'react-dom'],
}
