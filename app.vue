<template>
  <div class="text-white max-w-[45rem] right-0 fixed">
    <Clock class="opacity-25 flex justify-end px-12" />
    <RepoList class="opacity-50 fixed right-0" />
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
