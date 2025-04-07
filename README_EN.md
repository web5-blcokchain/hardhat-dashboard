
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