<script setup lang="ts">
defineProps<{ id?: string }>()
</script>
<template>
  <h2 :id="id"><slot /></h2>
</template>
