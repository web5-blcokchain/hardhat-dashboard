<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto space-y-4">
      <h1 class="text-2xl font-bold mb-6">以太坊测试节点管理平台</h1>
      
      <!-- 当没有token时显示提示 -->
      <div v-if="!hasToken" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p class="font-bold">访问受限</p>
        <p>检测到您未使用访问令牌，API请求可能受到速率限制。</p>
        <p>如需无限制访问，请联系系统管理员获取访问令牌。</p>
        <p class="text-sm text-gray-600 mt-2">联系方式: admin@example.com</p>
      </div>
      
      <NodeStatus />
      <NodeLogs />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NodeStatus from './components/NodeStatus.vue'
import NodeLogs from './components/NodeLogs.vue'

// 初始化为false，在客户端挂载后检查
const hasToken = ref(false);

// 在组件挂载后检查URL参数
onMounted(() => {
  // 确保在客户端环境中执行
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    hasToken.value = urlParams.has('token');
  }
});
</script>
