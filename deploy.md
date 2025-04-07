# 服务器部署指南

## 环境要求

- Node.js (推荐 v16 LTS 或更高版本)
- Yarn 包管理器
- PM2 (将由启动脚本自动安装)
- Git (用于拉取代码)

## 部署步骤

### 1. 准备服务器环境

```bash
# 安装 Node.js 和 npm (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 Yarn
npm install -g yarn

# 安装 PM2 (可选，启动脚本会自动安装)
npm install -g pm2
```

### 2. 拉取代码

```bash
git clone <仓库地址> /path/to/app
cd /path/to/app
```

### 3. 启动应用

```bash
# 使用 node 启动
node start.js

# 或使用 npm/yarn 命令
yarn start
```

此命令将:
- 检查并安装 PM2 (如果需要)
- 为所有模块安装依赖
- 创建 PM2 配置文件
- 使用 PM2 启动所有服务

### 4. 生产环境配置

如果要在生产环境启动，可以使用:

```bash
# 使用生产环境配置启动
pm2 start ecosystem.config.js --env production
```

### 5. 管理服务

```bash
# 查看服务状态
pm2 status

# 查看日志
pm2 logs

# 监控服务
pm2 monit

# 停止所有服务
pm2 stop all

# 重启所有服务
pm2 restart all
```

## 端口配置

应用使用以下端口:
- Hardhat 节点: 8545
- 后端 API: 3000
- 前端: 5173

确保这些端口在服务器上是可访问的，或者配置防火墙适当开放这些端口。

## 使用 Nginx 反向代理 (推荐)

在生产环境中，建议使用 Nginx 作为反向代理:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 后端 API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 自动启动

配置 PM2 在服务器重启后自动启动服务:

```bash
pm2 startup
pm2 save
```

## 注意事项

1. **数据持久化**: 确保重要数据存储在持久化存储中
2. **日志管理**: 定期检查和清理日志文件
3. **监控**: 设置监控和告警以确保服务正常运行
4. **备份**: 定期备份重要数据
5. **安全**: 确保适当的安全措施，如防火墙配置和定期更新

## 故障排除

如果遇到问题:

1. 检查日志: `pm2 logs`
2. 确保所有依赖已正确安装
3. 验证端口配置和可访问性
4. 检查文件和目录权限