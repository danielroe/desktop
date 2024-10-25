<template>
  <div class="flex flex-row justify-between text-white inset-0 fixed">
    <TheClock class="opacity-25 flex flex-shrink px-12" />
    <RepoList class="opacity-50" />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'bg-black',
  },
})
</script>
