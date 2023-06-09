<script setup lang="ts">
const now = new Date()

const hour = useState(() => now.getHours())
const minute = useState(() => now.getMinutes())

if (process.client) {
  setInterval(() => {
    const now = new Date()
    hour.value = now.getHours()
    minute.value = now.getMinutes()
  }, 1000)
}
</script>

<template>
  <div class="font-sans font-bold text-white text-[15rem]">
    {{ hour }}:{{ minute }}
  </div>
</template>
