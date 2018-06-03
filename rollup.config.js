const tsc = require('rollup-plugin-typescript');

module.exports = {
    input: 'src/index.ts',
    output: {
        format: 'umd',
        file: 'dist/server.js',
    },
    plugins: [
        tsc(),
    ],
    watch: {
        include: './src/*',
    },
};
