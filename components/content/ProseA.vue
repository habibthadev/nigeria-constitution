<script setup lang="ts">
defineProps<{
  href?: string
  target?: string
  rel?: string
}>()
</script>
<template>
  <a :href="href" :target="target" :rel="rel"><slot /></a>
</template>
