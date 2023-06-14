<script setup lang="ts">
const { data: repos, error, refresh } = await useFetch('/api/repos')

onMounted(() => setInterval(refresh, 1000 * 60 * 5))
</script>

<template>
  <div class="font-sans flex flex-col gap-2 px-16">
    <div v-if="error">{{ error }}</div>
    <article v-for="repo of repos" class="flex flex-row items-center gap-4">
      <span class="block w-16 justify-end text-yellow-300 flex gap-2 items-center">
        <span class="text-[.7rem] tabular-nums tracking-widest font-900">{{ repo.stars }}</span>
        <span class="block i-ri-star-fill h-3 w-3" />
      </span>
      <span class="block w-16 justify-end opacity-75 flex gap-2 items-center">
        <template v-if="repo.downloads">
          <span class="text-[.7rem] tabular-nums tracking-widest font-900">{{ repo.downloads }}</span>
        </template>
      </span>
      <span class="w-110 flex gap-1">
        <template v-if="repo.org !== 'danielroe'" class="flex gap-1">
          <span class="opacity-50 font-normal">{{ repo.org }}</span>
          /
        </template>
        {{ repo.name }}
      </span>
      <span class="block w-12 justify-end text-red-300 flex gap-2 items-center">
        <span class="text-[.7rem] tracking-widest font-900">{{ repo.issues }}</span>
        <span class="block tabular-nums i-ri-information-line h-3 w-3" />
      </span>
    </article>
  </div>
</template>
