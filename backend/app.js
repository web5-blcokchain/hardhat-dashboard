const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const logsRoutes = require('./routes/logs');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();

// 特殊令牌，允许无限制访问
const SPECIAL_TOKEN = 'zhifu888';

// 限速中间件应该最先使用
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  // 添加特殊token豁免
  skip: function (req) {
    // 如果URL参数中包含特定token，则跳过限制
    return req.query.token === SPECIAL_TOKEN;
  },
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
    message: '请求次数过多，请稍后再试或联系管理员获取访问令牌'
  }
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
    provider = new ethers.JsonRpcProvider("http://localhost:8545");
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