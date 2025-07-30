const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    // Path aliases
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.json',
      },
    },
  ],
  jest: {
    configure: {
      collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.tsx',
        '!src/reportWebVitals.js',
        '!src/setupTests.js',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!src/**/*.stories.js',
        '!src/**/*.stories.jsx',
        '!src/**/*.stories.ts',
        '!src/**/*.stories.tsx',
        '!src/**/__tests__/**',
        '!src/**/node_modules/**',
      ],
    },
  },
};
