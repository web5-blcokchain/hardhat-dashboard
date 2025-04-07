# Hardhat Node Monitoring System

English | [简体中文](./README.md)

## Project Background
This project is a monitoring system for Ethereum test nodes based on Hardhat, used for monitoring the status, viewing logs, and managing Ethereum nodes in development and testing environments. The system adopts a front-end and back-end separated architecture, providing an intuitive web interface to monitor node status and view real-time logs.

## System Architecture
The project is divided into three main modules:
- **[hardhat-node](./hardhat-node/README.md)**: Ethereum test node, implemented based on Hardhat
- **[backend](./backend/README.md)**: Express back-end service, providing API interfaces
- **[frontend](./frontend/README.md)**: Vue3 front-end interface, providing visual monitoring interface

## Environment Requirements
- Node.js >= 16.0.0
- Yarn >= 1.22.0
- Operating System: MacOS/Linux/Windows

## Project Structure
```tree
hardhat-node/
├── hardhat-node/         # Hardhat node module
├── backend/             # Backend service module
├── frontend/           # Frontend interface module
├── contracts/          # Smart contract directory
├── scripts/            # Deployment and management scripts
└── docs/              # Project documentation
```

## Quick Start
1. Clone the project
```bash
git clone <repository-url>
cd hardhat-node
```

2. Use the automated startup script (recommended)
```bash
# Development environment startup
node start.js

# Production environment startup
node start.js --mode=production
# or
npm run start:prod
```

3. Access the system
Open the browser and visit `http://localhost:5173`

## Core Features
- Node status monitoring
- Real-time log viewing
- Fixed test account management
- Blockchain parameter configuration

## Core Design Philosophy
1. **Modular Design**: Adopts a front-end and back-end separated architecture, with clear module responsibilities
2. **Extensibility**: Reserved extension interfaces for easy addition of new features
3. **Developer-Friendly**: Provides complete development environment and testing tools
4. **Flexible Configuration**: Supports custom configuration and environment variables

## Deployment Guide
For a detailed deployment guide, including development and production environment configuration, please refer to [Deployment Guide](./部署运行指南.md).

## Secondary Development Suggestions
1. **New Feature Development**
   - Follow the existing modular structure
   - Add new features in the corresponding modules
   - Maintain consistent code style

2. **Testing Suggestions**
   - Write unit tests and integration tests
   - Use Hardhat test network for testing
   - Conduct stress testing and performance optimization

3. **Notes**
   - Maintain compatibility of configuration files
   - Pay attention to logging specifications
   - Follow Git workflow

## Maintenance Guide
- Regularly update dependencies
- Monitor system performance
- Backup important data
- Check log records

## Contribution Guide
Welcome to submit Issues and Pull Requests, please follow these steps:
1. Fork the project
2. Create a feature branch
3. Submit changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Contact Information
- Project Maintainer: [Maintainer Name]
- Email: [Contact Email]