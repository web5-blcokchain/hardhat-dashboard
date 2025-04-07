// API配置
const config = {
  // 开发环境API地址
  development: {
    apiBaseUrl: 'http://localhost:3000',
    hardhatUrl: 'http://localhost:8545'
  },
  // 生产环境API地址
  production: {
    apiBaseUrl: '/api', // 使用相对路径，通过Nginx代理
    hardhatUrl: '/hardhat' // 使用相对路径，通过Nginx代理
  }
};

// 根据当前环境获取配置
const env = import.meta.env.MODE || 'development';
const currentConfig = config[env] || config.development;

export default {
  apiBaseUrl: currentConfig.apiBaseUrl,
  hardhatUrl: currentConfig.hardhatUrl
};