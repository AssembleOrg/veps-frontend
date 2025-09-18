<template>
  <div class="space-y-4">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Código QR para WhatsApp
        </h3>
      </template>

      <div class="space-y-4">
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Escanea el código QR para abrir una conexión vía WhatsApp
          </p>
          
          <UButton
            @click="$emit('show-qr-confirmation')"
            size="lg"
            class="w-full sm:w-auto"
          >
            <UIcon name="i-heroicons-qr-code" class="w-5 h-5 mr-2" />
            Mostrar Código QR
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Emits
const emit = defineEmits<{
  'show-qr-confirmation': []
}>()
</script>
