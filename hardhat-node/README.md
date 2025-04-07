
# Hardhat 节点模块

## 模块说明
本模块是基于 Hardhat 的以太坊测试节点，提供了一个本地的区块链测试环境。

## 特性
- 固定的测试账户和私钥
- 可配置的出块时间
- 完整的区块链功能模拟
- 详细的日志记录

## 配置说明
- 网络配置：hardhat.config.js
- 日志配置：scripts/node.js
- 账户配置：预设10个测试账户

## 使用方法
```bash
yarn install
yarn node
```

## 开发指南
- 智能合约开发在 contracts 目录
- 测试脚本在 test 目录
- 部署脚本在 scripts 目录
```

```markdown:/Users/zhangandy/Documents/work/code/blockchain/hardhat-node/backend/README.md
# 后端服务模块

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
yarn install
yarn dev
```

## 开发指南
- 控制器在 controllers 目录
- 路由在 routes 目录
- 中间件在 middleware 目录
```
