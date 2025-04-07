<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto space-y-4">
      <h1 class="text-2xl font-bold mb-6">以太坊测试节点管理平台</h1>
      <NodeStatus />
      <NodeLogs />
    </div>
  </div>
</template>

<script setup>
import NodeStatus from './components/NodeStatus.vue'
import NodeLogs from './components/NodeLogs.vue'
</script>
