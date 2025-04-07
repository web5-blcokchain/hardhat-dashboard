// API配置
const config = {
  // 开发环境API地址
  development: {
    apiBaseUrl: '/api', // 开发环境也使用相对路径
    hardhatUrl: '/hardhat'
  },
  // 生产环境API地址
  production: {
    apiBaseUrl: '/api', // 使用相对路径，通过Nginx代理
    hardhatUrl: '/hardhat' // 使用相对路径，通过Nginx代理
  }
};

// 根据当前环境获取配置
// 首先检查Vite的模式，然后检查环境变量，最后默认为development
const getEnv = () => {
  if (import.meta.env.MODE === 'production') return 'production';
  if (import.meta.env.PROD) return 'production';
  if (import.meta.env.VITE_APP_MODE === 'production') return 'production';
  return 'development';
};

const env = getEnv();
const currentConfig = config[env] || config.development;

// 在控制台打印环境信息
console.log('🌍 前端当前运行环境:', env);
console.log('📊 环境变量详情:');
console.log('   - import.meta.env.MODE:', import.meta.env.MODE);
console.log('   - import.meta.env.PROD:', import.meta.env.PROD);
console.log('   - import.meta.env.DEV:', import.meta.env.DEV);
console.log('   - import.meta.env.VITE_APP_MODE:', import.meta.env.VITE_APP_MODE);
console.log('🔌 使用API地址:', currentConfig.apiBaseUrl);
console.log('⛓️ 使用Hardhat地址:', currentConfig.hardhatUrl);

export default {
  apiBaseUrl: currentConfig.apiBaseUrl,
  hardhatUrl: currentConfig.hardhatUrl
};