<template>
  <div class="space-y-4">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Subir Archivos VEP
        </h3>
      </template>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Carpeta destino
          </label>
          <USelect
            :model-value="uploadForm.targetFolder"
            @update:model-value="$emit('update:uploadForm', { ...uploadForm, targetFolder: $event })"
            :items="folderOptions"
            placeholder="Seleccionar carpeta"
            :loading="foldersLoading"
            class="w-full"
          />
        </div>

        <div
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          :class="[
            'border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200',
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          ]"
        >
          <div class="space-y-4">
            <div class="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <UIcon 
                :name="isDragging ? 'i-heroicons-document-plus' : 'i-heroicons-cloud-arrow-up'"
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
              />
            </div>
            
            <div>
              <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {{ isDragging ? 'Suelta los archivos aquí' : 'Arrastra archivos aquí' }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                o 
                <button 
                  type="button"
                  @click="$refs.fileInput?.click()" 
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  selecciona desde tu dispositivo
                </button>
              </p>
              
              <div class="flex flex-wrap justify-center gap-2 text-xs">
                <span v-for="type in allowedTypes" :key="type" 
                      class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                  {{ type }}
                </span>
              </div>
            </div>
          </div>
          
          <input 
            ref="fileInput"
            type="file" 
            multiple
            class="hidden"
            @change="handleFileSelect"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
          />
        </div>

        <div v-if="selectedFiles.length > 0" class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-gray-900 dark:text-white">
              Archivos seleccionados ({{ selectedFiles.length }})
            </h4>
            <UButton 
              @click="$emit('clear-files')" 
              variant="ghost" 
              size="sm"
              color="error"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
              Limpiar
            </UButton>
          </div>

          <div class="max-h-60 overflow-y-auto space-y-2">
            <div 
              v-for="(file, index) in selectedFiles" 
              :key="index"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-blue-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ file.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatFileSize(file.size) }}
                  </p>
                </div>
              </div>
              
              <UButton 
                @click="$emit('remove-file', index)"
                variant="ghost" 
                size="sm"
                color="error"
              >
                <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
              </UButton>
            </div>
          </div>

          <UButton
            @click="$emit('upload-files')"
            :disabled="!uploadForm.targetFolder || selectedFiles.length === 0 || isUploading"
            :loading="isUploading"
            class="w-full"
            size="lg"
          >
            <UIcon name="i-heroicons-cloud-arrow-up" class="w-4 h-4 mr-2" />
            Subir {{ selectedFiles.length }} archivo{{ selectedFiles.length !== 1 ? 's' : '' }}
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props
interface Props {
  uploadForm: {
    targetFolder: string
  }
  folderOptions: Array<{ label: string; value: string }>
  foldersLoading: boolean
  selectedFiles: File[]
  isUploading: boolean
  allowedTypes: string[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:uploadForm': [value: { targetFolder: string }]
  'file-select': [files: FileList]
  'clear-files': []
  'remove-file': [index: number]
  'upload-files': []
}>()

// Local state
const isDragging = ref(false)

// Methods
function handleDragOver(e: DragEvent) {
  e.preventDefault()
}

function handleDragEnter(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
  
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    emit('file-select', files)
  }
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    emit('file-select', files)
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
