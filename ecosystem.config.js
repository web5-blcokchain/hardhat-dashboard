module.exports = {
  "apps": [
    {
      "name": "hardhat-node",
      "cwd": "/Users/zhangandy/Documents/work/code/blockchain/hardhat-node/hardhat-node",
      "script": "scripts/node.js",
      "watch": false,
      "autorestart": true,
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "name": "backend",
      "cwd": "/Users/zhangandy/Documents/work/code/blockchain/hardhat-node/backend",
      "script": "app.js",
      "watch": [
        "routes",
        "controllers"
      ],
      "ignore_watch": [
        "node_modules"
      ],
      "watch_options": {
        "followSymlinks": false
      },
      "env": {
        "NODE_ENV": "development",
        "PORT": 3000
      }
    },
    {
      "name": "frontend",
      "cwd": "/Users/zhangandy/Documents/work/code/blockchain/hardhat-node/frontend",
      "script": "node_modules/.bin/vite",
      "args": "--port 5173",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}