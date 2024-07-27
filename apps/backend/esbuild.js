// esbuild.js
const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  sourcemap: true,
  tsconfig: 'tsconfig.json'
}).catch(() => process.exit(1));
