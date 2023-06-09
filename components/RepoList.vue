<script setup lang="ts">
const accessToken = useRuntimeConfig().githubToken

if (process.server && !accessToken) {
  throw new Error('Missing GitHub access token')
}

const { data: repos, error } = await useAsyncData(async () => {
  const formatter = Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short'
  })

  const modules = ['partytown', 'harlem', 'fontaine', 'html-validator', 'turnstile', 'sanity']
  const endpoints = ['https://api.github.com/users/danielroe/repos']
  
  const repos = []
  for (const endpoint of endpoints) {
    let page = 1
    let data: any[]
    do {
      data = await $fetch<any[]>(endpoint, {
        params: {
          page,
          per_page: 100
        },
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'Nuxt prerenderer'
        }
      }).catch(() => [])

      if (data.length) {
        repos.push(...data.filter(r => r.stargazers_count > 30 && !r.fork))
      }
      page++
    } while (data.length > 0)
  }

  for (const module of modules) {
    const data = await $fetch<any[]>(`https://api.github.com/repos/nuxt-modules/${module}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Nuxt prerenderer'
      }
    }).catch(() => null)
    
    if (data) { repos.push(data) }
  }

  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map(r => ({
      name: r.name,
      org: r.owner.login,
      stars: formatter.format(r.stargazers_count),
      issues: r.open_issues,
      ...process.dev && r,
    }))
})
</script>

<template>
  <div class="font-sans flex flex-col gap-2 px-16">
    <div v-if="error">{{ error }}</div>
    <article v-for="repo of repos" class="flex flex-row items-center gap-4">
      <span class="block w-12 justify-end text-yellow-300 flex gap-2 items-center">
        <span class="text-[.7rem] tracking-widest font-900">{{ repo.stars }}</span>
        <span class="block tabular-nums i-ri-star-fill h-3 w-3" />
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
