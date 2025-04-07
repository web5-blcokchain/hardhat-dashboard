<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto space-y-4">
      <h1 class="text-2xl font-bold mb-6">以太坊测试节点管理平台</h1>
      
      <!-- 当没有token时显示提示 -->
      <div v-if="!hasToken" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p class="font-bold">提示</p>
        <p>为了避免请求限制，可以添加token参数访问: <span class="font-mono bg-gray-200 px-1">?token=zhifu888</span></p>
        <a :href="`${window.location.pathname}?token=zhifu888`" class="text-blue-600 underline">点击添加token</a>
      </div>
      
      <NodeStatus />
      <NodeLogs />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import NodeStatus from './components/NodeStatus.vue'
import NodeLogs from './components/NodeLogs.vue'

// 检查URL中是否有token参数
const hasToken = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('token');
});
</script>
