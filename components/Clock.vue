<script setup lang="ts">
const hour = useState()
const minute = useState()

function setTime() {
  const now = new Date()
  hour.value = now.getHours()
  minute.value = now.getMinutes()
}

setTime()

if (process.client) {
  setInterval(setTime, 1000)
}
</script>

<template>
  <div class="font-sans font-900 text-white text-[15rem] tabular-nums tracking-tighter">
    {{ hour }}:{{ minute }}
  </div>
</template>
