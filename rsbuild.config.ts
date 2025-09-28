import { defineConfig } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig({
  plugins: [pluginReact(), pluginSass(), pluginLess(), pluginTypeCheck(), pluginSvgr()],

  // HTML template configuration
  html: {
    template: './public/index.html',
    tags: [
      {
        tag: 'script',
        attrs: {
          src: 'https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js',
        },
        append: false,
      },
    ],
  },

  // Development server configuration
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
  },

  // Enable source maps for development
  output: {
    distPath: {
      root: 'build',
    },
  },

  // Performance optimizations
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },

  // Tools configuration for additional webpack/rspack customization
  tools: {
    rspack: {
      resolve: {
        // Ensure proper module resolution
        mainFields: ['browser', 'module', 'main'],
      },
    },
  },
});
