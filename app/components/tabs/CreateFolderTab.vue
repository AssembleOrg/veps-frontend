<template>
  <div class="space-y-4">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Crear Nueva Carpeta VEP
        </h3>
      </template>

      <form @submit.prevent="handleCreateFolder" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mes
            </label>
            <USelect
              v-model="createForm.month"
              :items="monthOptions"
              placeholder="Seleccionar mes"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Año
            </label>
            <USelect
              v-model="createForm.year"
              :items="yearOptions"
              placeholder="Seleccionar año"
              class="w-full"
            />
          </div>
        </div>

        <!-- Preview -->
        <div v-if="previewFolderName" class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
            Nombre de carpeta: <code class="text-blue-600 dark:text-blue-400">{{ previewFolderName }}</code>
          </p>
        </div>

        <UButton
          type="submit"
          :loading="createLoading"
          :disabled="!createForm.month || !createForm.year"
          class="w-full sm:w-auto"
          size="lg"
        >
          <UIcon name="i-heroicons-plus-circle" class="w-4 h-4 mr-2" />
          Crear Carpeta
        </UButton>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useVepApi } from '~/composables/useVepApi'

// Props
interface Props {
  createForm: {
    month: string
    year: string
  }
  createLoading: boolean
  previewFolderName: string
  monthOptions: Array<{ label: string; value: string }>
  yearOptions: Array<{ label: string; value: string }>
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'create-folder': []
  'update:createForm': [value: { month: string; year: string }]
}>()

// Composables
const vepApi = useVepApi()

// Custom toast functions
function showSuccessToast(title: string, description: string) {
  if (process.client) {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 max-w-sm w-full bg-green-600 border-green-700 border rounded-lg shadow-lg p-4 mb-4 transform transition-all duration-300 ease-in-out translate-x-full opacity-0`
    
    notification.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-white">${title}</p>
          <p class="text-sm text-white opacity-90 mt-1">${description}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    `
    
    document.body.appendChild(notification)
    
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full', 'opacity-0')
      notification.classList.add('translate-x-0', 'opacity-100')
    })
    
    setTimeout(() => {
      notification.classList.add('translate-x-full', 'opacity-0')
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 300)
    }, 5000)
  }
}

function showErrorToast(title: string, description: string) {
  if (process.client) {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 max-w-sm w-full bg-red-600 border-red-700 border rounded-lg shadow-lg p-4 mb-4 transform transition-all duration-300 ease-in-out translate-x-full opacity-0`
    
    notification.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-white">${title}</p>
          <p class="text-sm text-white opacity-90 mt-1">${description}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    `
    
    document.body.appendChild(notification)
    
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full', 'opacity-0')
      notification.classList.add('translate-x-0', 'opacity-100')
    })
    
    setTimeout(() => {
      notification.classList.add('translate-x-full', 'opacity-0')
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 300)
    }, 5000)
  }
}

// Methods
async function handleCreateFolder() {
  emit('create-folder')
}
</script>
