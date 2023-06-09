<script setup lang="ts">
const hour = useState()
const minute = useState()

function setTime() {
  const now = new Date()
  hour.value = now.getHours()
  minute.value = String(now.getMinutes()).padStart(2, '0')
}

setTime()

if (process.client) {
  setInterval(setTime, 1000)
}
</script>

<template>
  <div class="font-sans text-white text-[15rem] tabular-nums">
    <span class="font-100 tracking-tighter">{{ hour }}</span><span class="font-500 mx-5">.</span><span class="font-100 tracking-tighter">{{ minute }}</span>
  </div>
</template>
