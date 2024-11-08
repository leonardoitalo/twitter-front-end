import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: 'dist', // Garante que o build seja gerado na pasta 'dist'
    assetsDir: 'assets', // Pastas para recursos estáticos (como imagens, CSS, etc.)
  },
})
