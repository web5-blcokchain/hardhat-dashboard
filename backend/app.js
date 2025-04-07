const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const logsRoutes = require('./routes/logs');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();

// 限速中间件应该最先使用
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// CSRF Token 中间件
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

let provider;
let nodeStartTime;

// 初始化 provider
const initProvider = async () => {
  try {
    provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    nodeStartTime = Date.now();
    await provider.getBlockNumber();
    return true;
  } catch (error) {
    console.error("Provider 初始化失败:", error);
    return false;
  }
};

// 节点状态接口
app.get('/api/node/status', async (req, res) => {
  try {
    if (!provider) {
      const initialized = await initProvider();
      if (!initialized) {
        throw new Error('无法连接到节点');
      }
    }

    const blockNumber = await provider.getBlockNumber();
    const network = await provider.getNetwork();
    
    res.json({
      status: 'online',
      blockNumber,
      chainId: Number(network.chainId),
      startTime: nodeStartTime,
      uptime: Date.now() - nodeStartTime
    });
  } catch (error) {
    res.status(503).json({
      status: 'offline',
      error: error.message
    });
  }
});

app.use('/api/logs', logsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`后端服务运行在端口 ${PORT}`);
  initProvider();
});