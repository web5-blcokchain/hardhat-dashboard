const API_BASE_URL = 'http://localhost:3000/api';

export const fetchNodeStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/node/status`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('获取节点状态失败:', error);
    return {
      status: 'offline',
      error: error.message
    };
  }
};