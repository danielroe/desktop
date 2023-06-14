const accessToken = useRuntimeConfig().githubToken

if (!accessToken) {
  throw new Error('Missing GitHub access token')
}

const monorepoMap = {
  'danielroe/nuxt-vitest': 'vitest-environment-nuxt'
}

export default defineCachedEventHandler(async event => {
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
      data = await $fetch(endpoint, {
        params: {
          page,
          per_page: 100
        },
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'Nuxt prerenderer'
        }
      }).catch((e) => {
        console.error(e)
        return []
      })

      if (data.length) {
        repos.push(...data.filter(r => r.stargazers_count > 30 && !r.fork))
      }
      page++
    } while (data.length > 0)
  }

  const extraRepos = [
    ...modules.map(m => `nuxt-modules/${m}`),
    ...repos.map(p => p.repo).filter(Boolean)
  ]

  for (const repo of extraRepos) {
    const data = await $fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Nuxt prerenderer'
      }
    }).catch((e) => {
      console.error(e)
      return null
    })
    
    if (data) {
      repos.push(data)
    }
  }

  const packages = await $fetch('https://registry.npmjs.org/-/v1/search?text=author:danielroe&size=1000')
  for (const repo of repos) {
    if (repo.full_name in monorepoMap) {
      repo.downloads = await $fetch(`https://api.npmjs.org/downloads/point/last-month/${monorepoMap[repo.full_name as keyof typeof monorepoMap]}`).then(r => r.downloads)
      continue
    }
    const pkg = packages.objects.find(pkg => pkg.package.links.repository && pkg.package.links.repository?.replace(/^.*github.com\/(.*)$/, '$1') === repo.full_name)
    if (pkg) {
      repo.downloads = await $fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg.package.name}`).then(r => r.downloads)
    } else {
      const packageJson = await $fetch(`https://raw.githubusercontent.com/${repo.full_name}/main/package.json`).then(r => JSON.parse(r)).catch(() => null)
      if (packageJson && !packageJson.private) {
        repo.downloads = await $fetch(`https://api.npmjs.org/downloads/point/last-month/${packageJson.name}`).then(r => r.downloads)
      }
    }
  }

  return repos
    .sort((a, b) => (b.stargazers_count + (b.downloads || b.stargazers_count)) - (a.stargazers_count + (a.downloads || a.stargazers_count)))
    .map(r => ({
      name: r.name as string,
      org: r.owner.login as string,
      stars: formatter.format(r.stargazers_count) as string,
      issues: r.open_issues as number,
      downloads: r.downloads ? formatter.format(r.downloads as number) : '',
      // ...process.dev && r,
    })).slice(0, 25)
})
