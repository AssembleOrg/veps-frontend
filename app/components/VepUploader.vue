<template>
  <UCard class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
    <template #header>
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
          <UIcon name="i-heroicons-cloud-arrow-up" class="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Subir Documentos VEP
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Arrastra archivos o selecciona desde tu dispositivo
          </p>
        </div>
      </div>
    </template>

    <!-- Folder Selection -->
    <div class="mb-6">
      <UFormGroup label="Carpeta destino" name="targetFolder">
        <USelect
          v-model="selectedFolder"
          :options="folderOptions"
          placeholder="Seleccionar carpeta VEP"
          :loading="foldersLoading"
          icon="i-heroicons-folder"
        />
      </UFormGroup>
    </div>

    <!-- Drag & Drop Area -->
    <div 
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      :class="[
        'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300',
        isDragging 
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/50 scale-[1.02] shadow-lg' 
          : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
      ]"
    >
      <div class="space-y-4">
        <div class="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-full flex items-center justify-center">
          <UIcon 
            :name="isDragging ? 'i-heroicons-document-plus' : 'i-heroicons-cloud-arrow-up'"
            :class="[
              'transition-all duration-300',
              isDragging ? 'h-10 w-10 text-purple-600' : 'h-8 w-8 text-purple-500'
            ]" 
          />
        </div>
        
        <div>
          <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {{ isDragging ? 'Suelta los archivos aquí' : 'Arrastra documentos VEP aquí' }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            o 
            <UButton 
              variant="link" 
              @click="$refs.fileInput?.click()" 
              class="p-0 h-auto font-medium text-purple-600 hover:text-purple-700"
            >
              selecciona archivos desde tu dispositivo
            </UButton>
          </p>
          
          <div class="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PDF</span>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">DOC</span>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">DOCX</span>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">XLS</span>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">XLSX</span>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">JPG</span>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PNG</span>
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

    <!-- Selected Files -->
    <div v-if="selectedFiles.length > 0" class="mt-6 space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white">
          Archivos seleccionados ({{ selectedFiles.length }})
        </h4>
        <UButton 
          @click="clearFiles" 
          variant="ghost" 
          size="sm"
          color="error"
        >
          <UIcon name="i-heroicons-trash" class="mr-1" />
          Limpiar
        </UButton>
      </div>

      <div class="space-y-2 max-h-60 overflow-y-auto">
        <div 
          v-for="(file, index) in selectedFiles" 
          :key="index"
          class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div class="flex items-center space-x-3 flex-1 min-w-0">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 rounded-lg flex items-center justify-center">
                <UIcon 
                  :name="getFileIcon(file.type)" 
                  class="h-5 w-5 text-blue-600 dark:text-blue-400" 
                />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ file.name }}
              </p>
              <div class="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                <span>{{ formatFileSize(file.size) }}</span>
                <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                  {{ file.type.split('/')[1]?.toUpperCase() || 'FILE' }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Upload Progress -->
          <div v-if="uploadProgress[index] !== undefined" class="flex items-center space-x-2 ml-4">
            <div class="w-16 text-xs text-gray-500">
              {{ uploadProgress[index] }}%
            </div>
            <UProgress 
              :value="uploadProgress[index]" 
              class="w-20"
              :color="uploadProgress[index] === 100 ? 'success' : 'primary'"
            />
            <UIcon 
              v-if="uploadProgress[index] === 100"
              name="i-heroicons-check-circle" 
              class="h-5 w-5 text-green-500" 
            />
          </div>
          
          <!-- Remove Button -->
          <UButton 
            v-else
            @click="removeFile(index)"
            variant="ghost" 
            size="sm"
            color="error"
            class="ml-4"
          >
            <UIcon name="i-heroicons-x-mark" />
          </UButton>
        </div>
      </div>

      <!-- Upload Actions -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <UButton
          @click="uploadFiles"
          :disabled="!selectedFolder || selectedFiles.length === 0 || isUploading"
          :loading="isUploading"
          size="lg"
          class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <UIcon name="i-heroicons-cloud-arrow-up" class="mr-2" />
          Subir {{ selectedFiles.length }} archivo{{ selectedFiles.length !== 1 ? 's' : '' }}
        </UButton>
        
        <UButton
          @click="clearFiles"
          variant="outline"
          size="lg"
          :disabled="isUploading"
          class="sm:w-auto"
        >
          <UIcon name="i-heroicons-x-mark" class="mr-2" />
          Cancelar
        </UButton>
      </div>

      <!-- Upload Summary -->
      <div v-if="uploadSummary.total > 0" class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="flex items-center space-x-2 mb-2">
          <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-blue-600" />
          <h5 class="font-medium text-blue-800 dark:text-blue-200">
            Resumen de subida
          </h5>
        </div>
        <div class="grid grid-cols-3 gap-4 text-sm">
          <div class="text-center">
            <p class="font-semibold text-blue-600">{{ uploadSummary.total }}</p>
            <p class="text-blue-500">Total</p>
          </div>
          <div class="text-center">
            <p class="font-semibold text-green-600">{{ uploadSummary.success }}</p>
            <p class="text-green-500">Exitosos</p>
          </div>
          <div class="text-center">
            <p class="font-semibold text-red-600">{{ uploadSummary.failed }}</p>
            <p class="text-red-500">Fallidos</p>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  folderOptions?: Array<{label: string, value: string}>
  foldersLoading?: boolean
}

