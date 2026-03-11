<script setup lang="ts">
defineProps<{
  title?: string
  label?: string
  description?: string
}>()
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      width: 1200px;
      height: 630px;
      background: #0a0a09;
      padding: 72px 80px;
      justify-content: space-between;
      font-family: 'IBM Plex Mono', monospace;
    "
  >
    <div style="display: flex; align-items: center; gap: 12px;">
      <svg
        width="28"
        height="28"
        viewBox="0 0 256 256"
        fill="#00c97a"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M239.43,133l-32-120A8,8,0,0,0,197.57,9L128,47.42,58.43,9A8,8,0,0,0,48.57,13l-32,120a8,8,0,0,0,2.53,8.13l104,80a8,8,0,0,0,9.8,0l104-80A8,8,0,0,0,239.43,133ZM128,223.07l-96.12-74,29.53-110.73L120,68.58V200a8,8,0,0,0,16,0V68.58l58.59-30.21L224.12,149Z" />
      </svg>
      <span style="font-size: 14px; color: #5a5a57; letter-spacing: 0.02em;">
        nigeria-constitution.vercel.app
      </span>
    </div>

    <div style="display: flex; flex-direction: column; gap: 20px;">
      <span
        v-if="label"
        style="
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #5a5a57;
        "
      >
        {{ label }}
      </span>
      <div
        style="
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 52px;
          font-weight: 400;
          color: #f0f0ee;
          line-height: 1.15;
          max-width: 900px;
        "
      >
        {{ title || 'Nigeria Constitution' }}
      </div>
      <div
        v-if="description"
        style="
          font-family: 'Lora', Georgia, serif;
          font-size: 20px;
          color: #9a9a95;
          line-height: 1.6;
          max-width: 800px;
        "
      >
        {{ description }}
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div
        style="
          width: 32px;
          height: 3px;
          background: #00c97a;
          border-radius: 2px;
        "
      />
      <span style="font-size: 13px; color: #5a5a57; letter-spacing: 0.05em;">
        The 1999 Constitution of the Federal Republic of Nigeria
      </span>
    </div>
  </div>
</template>
