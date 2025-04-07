<template>
  <div>
    <p>{{ safeText }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    safeText() {
      return this.$options.filters.escape(this.userInput);
    }
  },
  filters: {
    escape(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }
}
</script>