interface Emits {
  (e: 'upload-complete', files: File[]): void
  (e: 'upload-progress', progress: {file: File, progress: number}): void
}

const props = withDefaults(defineProps<Props>(), {
  folderOptions: () => [],
  foldersLoading: false
})

const emit = defineEmits<Emits>()
const toast = useToast()

// Reactive state
const selectedFolder = ref('')
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref<Record<number, number>>({})
const uploadSummary = ref({
  total: 0,
  success: 0,
  failed: 0
})

// Refs
const fileInput = ref<HTMLInputElement>()

// Methods
function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  if (!event.relatedTarget || !(event.currentTarget as Element).contains(event.relatedTarget as Node)) {
    isDragging.value = false
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
  }
}

function addFiles(files: File[]) {
  // Filter valid files
  const validFiles = files.filter(file => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ]
    
    if (!validTypes.includes(file.type)) {
      toast.add({
        title: 'Tipo de archivo no válido',
        description: `${file.name} no es un tipo de archivo permitido`,
        color: 'warning'
      })
      return false
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.add({
        title: 'Archivo muy grande',
        description: `${file.name} supera el límite de 10MB`,
        color: 'warning'
      })
      return false
    }
    
    return true
  })
  
  // Add to selected files (avoid duplicates)
  const newFiles = validFiles.filter(file => 
    !selectedFiles.value.some(existing => 
      existing.name === file.name && existing.size === file.size
    )
  )
  
  selectedFiles.value.push(...newFiles)
  
  if (newFiles.length > 0) {
    toast.add({
      title: 'Archivos agregados',
      description: `${newFiles.length} archivo(s) listos para subir`,
      color: 'success'
    })
  }
}

function removeFile(index: number) {
  selectedFiles.value.splice(index, 1)
  delete uploadProgress.value[index]
}

function clearFiles() {
  selectedFiles.value = []
  uploadProgress.value = {}
  uploadSummary.value = { total: 0, success: 0, failed: 0 }
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function uploadFiles() {
  if (!selectedFolder.value || selectedFiles.value.length === 0) return
  
  isUploading.value = true
  uploadSummary.value = {
    total: selectedFiles.value.length,
    success: 0,
    failed: 0
  }
  
  try {
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i]
      
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          uploadProgress.value[i] = progress
          emit('upload-progress', { file, progress })
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        uploadSummary.value.success++
      } catch (error) {
        console.error(`Error uploading ${file?.name}:`, error)
        uploadSummary.value.failed++
        uploadProgress.value[i] = -1 // Error state
      }
    }
    
    emit('upload-complete', selectedFiles.value)
    
    toast.add({
      title: 'Subida completada',
      description: `${uploadSummary.value.success} archivo(s) subido(s) exitosamente`,
      color: 'success'
    })
    
    // Clear files after successful upload
    setTimeout(() => {
      clearFiles()
    }, 3000)
    
  } catch (error) {
    toast.add({
      title: 'Error en la subida',
      description: 'Ocurrió un error durante la subida de archivos',
      color: 'error'
    })
  } finally {
    isUploading.value = false
  }
}

function getFileIcon(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'i-heroicons-document-text'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'i-heroicons-document'
  if (mimeType.includes('excel') || mimeType.includes('sheet')) return 'i-heroicons-table-cells'
  if (mimeType.includes('image')) return 'i-heroicons-photo'
  return 'i-heroicons-document'
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script> 