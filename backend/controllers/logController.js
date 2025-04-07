const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../hardhat-node/logs/node.log');

exports.getLogs = async (req, res) => {
  try {
    const { lines = 100 } = req.query;
    
    if (!fs.existsSync(LOG_FILE)) {
      console.log('日志文件不存在:', LOG_FILE);
      return res.json({ logs: [] });
    }

    const data = fs.readFileSync(LOG_FILE, 'utf8');
    const logs = data.split('\n')
      .filter(Boolean)  // 移除空行
      .slice(-lines)
      .map(line => {
        const match = line.match(/\[(.*?)\](.*)/);
        if (match) {
          return {
            timestamp: match[1].trim(),
            message: match[2].trim()
          };
        }
        return {
          timestamp: new Date().toISOString(),
          message: line.trim()
        };
      });

    console.log(`读取到 ${logs.length} 条日志`);
    res.json({ logs });
  } catch (error) {
    console.error('获取日志失败:', error);
    res.status(500).json({ 
      error: '获取日志失败',
      details: error.message 
    });
  }
};