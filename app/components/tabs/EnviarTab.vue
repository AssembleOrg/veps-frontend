<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Enviar VEPs
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Matchear archivos VEP con usuarios y enviar documentos
            </p>
          </div>
          <UButton
            @click="$emit('open-enviar-modal')"
            size="lg"
            class="w-full sm:w-auto"
          >
            <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4 mr-2" />
            Iniciar Proceso
          </UButton>
        </div>
      </template>

      <div class="text-center py-12">
        <UIcon name="i-heroicons-paper-airplane" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Envío de VEPs
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Selecciona una carpeta de archivos VEP y los usuarios correspondientes para realizar el matcheo y envío automático de documentos.
        </p>
        <UButton
          @click="$emit('open-enviar-modal')"
          size="lg"
          variant="outline"
        >
          <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4 mr-2" />
          Comenzar Proceso
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Emits
const emit = defineEmits<{
  'open-enviar-modal': []
}>()
</script>
