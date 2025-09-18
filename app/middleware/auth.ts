import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    try {
      // Import the auth composable dynamically to avoid SSR issues
      const { useAuth } = await import('../composables/useAuth')
      const { user, loading } = useAuth()

      // Wait for auth state to be determined
      if (loading.value) {
        // You might want to show a loading state here
        return
      }

      if (!user.value) {
        return navigateTo('/login')
      }
    } catch (error) {
      console.error('Auth middleware error:', error)
      return navigateTo('/login')
    }
  }
})