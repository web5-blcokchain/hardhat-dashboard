// ... 现有代码 ...
import config from '../config';

// 修改API调用
const fetchNodeStatus = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/api/node/status`);
    // ... 处理响应 ...
  } catch (error) {
    // ... 错误处理 ...
  }
};