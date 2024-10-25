import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Inter',
          weights: [100, 400, 500, 800],
        },
      },
    }),
  ],
})
