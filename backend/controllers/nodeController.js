const { ethers } = require('ethers');

let provider;
let nodeStartTime;

const initProvider = () => {
  if (!provider) {
    try {
      provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      nodeStartTime = Date.now();
    } catch (error) {
      console.error("Provider initialization failed:", error);
      return null;
    }
  }
  return provider;
};

exports.getNodeStatus = async (req, res) => {
  try {
    const provider = initProvider();
    if (!provider) {
      throw new Error('Provider not initialized');
    }

    const [blockNumber, network] = await Promise.all([
      provider.getBlockNumber(),
      provider.getNetwork()
    ]);
    
    res.json({
      status: 'online',
      blockNumber,
      chainId: Number(network.chainId),
      startTime: nodeStartTime,
      uptime: Date.now() - nodeStartTime
    });
  } catch (error) {
    console.error("Node status check failed:", error);
    res.status(503).json({
      status: 'offline',
      error: error.message
    });
  }
};