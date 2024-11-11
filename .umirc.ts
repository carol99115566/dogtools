import { defineConfig } from 'umi'

const isDev = process.env.NODE_ENV === 'development'
const devConfig = isDev
  ? {
      // 代理到本地，要这样启动 SOCKET_SERVER=http://127.0.0.1:8000 pnpm dev
      publicPath: `http://localhost:8000/`,
    }
  : {}

export default defineConfig({
  esbuildMinifyIIFE: true,
  // 🟢 换压缩器
  // jsMinifier: 'terser'
  // 🟢 提高压缩产物版本
  jsMinifierOptions: {
    target: ['chrome80', 'es2020'],
  },
  ...devConfig,
  routes: [
    {
      path: '/',
      routes: [
        { path: '/', redirect: '/sol/pump/create' },
        {
          path: 'sol/pump',
          component: 'main',
          routes: [
            { path: '/sol/pump/create', component: '@/pages/pump/pumpForm' },
            { path: '/sol/pump/selling', component: '@/pages/pump/bulkSelling' },
          ],
        },
        {
          path: '/sol/wallet-manage',
          component: 'main',
          routes: [
            { path: '/sol/wallet-manage/address', component: '@/pages/walletManage/address' },
            { path: '/sol/wallet-manage/privatekey', component: '@/pages/walletManage/privateKey' },
          ],
        },
      ],
    },
  ],
  favicons: ['https://www.devtools.meme/aa866063becb735ddc55a09d5b6f28af.svg'],
  npmClient: 'npm',
})
