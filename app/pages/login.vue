<template>
  <div class="min-h-screen relative overflow-hidden dark font-display" style="background-color: #101622;">
    <!-- Dynamic Background Layer -->
    <div class="fixed inset-0 z-0 dynamic-bg">
      <!-- Abstract Shapes -->
      <div class="absolute top-[10%] left-[15%] w-64 h-64 rounded-full blur-[100px]" style="background-color: rgba(13, 89, 242, 0.2);"></div>
      <div class="absolute bottom-[10%] right-[15%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[#22d3ee]/5 blur-[150px]"></div>
      
      <!-- Floating 3D-like Documents Icons (Visual Decor) -->
      <div class="absolute top-20 right-[15%] floating-doc opacity-40">
        <div class="w-24 h-32 bg-gradient-to-br from-white/20 to-transparent border border-white/20 rounded-lg flex items-center justify-center">
          <UIcon name="i-heroicons-document-text" class="text-white text-5xl" />
        </div>
      </div>
      <div class="absolute bottom-20 left-[10%] floating-doc opacity-30" style="animation-delay: -2s;">
        <div class="w-20 h-28 bg-gradient-to-tr border border-white/10 rounded-lg flex items-center justify-center" style="background: linear-gradient(to top right, rgba(13, 89, 242, 0.3), transparent);">
          <UIcon name="i-heroicons-receipt-percent" class="text-white text-4xl" />
        </div>
      </div>
      <div class="absolute top-[40%] right-[5%] floating-doc opacity-20" style="animation-delay: -4s;">
        <div class="w-16 h-20 bg-gradient-to-bl from-green-400/20 to-transparent border border-white/10 rounded-lg flex items-center justify-center">
          <UIcon name="i-heroicons-bolt" class="text-white text-3xl" />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <!-- Header / Navigation -->
      <header class="w-full px-8 py-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-600">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fill-rule="evenodd"></path>
              <path clip-rule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </div>
          <h2 class="text-white text-xl font-bold tracking-tight">Enviador de Veps</h2>
        </div>
      </header>

      <!-- Login Section -->
      <main class="flex-1 flex items-center justify-center p-6">
        <div class="glass-card w-full max-w-[460px] p-10 rounded-xl shadow-2xl relative overflow-hidden">
          <!-- Branding in Card -->
          <div class="text-center mb-10">
            <h1 class="text-white text-3xl font-bold mb-2">Bienvenido</h1>
            <p class="text-slate-400 text-sm">Enviador de Veps Estudio Contable</p>
          </div>

          <!-- Form -->
          <UForm 
            :schema="schema" 
            :state="state" 
            class="space-y-6" 
            @submit="onSubmit"
          >
            <!-- Email Field -->
            <div class="space-y-2">
              <label class="text-slate-300 text-sm font-medium ml-1">Usuario o Email</label>
              <div class="relative group">
                <UIcon 
                  name="i-heroicons-at-symbol" 
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-600 transition-colors w-5 h-5" 
                />
                <UInput 
                  v-model="state.email" 
                  type="email"
                  placeholder="ejemplo@correo.com"
                  class="w-full bg-slate-900/50 border border-slate-700 text-white rounded-lg h-14 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 outline-none transition-all placeholder:text-slate-600"
                  :disabled="loading"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label class="text-slate-300 text-sm font-medium ml-1">Contraseña</label>
              <div class="relative group">
                <UIcon 
                  name="i-heroicons-lock-closed" 
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-600 transition-colors w-5 h-5" 
                />
                <UInput 
                  v-model="state.password" 
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full bg-slate-900/50 border border-slate-700 text-white rounded-lg h-14 pl-12 pr-12 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 outline-none transition-all placeholder:text-slate-600"
                  :disabled="loading"
                />
                <button 
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors" 
                  type="button"
                  @click="showPassword = !showPassword"
                >
                  <UIcon 
                    :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" 
                    class="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between py-2">
              <label class="flex items-center gap-2 cursor-pointer group">
                <UCheckbox 
                  v-model="state.rememberMe"
                  class="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-600 focus:ring-offset-0"
                />
                <span class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Recordarme</span>
              </label>
              <UButton 
                variant="link" 
                size="sm" 
                class="text-sm text-blue-600 hover:text-blue-400 transition-colors font-medium p-0 h-auto"
                disabled
              >
                ¿Olvidaste tu contraseña?
              </UButton>
            </div>

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

            <!-- Submit Button -->
            <UButton 
              type="submit" 
              class="w-full text-white font-bold h-14 rounded-lg glow-button transition-all flex items-center justify-center gap-2"
              style="background-color: #0d59f2;"
              :class="{'hover:opacity-90': !loading}"
              :loading="loading"
              :disabled="loading"
            >
              <span>Ingresar</span>
              <UIcon name="i-heroicons-arrow-right" class="text-[20px]" />
            </UButton>
          </UForm>
        </div>
      </main>

      <!-- Footer -->
      <footer class="w-full px-8 py-6 flex items-center justify-center">
        <div class="flex items-center gap-2 text-slate-500 text-xs">
          <UIcon name="i-heroicons-lock-closed" class="text-[14px] text-green-500" />
          <span>v1.0.4 - Conexión Segura Encriptada</span>
        </div>
      </footer>
    </div>

    <!-- Background Pattern Overlay -->
    <div 
      class="fixed inset-0 pointer-events-none opacity-[0.03] z-[5]" 
      style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBo6hAjiJPqB1cDvCdiLoC0eCYEX8OZjvKAecl-kVHpbnzJVGyHuYumR97-lM2fTDhxyjtLhLkq9yYpMt5zlWGgxWFBWHL6Fk7h2w_Iivj2ntkLaCEaO-ZRxOq53s4CnrCI3S_2IpPbsvkVrpxKlvPIuRBL7GYwAc1BZEGoBvW-RL8kbxpreDYItxZ9-ZJBUf7rXg06uqI__-KKSWySkXwdPMOxXL3aHTL4L4p2qKKwzOLt3F2N4epteFu8hu0iH46IFk9XClj4CLAf');"
    ></div>
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
const showPassword = ref(false)

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

<style scoped>
.glass-card {
  background: rgba(16, 22, 34, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dynamic-bg {
  background: radial-gradient(circle at top left, #0d59f2 0%, transparent 40%),
              radial-gradient(circle at bottom right, #7c3aed 0%, transparent 40%),
              radial-gradient(circle at center, #101622 0%, #080c14 100%);
}

.glow-button {
  box-shadow: 0 0 20px rgba(13, 89, 242, 0.4);
}

.glow-button:hover {
  box-shadow: 0 0 30px rgba(13, 89, 242, 0.6);
}

.floating-doc {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

</style>
