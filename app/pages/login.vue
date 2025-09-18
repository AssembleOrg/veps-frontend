<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Mobile-first responsive container -->
    <div class="w-full max-w-sm sm:max-w-md mx-4 sm:mx-0">
      <!-- Logo/Brand section - responsive sizing -->
      <div class="text-center mb-6 sm:mb-8">
        <div class="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4 sm:mb-6">
          <UIcon name="i-heroicons-lock-closed" class="h-8 w-8 sm:h-10 sm:w-10 text-primary-600" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bienvenido
        </h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Inicia sesión para acceder a tu cuenta
        </p>
      </div>

      <!-- Login Form Card -->
      <UCard class="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div class="p-4 sm:p-6 lg:p-8">
          <UForm 
            :schema="schema" 
            :state="state" 
            class="space-y-4 sm:space-y-6" 
            @submit="onSubmit"
            :loading="loading"
          >
            <!-- Email Field -->
            <UFormField label="Correo electrónico" name="email" required>
              <UInput 
                v-model="state.email" 
                type="email" 
                placeholder="tu@ejemplo.com"
                icon="i-heroicons-envelope"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <!-- Password Field -->
            <UFormField label="Contraseña" name="password" required>
              <UInput 
                v-model="state.password" 
                type="password" 
                placeholder="••••••••"
                icon="i-heroicons-lock-closed"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <!-- Remember Me & Forgot Password -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <UCheckbox 
                v-model="state.rememberMe" 
                label="Recordar sesión" 
                class="text-sm"
              />
              <!-- Optional: Add forgot password link -->
                             <UButton 
                 variant="link" 
                 size="sm" 
                 class="text-primary-600 hover:text-primary-700 p-0 h-auto"
                 disabled
               >
                 ¿Olvidaste tu contraseña?
               </UButton>
            </div>

            <!-- Submit Button -->
            <UButton 
              type="submit" 
              block 
              size="lg"
              :loading="loading"
              class="mt-6"
            >
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
              Iniciar Sesión
            </UButton>
          </UForm>

          <!-- Error Alert -->
          <div v-if="error" class="mt-4">
            <UAlert 
              color="error" 
              variant="soft" 
              :title="error"
              :close-button="{ 
                icon: 'i-heroicons-x-mark-20-solid', 
                color: 'gray', 
                variant: 'link', 
                padded: false 
              }"
              @close="error = ''"
            />
          </div>

       
        </div>
      </UCard>

      <!-- Footer -->
      <div class="mt-6 sm:mt-8 text-center">
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          © 2024 Tu Aplicación. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { navigateTo } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'

// Define page meta
definePageMeta({
  layout: false,
  middleware: 'guest'
})

// Form schema
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

type Schema = z.output<typeof schema>

// Reactive state
const state = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const error = ref('')

// Get auth composable
const { signIn } = useAuth()

// Form submission
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  error.value = ''

  try {
    await signIn(event.data.email, event.data.password)
    await navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>