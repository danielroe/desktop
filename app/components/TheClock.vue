<script setup lang="ts">
const hour = useState()
const minute = useState()

function setTime() {
  const now = new Date()
  hour.value = now.getHours() || 12
  minute.value = String(now.getMinutes()).padStart(2, '0')
}

setTime()

if (import.meta.client) {
  setInterval(setTime, 1000)
}
</script>

<template>
  <div class="font-sans text-[15rem] tabular-nums">
    <span class="font-800 tracking-wide">{{ hour }}</span><span class="font-800 mx-4">.</span><span class="font-800 tracking-wide">{{ minute }}</span>
  </div>
</template>
