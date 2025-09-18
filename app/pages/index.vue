<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 mx-auto text-primary-600" />
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Cargando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Check authentication and redirect
onMounted(() => {
  if (process.client) {
    const isAuthenticated = localStorage.getItem('user_authenticated')
    
    if (isAuthenticated) {
      navigateTo('/dashboard')
    } else {
      navigateTo('/login')
    }
  }
})
</script> 