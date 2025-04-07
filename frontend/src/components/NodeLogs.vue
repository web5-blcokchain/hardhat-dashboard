<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">节点日志</h2>
    <div class="h-96 overflow-y-auto bg-gray-100 p-4 rounded font-mono text-sm">
      <div v-if="error" class="text-red-500">
        {{ error }}
      </div>
      <div v-else-if="logs.length === 0" class="text-gray-500">
        暂无日志
      </div>
      <div v-else>
        <div v-for="(log, index) in logs" :key="index" class="mb-2 break-all">
          <span class="text-gray-500 mr-2">{{ formatTime(log.timestamp) }}</span>
          <span>{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { fetchLogs } from '../utils/api';

const logs = ref([]);
const error = ref('');
let timer;

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString();
};

const updateLogs = async () => {
  try {
    const data = await fetchLogs(100);
    if (data.error) {
      throw new Error(data.error);
    }
    logs.value = data.logs || [];
    error.value = '';
  } catch (err) {
    console.error('获取日志失败:', err);
    error.value = '无法获取节点日志';
  }
};

onMounted(() => {
  updateLogs();
  timer = setInterval(updateLogs, 3000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>