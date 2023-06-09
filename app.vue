<template>
  <div>
    <Clock class="opacity-25 flex justify-end px-12" />
  </div>
</template>

<script setup lang="ts">
if (process.dev) {
  useHead({
    htmlAttrs: {
      class: 'bg-gray-800'
    }
  })
}
</script>
