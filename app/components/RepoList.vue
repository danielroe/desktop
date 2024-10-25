<script setup lang="ts">
const { data: repos, error, refresh } = await useFetch('/api/repos')

onMounted(() => setInterval(refresh, 1000 * 60 * 60))
</script>

<template>
  <div class="font-sans text-4xl flex flex-col gap-8 px-16 py-12">
    <div v-if="error">
      {{ error }}
    </div>
    <article
      v-for="repo of repos"
      :key="repo.name"
      class="flex flex-row items-center gap-4"
    >
      <span class="block w-30 justify-end text-yellow-300 flex gap-2 items-center">
        <span class="text-[2rem] tabular-nums tracking-widest font-900">{{ repo.stars }}</span>
        <span class="text-lg block i-ri-star-fill h-10 w-10" />
      </span>
      <span class="block w-40 justify-end opacity-75 flex gap-2 items-center">
        <template v-if="repo.downloads">
          <span class="text-[2rem] tabular-nums tracking-widest font-900">{{ repo.downloads }}</span>
        </template>
      </span>
      <span class="w-125 flex gap-1">
        <template v-if="repo.org !== 'danielroe'">
          <span class="opacity-50 font-normal">{{ repo.org }}</span>
          /
        </template>
        {{ repo.name }}
      </span>
      <span class="block w-40 justify-end text-red-300 flex gap-2 items-center">
        <span class="text-[2rem] tracking-widest font-900">{{ repo.issues }}</span>
        <span class="text-lg block tabular-nums i-ri-information-line h-10 w-10" />
      </span>
    </article>
  </div>
</template>
