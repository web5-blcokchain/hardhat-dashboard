import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('🌍 Vite启动环境信息:');
  console.log('   - 命令:', command);
  console.log('   - 模式:', mode);
  console.log('   - NODE_ENV:', process.env.NODE_ENV);
  
  return {
    plugins: [vue()],
    server: {
      host: '0.0.0.0', // 监听所有网络接口
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
        '/hardhat': {
          target: 'http://localhost:8545',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/hardhat/, '')
        }
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      '__VUE_ENV_MODE__': JSON.stringify(mode)
    }
  }
})
