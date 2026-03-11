<script setup lang="ts">
defineProps<{ id?: string }>()
</script>
<template>
  <h4 :id="id"><slot /></h4>
</template>
