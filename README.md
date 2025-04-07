
# Hardhat 节点监控系统 / Hardhat Node Monitoring System

[English](./README_EN.md) | 简体中文

## 项目背景
本项目是一个基于 Hardhat 的以太坊测试节点监控系统，用于开发和测试环境中以太坊节点的状态监控、日志查看和管理。系统采用前后端分离架构，提供了直观的 Web 界面来监控节点状态和查看实时日志。

## 系统架构
项目分为三个主要模块：
- **hardhat-node**: 以太坊测试节点，基于 Hardhat 实现
- **backend**: Express 后端服务，提供 API 接口
- **frontend**: Vue3 前端界面，提供可视化监控界面

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

2. 安装依赖
```bash
# 安装 Hardhat 节点依赖
cd hardhat-node
yarn install

# 安装后端依赖
cd ../backend
yarn install

# 安装前端依赖
cd ../frontend
yarn install
```

3. 启动服务
```bash
# 终端 1: 启动 Hardhat 节点
cd hardhat-node
yarn node

# 终端 2: 启动后端服务
cd backend
yarn dev

# 终端 3: 启动前端服务
cd frontend
yarn dev
```

4. 访问系统
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
1. **生产环境配置**
   - 修改配置文件中的相关参数
   - 设置环境变量
   - 配置 PM2 或其他进程管理工具

2. **部署步骤**
   - 构建前端项目
   - 配置反向代理
   - 启动服务

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

2. 创建英文版 README：

```markdown:/Users/zhangandy/Documents/work/code/blockchain/hardhat-node/README_EN.md
# Hardhat Node Monitoring System

English | [简体中文](./README.md)

## Background
This project is a monitoring system for Ethereum test nodes based on Hardhat, designed for development and testing environments. It provides a visual web interface for monitoring node status and viewing real-time logs.

## Architecture
The project consists of three main modules:
- **hardhat-node**: Ethereum test node based on Hardhat
- **backend**: Express backend service providing API interfaces
- **frontend**: Vue3 frontend interface for visualization

## Requirements
- Node.js >= 16.0.0
- Yarn >= 1.22.0
- OS: MacOS/Linux/Windows

## Project Structure
```tree
hardhat-node/
├── hardhat-node/         # Hardhat node module
├── backend/             # Backend service module
├── frontend/           # Frontend interface module
├── contracts/          # Smart contracts directory
├── scripts/            # Deployment and management scripts
└── docs/              # Project documentation
```

## Quick Start
1. Clone the project
```bash
git clone <repository-url>
cd hardhat-node
```

2. Install dependencies
```bash
# Install Hardhat node dependencies
cd hardhat-node
yarn install

# Install backend dependencies
cd ../backend
yarn install

# Install frontend dependencies
cd ../frontend
yarn install
```

3. Start services
```bash
# Terminal 1: Start Hardhat node
cd hardhat-node
yarn node

# Terminal 2: Start backend service
cd backend
yarn dev

# Terminal 3: Start frontend service
cd frontend
yarn dev
```

4. Access the system
Open browser and visit `http://localhost:5173`

## Core Features
- Node status monitoring
- Real-time log viewing
- Fixed test account management
- Blockchain parameter configuration

## Core Design Philosophy
1. **Modular Design**: Clear responsibilities with frontend-backend separation
2. **Extensibility**: Reserved interfaces for new features
3. **Developer Friendly**: Complete development environment and testing tools
4. **Flexible Configuration**: Support for custom settings and environment variables

## Deployment Guide
1. **Production Environment Setup**
   - Modify configuration parameters
   - Set environment variables
   - Configure PM2 or other process managers

2. **Deployment Steps**
   - Build frontend project
   - Configure reverse proxy
   - Launch services

## Development Guidelines
1. **New Feature Development**
   - Follow existing modular structure
   - Add new features in corresponding modules
   - Maintain consistent code style

2. **Testing Recommendations**
   - Write unit and integration tests
   - Use Hardhat test network
   - Conduct stress testing and performance optimization

3. **Important Notes**
   - Maintain configuration compatibility
   - Follow logging standards
   - Adhere to Git workflow

## Maintenance Guide
- Regular dependency updates
- System performance monitoring
- Important data backup
- Log checking

## Contributing
Welcome to submit Issues and Pull Requests, please follow these steps:
1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
MIT License

## Contact
- Project Maintainer: [Maintainer Name]
- Email: [Contact Email]
```

3. 为各个模块创建 README 文件：

```markdown:/Users/zhangandy/Documents/work/code/blockchain/hardhat-node/hardhat-node/README.md
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

```markdown:/Users/zhangandy/Documents/work/code/blockchain/hardhat-node/frontend/README.md
# 前端界面模块

## 模块说明
基于 Vue3 的前端监控界面，提供节点状态和日志的可视化展示。

## 功能特性
- 节点状态实时监控
- 日志实时展示
- 响应式设计
- 主题定制

## 配置说明
- 开发服务器：5173端口
- API配置
- 主题配置

## 使用方法
```bash
yarn install
yarn dev
```

## 开发指南
- 组件在 components 目录
- 页面在 views 目录
- 样式在 styles 目录
```

这些文档提供了完整的项目说明，包括：
1. 项目整体架构和各个模块的职责
2. 详细的安装和使用说明
3. 开发指南和注意事项
4. 完整的部署流程
5. 维护和贡献指南

