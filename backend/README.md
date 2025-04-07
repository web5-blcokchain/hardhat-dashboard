# 后端服务模块

[返回主项目](../README.md)

## 模块说明
Express 后端服务，提供 API 接口用于节点状态监控和日志查看。

## API 接口
- GET /api/node/status - 获取节点状态
- GET /api/logs - 获取节点日志

## 配置说明
- 服务端口：3000
- 日志路径配置
- CORS 配置

## 使用方法
```bash
# 单独运行
yarn install
yarn dev

# 通过主项目启动脚本运行
cd ..
node start.js
```

## 开发指南
- 控制器在 controllers 目录
- 路由在 routes 目录
- 中间件在 middleware 目录

## 部署说明
详细部署说明请参考[部署运行指南](../部署运行指南.md)。
