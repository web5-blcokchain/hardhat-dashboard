import config from '../config';

const API_BASE_URL = config.apiBaseUrl;

// 从当前URL获取token参数
const getTokenFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token');
};

// 为URL添加token参数（如果URL中存在token）
const addTokenToUrl = (url) => {
  const token = getTokenFromUrl();
  // 如果URL中没有token参数，则返回原始URL
  if (!token) {
    return url;
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}token=${token}`;
};

export const fetchNodeStatus = async () => {
  try {
    const url = addTokenToUrl(`${API_BASE_URL}/node/status`);
    const response = await fetch(url);
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

export const fetchLogs = async (limit = 100) => {
  try {
    const baseUrl = `${API_BASE_URL}/logs?lines=${limit}`;
    const url = addTokenToUrl(baseUrl);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('获取日志失败:', error);
    return {
      logs: [],
      error: error.message
    };
  }
};