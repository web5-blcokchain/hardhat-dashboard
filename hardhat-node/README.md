# Hardhat 节点模块

[返回主项目](../README.md)

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
# 单独运行
yarn install
yarn node

# 通过主项目启动脚本运行
cd ..
node start.js
```

## 开发指南
- 智能合约开发在 contracts 目录
- 测试脚本在 test 目录
- 部署脚本在 scripts 目录

## 部署说明
详细部署说明请参考[部署运行指南](../部署运行指南.md)。
