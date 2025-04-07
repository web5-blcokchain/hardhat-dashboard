# Hardhat 节点监控系统 / Hardhat Node Monitoring System

[English](./README_EN.md) | 简体中文

## 项目背景
本项目是一个基于 Hardhat 的以太坊测试节点监控系统，用于开发和测试环境中以太坊节点的状态监控、日志查看和管理。系统采用前后端分离架构，提供了直观的 Web 界面来监控节点状态和查看实时日志。

## 系统架构
项目分为三个主要模块：
- **[hardhat-node](./hardhat-node/README.md)**: 以太坊测试节点，基于 Hardhat 实现
- **[backend](./backend/README.md)**: Express 后端服务，提供 API 接口
- **[frontend](./frontend/README.md)**: Vue3 前端界面，提供可视化监控界面

## 环境要求
- Node.js >= 16.0.0
- Yarn >= 1.22.0
- 操作系统：MacOS/Linux/Windows

## 项目结构
```tree
hardhat-node/
├── hardhat-node/         # Hardhat 节点模块
├── backend/             # 后端服务模块
├── frontend/           # 前端界面模块
├── contracts/          # 智能合约目录
├── scripts/            # 部署和管理脚本
└── docs/              # 项目文档
```

## 快速开始
1. 克隆项目
```bash
git clone <repository-url>
cd hardhat-node
```

2. 使用自动化脚本启动（推荐）
```bash
# 开发环境启动
node start.js

# 生产环境启动
node start.js --mode=production
# 或
npm run start:prod
```

3. 访问系统
打开浏览器访问 `http://localhost:5173`

## 核心功能
- 节点状态监控
- 实时日志查看
- 固定测试账户管理
- 区块链参数配置

## 核心设计思想
1. **模块化设计**：采用前后端分离架构，各模块职责明确
2. **可扩展性**：预留了扩展接口，方便添加新功能
3. **开发友好**：提供完整的开发环境和测试工具
4. **配置灵活**：支持自定义配置和环境变量

## 部署指南
详细的部署指南，包括开发环境和生产环境配置，请参考[部署运行指南](./部署运行指南.md)。

## 二次开发建议
1. **新功能开发**
   - 遵循现有的模块化结构
   - 在相应模块中添加新功能
   - 保持代码风格一致

2. **测试建议**
   - 编写单元测试和集成测试
   - 使用 Hardhat 测试网络进行测试
   - 进行压力测试和性能优化

3. **注意事项**
   - 保持配置文件的兼容性
   - 注意日志规范
   - 遵循 Git 工作流

## 维护指南
- 定期更新依赖包
- 监控系统性能
- 备份重要数据
- 检查日志记录

## 贡献指南
欢迎提交 Issue 和 Pull Request，请遵循以下步骤：
1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证
MIT License

## 联系方式
- 项目维护者：[维护者姓名]
- 邮箱：[联系邮箱]
```