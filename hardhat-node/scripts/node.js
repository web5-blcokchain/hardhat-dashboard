const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'node.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

fs.writeFileSync(LOG_FILE, ''); // 清空日志文件

// 格式化时间戳
function formatTimestamp(date) {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  });
}

// 重写 console.log 来捕获所有输出
const originalConsoleLog = console.log;
console.log = function() {
  const message = Array.from(arguments).join(' ');
  const timestamp = formatTimestamp(new Date());
  let logMessage = `[${timestamp}] ${message}\n`;
  
  // 写入文件
  fs.appendFileSync(LOG_FILE, logMessage);
  
  // 控制台彩色输出
  if (message.includes('Error') || message.includes('error')) {
    originalConsoleLog(chalk.red(logMessage));
  } else if (message.includes('Warning') || message.includes('warning')) {
    originalConsoleLog(chalk.yellow(logMessage));
  } else if (message.includes('Started HTTP and WebSocket JSON-RPC server')) {
    originalConsoleLog(chalk.green(logMessage));
  } else {
    originalConsoleLog(logMessage);
  }
};

async function main() {
  try {
    await hre.run("node", {
      hostname: "127.0.0.1",
      port: 8545,
      logging: {
        debug: true,
        verbose: true
      }
    });
  } catch (error) {
    console.error(`Hardhat 节点启动失败: ${error.message}`);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  const timestamp = formatTimestamp(new Date());
  fs.appendFileSync(LOG_FILE, `[${timestamp}] 节点关闭\n`);
  process.exit();
});

main();