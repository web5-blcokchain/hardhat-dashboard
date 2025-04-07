const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const logsRoutes = require('./routes/logs');

const app = express();

app.use(cors());
app.use(express.json());

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