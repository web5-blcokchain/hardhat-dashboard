const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 项目根目录
const ROOT_DIR = __dirname;
const MODULES = ['hardhat-node', 'backend', 'frontend'];

// 检查 PM2 是否已安装
function checkPM2() {
  try {
    execSync('pm2 --version', { stdio: 'ignore' });
    console.log('✅ PM2 已安装');
    return true;
  } catch (error) {
    console.log('❌ PM2 未安装，正在全局安装...');
    try {
      execSync('npm install -g pm2', { stdio: 'inherit' });
      console.log('✅ PM2 安装成功');
      return true;
    } catch (installError) {
      console.error('❌ PM2 安装失败:', installError.message);
      return false;
    }
  }
}

// 安装模块依赖
function installDependencies(modulePath) {
  console.log(`📦 正在为 ${path.basename(modulePath)} 安装依赖...`);
  
  // 检查 package.json 是否存在
  if (!fs.existsSync(path.join(modulePath, 'package.json'))) {
    console.error(`❌ ${path.basename(modulePath)} 中没有找到 package.json`);
    return false;
  }
  
  try {
    // 检查 node_modules 是否存在
    if (!fs.existsSync(path.join(modulePath, 'node_modules'))) {
      console.log(`📦 ${path.basename(modulePath)} 的 node_modules 不存在，开始安装...`);
      execSync('yarn install', { cwd: modulePath, stdio: 'inherit' });
    } else {
      console.log(`✅ ${path.basename(modulePath)} 的依赖已安装`);
    }
    return true;
  } catch (error) {
    console.error(`❌ ${path.basename(modulePath)} 依赖安装失败:`, error.message);
    return false;
  }
}

// 创建 PM2 配置文件
function createPM2Config() {
  const configPath = path.join(ROOT_DIR, 'ecosystem.config.js');
  
  const config = {
    apps: [
      {
        name: 'hardhat-node',
        cwd: path.join(ROOT_DIR, 'hardhat-node'),
        script: 'scripts/node.js',
        watch: false,
        autorestart: true,
        env: {
          NODE_ENV: 'development',
        }
      },
      {
        name: 'backend',
        cwd: path.join(ROOT_DIR, 'backend'),
        script: 'app.js',
        watch: ['routes', 'controllers'],
        ignore_watch: ['node_modules'],
        watch_options: {
          followSymlinks: false
        },
        env: {
          NODE_ENV: 'development',
          PORT: 3000
        }
      },
      {
        name: 'frontend',
        cwd: path.join(ROOT_DIR, 'frontend'),
        script: 'node_modules/.bin/vite',
        args: '--port 5173',
        env: {
          NODE_ENV: 'development'
        }
      }
    ]
  };
  
  fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(config, null, 2)}`);
  console.log('✅ PM2 配置文件已创建');
  return configPath;
}

// 使用 PM2 启动所有服务
function startServices(configPath) {
  console.log('🚀 正在启动所有服务...');
  
  try {
    execSync(`pm2 start ${configPath}`, { stdio: 'inherit' });
    console.log('✅ 所有服务已启动');
    
    // 显示服务状态
    console.log('\n📊 服务状态:');
    execSync('pm2 status', { stdio: 'inherit' });
    
    console.log('\n🔍 使用以下命令查看日志:');
    console.log('  pm2 logs');
    console.log('\n🛑 使用以下命令停止服务:');
    console.log('  pm2 stop all');
    console.log('\n📊 使用以下命令监控服务:');
    console.log('  pm2 monit');
    
    return true;
  } catch (error) {
    console.error('❌ 服务启动失败:', error.message);
    return false;
  }
}

// 更新 package.json 添加 PM2 相关脚本
function updatePackageJson() {
  const packageJsonPath = path.join(ROOT_DIR, 'package.json');
  
  let packageJson = {};
  if (fs.existsSync(packageJsonPath)) {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } else {
    packageJson = {
      name: 'hardhat-node-project',
      version: '1.0.0',
      description: 'Hardhat 节点监控系统',
      private: true
    };
  }
  
  // 添加脚本
  packageJson.scripts = {
    ...packageJson.scripts,
    start: 'node start.js',
    stop: 'pm2 stop all',
    restart: 'pm2 restart all',
    status: 'pm2 status',
    logs: 'pm2 logs',
    monit: 'pm2 monit'
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json 已更新');
}

// 主函数
async function main() {
  console.log('🚀 开始启动 Hardhat 节点监控系统...');
  
  // 检查 PM2
  if (!checkPM2()) {
    console.error('❌ 无法继续，请手动安装 PM2: npm install -g pm2');
    process.exit(1);
  }
  
  // 安装各模块依赖
  let allDepsInstalled = true;
  for (const module of MODULES) {
    const modulePath = path.join(ROOT_DIR, module);
    if (!installDependencies(modulePath)) {
      allDepsInstalled = false;
    }
  }
  
  if (!allDepsInstalled) {
    console.warn('⚠️ 部分依赖安装失败，但将继续尝试启动服务');
  }
  
  // 创建 PM2 配置
  const configPath = createPM2Config();
  
  // 更新 package.json
  updatePackageJson();
  
  // 启动服务
  if (startServices(configPath)) {
    console.log('🎉 Hardhat 节点监控系统已成功启动!');
    console.log('🌐 前端访问地址: http://localhost:5173');
    console.log('🔌 后端 API 地址: http://localhost:3000');
    console.log('⛓️ Hardhat 节点地址: http://localhost:8545');
  } else {
    console.error('❌ 系统启动失败');
    process.exit(1);
  }
}

// 执行主函数
main().catch(error => {
  console.error('❌ 发生错误:', error);
  process.exit(1);
});