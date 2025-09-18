<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Cerrar Sesión2
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Confirma para salir del sistema
            </p>
          </div>
        </div>
      </template>

      <div class="py-4">
        <div class="flex items-center space-x-4 mb-6">
          <UAvatar 
            :src="user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.email}&background=ef4444&color=ffffff`"
            :alt="user?.email || 'Usuario'"
            size="lg"
            class="ring-2 ring-red-100 dark:ring-red-800"
          />
          <div>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ user?.email?.split('@')[0] || 'Usuario' }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ user?.email || 'usuario@ejemplo.com' }}
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              Contador - VEP Manager
            </p>
          </div>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <div class="flex items-center space-x-2">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
              ¿Estás seguro que deseas cerrar sesión?
            </p>
          </div>
          <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
            Tendrás que volver a iniciar sesión para acceder al sistema.
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <UButton
            variant="outline"
            @click="cancel"
            :disabled="loading"
          >
            <UIcon name="i-heroicons-x-mark" class="mr-2" />
            Cancelar
          </UButton>
          
          <UButton
            color="error"
            @click="confirm"
            :loading="loading"
          >
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
            Cerrar Sesión
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
interface Props {
  user?: any
}

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isOpen = defineModel<boolean>()
const loading = ref(false)

function cancel() {
  emit('cancel')
  isOpen.value = false
}

async function confirm() {
  loading.value = true
  
  try {
    emit('confirm')
    isOpen.value = false
  } catch (error) {
    console.error('Error during logout:', error)
  } finally {
    loading.value = false
  }
}
</script> 