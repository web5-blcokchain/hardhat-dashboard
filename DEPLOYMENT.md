# 服务器部署指南

## 环境要求

- Node.js (推荐 v16 LTS 或更高版本)
- Yarn 包管理器
- PM2 (将由启动脚本自动安装)
- Git (用于拉取代码)

## 完整部署流程

以下是从代码仓库到完整部署的全流程：

1. **准备服务器**
   ```bash
   # 安装必要软件
   sudo apt update
   sudo apt install -y nodejs npm nginx git
   npm install -g yarn pm2
   ```

2. **克隆代码**
   ```bash
   git clone <仓库地址> /path/to/app
   cd /path/to/app
   ```

3. **构建前端**
   ```bash
   cd frontend
   yarn install
   # 构建生产版本
   yarn build
   cd ..
   ```

4. **配置Nginx**
   ```bash
   # 复制Nginx配置
   sudo cp nginx.conf /etc/nginx/sites-available/hardhat-node
   sudo ln -s /etc/nginx/sites-available/hardhat-node /etc/nginx/sites-enabled/
   sudo rm /etc/nginx/sites-enabled/default
   
   # 编辑配置文件，替换域名
   sudo nano /etc/nginx/sites-available/hardhat-node
   
   # 检查并重启Nginx
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **配置静态文件服务**
   ```bash
   # 将前端构建文件移动到Nginx目录
   sudo mkdir -p /var/www/hardhat-node
   sudo cp -r frontend/dist/* /var/www/hardhat-node/
   
   # 更新Nginx配置指向静态文件
   sudo nano /etc/nginx/sites-available/hardhat-node
   ```
   
   修改Nginx配置中的前端部分：
   ```nginx
   # 前端应用 - 静态文件
   location / {
       root /var/www/hardhat-node;
       index index.html;
       try_files $uri $uri/ /index.html;
   }
   ```

6. **启动服务**
   ```bash
   # 启动服务（生产模式）
   pm2 start ecosystem.config.js --env production
   
   # 设置PM2开机自启
   pm2 startup
   pm2 save
   ```

7. **查看日志和监控**
   ```bash
   # 查看所有服务状态
   pm2 status
   
   # 查看日志
   pm2 logs
   
   # 监控资源使用
   pm2 monit
   ```

8. **安全配置**
   ```bash
   # 配置防火墙
   sudo ufw allow ssh
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   
   # 安装SSL证书
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 端口配置

应用使用以下端口:
- Hardhat 节点: 8545 (通过 Nginx 代理路径 /hardhat/)
- 后端 API: 3000 (通过 Nginx 代理路径 /api/)
- 前端: 5173 (通过 Nginx 代理根路径 /)

所有服务都只监听本地接口 (127.0.0.1)，通过 Nginx 反向代理对外提供安全访问。

## 使用 Nginx 反向代理 (推荐)

为了安全起见，我们的应用服务只监听本地接口 (127.0.0.1)，通过 Nginx 反向代理对外提供服务。

### 安装 Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install epel-release
sudo yum install nginx
```

### 配置 Nginx

将项目中的 `nginx.conf` 文件复制到 Nginx 配置目录，修改其中的 `server_name` 为您的域名：

```bash
# Ubuntu/Debian
sudo cp nginx.conf /etc/nginx/sites-available/hardhat-node
sudo ln -s /etc/nginx/sites-available/hardhat-node /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # 可选：删除默认站点

# CentOS/RHEL
sudo cp nginx.conf /etc/nginx/conf.d/hardhat-node.conf
```

### 检查并重启 Nginx

```bash
# 检查配置语法
sudo nginx -t

# 如果检查通过，重启 Nginx
sudo systemctl restart nginx
```

### SSL 配置 (强烈推荐)

使用 Let's Encrypt 获取免费 SSL 证书：

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取并安装证书
sudo certbot --nginx -d your-domain.com
```

## Hardhat节点访问

Hardhat节点通过 Nginx 代理路径 `/hardhat/` 提供服务。例如:

```
# HTTP
http://your-domain.com/hardhat/

# HTTPS (如果配置了SSL)
https://your-domain.com/hardhat/
```

为了提高安全性，Hardhat节点的访问有以下限制:
1. 只允许 GET 和 POST 请求方法
2. 可以在 Nginx 配置中添加IP访问控制（参见配置文件中注释部分）

对于需要直接与区块链交互的DApp应用，应当配置为使用这个代理地址，例如:

```javascript
// 前端应用中配置Web3提供者
const web3 = new Web3('https://your-domain.com/hardhat/');

// 或者使用ethers.js
const provider = new ethers.providers.JsonRpcProvider('https://your-domain.com/hardhat/');
```

## 安全最佳实践

1. **限制服务监听地址**: 
   - 所有服务默认只监听 127.0.0.1，不直接对外暴露
   - 通过 Nginx 反向代理对外提供服务

2. **防火墙配置**:
   ```bash
   # 只允许 SSH 和 HTTP/HTTPS 流量
   sudo ufw allow ssh
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

3. **定期更新系统**:
   ```bash
   sudo apt update && sudo apt upgrade
   ```

4. **监控和日志**:
   - 定期检查 Nginx 和应用日志
   - 配置 logrotate 防止日志文件过大

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