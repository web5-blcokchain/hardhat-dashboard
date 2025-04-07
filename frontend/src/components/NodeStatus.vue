<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">Node Status</h2>
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else class="space-y-2">
      <div class="flex justify-between">
        <span>Status:</span>
        <span :class="status === 'online' ? 'text-green-500' : 'text-red-500'">
          {{ status === 'online' ? 'Online' : 'Offline' }}
        </span>
      </div>
      <div class="flex justify-between">
        <span>Block Height:</span>
        <span>{{ blockNumber }}</span>
      </div>
      <div class="flex justify-between">
        <span>Chain ID:</span>
        <span>{{ chainId }}</span>
      </div>
      <div class="flex justify-between">
        <span>Uptime:</span>
        <span>{{ formatUptime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { fetchNodeStatus } from '../utils/api';

const status = ref('offline');
const blockNumber = ref(0);
const chainId = ref(0);
const uptime = ref(0);
const error = ref('');
let timer;

const formatUptime = computed(() => {
  const seconds = Math.floor(uptime.value / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
});

const updateNodeStatus = async () => {
  try {
    const data = await fetchNodeStatus();
    if (data.status === 'offline' || data.error) {
      throw new Error(data.error || 'Node service not responding');
    }
    status.value = data.status;
    blockNumber.value = data.blockNumber;
    chainId.value = data.chainId;
    uptime.value = data.uptime;
    error.value = '';
  } catch (err) {
    console.error('Failed to fetch node status:', err);
    status.value = 'offline';
    error.value = 'Cannot connect to node service';
  }
};

onMounted(() => {
  updateNodeStatus();
  timer = setInterval(updateNodeStatus, 5000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>