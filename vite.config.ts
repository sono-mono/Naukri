import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Plugin to resolve any remaining figma:asset/ virtual module imports
// so the build never fails on Vercel due to unresolved schemes.
function figmaAssetPlugin(): Plugin {
  const SCHEME = 'figma:asset/'
  // 1×1 transparent PNG data URL used as a placeholder when the
  // real asset file is not present in the build context.
  const PLACEHOLDER =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

  return {
    name: 'figma-asset-plugin',
    enforce: 'pre',
    resolveId(id: string) {
      if (id.startsWith(SCHEME)) {
        return '\0' + id // mark as virtual
      }
    },
    load(id: string) {
      if (id.startsWith('\0' + SCHEME)) {
        return `export default "${PLACEHOLDER}"`
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
