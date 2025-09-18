/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./app/**/*.{js,vue,ts}"
  ],
  theme: {
    extend: {
      // Add safe area utilities
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Add padding utilities for safe areas
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Add margin utilities for safe areas
      margin: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      }
    },
  },
  plugins: [
    // Add plugin for safe area utilities
    function({ addUtilities }) {
      addUtilities({
        '.safe-area-inset-top': {
          'padding-top': 'max(1rem, env(safe-area-inset-top))'
        },
        '.safe-area-inset-bottom': {
          'padding-bottom': 'max(1rem, env(safe-area-inset-bottom))'
        },
        '.safe-area-inset-left': {
          'padding-left': 'max(1rem, env(safe-area-inset-left))'
        },
        '.safe-area-inset-right': {
          'padding-right': 'max(1rem, env(safe-area-inset-right))'
        },
        '.safe-area-insets': {
          'padding-top': 'max(1rem, env(safe-area-inset-top))',
          'padding-bottom': 'max(1rem, env(safe-area-inset-bottom))',
          'padding-left': 'max(1rem, env(safe-area-inset-left))',
          'padding-right': 'max(1rem, env(safe-area-inset-right))'
        }
      })
    }
  ],
}