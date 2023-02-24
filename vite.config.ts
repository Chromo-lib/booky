import { defineConfig, UserConfigExport } from 'vite'
import { makeManifest } from './plugins/makeManifest';
import { replaceWord } from './plugins/replaceWord';
import { copyStatic } from './plugins/copyStatic';
import { parse, resolve } from 'path';

console.log('process ===> ', process.env.BROWSER, process.env.NODE_ENV);
const isChrome = process.env.BROWSER === undefined ? true : process.env.BROWSER === 'chrome';
const from = isChrome ? 'browser' : 'chrome'; // this var for replaceWord plugin
const to = isChrome ? 'chrome' : 'browser'; // this var for replaceWord plugin

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src', 'index.html')
      },
      output: {
        dir: "dist",
        chunkFileNames: "[name].[hash].js",
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo:any) => {
          const { name } = parse(assetInfo.name);
          return `${name}.[ext]`;
        },
      },
    }
  },
  plugins: [
    {
      ...replaceWord({ from, to }),
      enforce: 'pre'
    },
    copyStatic('public'),
    makeManifest()
  ]
} as UserConfigExport);