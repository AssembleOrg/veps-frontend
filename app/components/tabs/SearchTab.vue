<template>
  <div class="space-y-4">
    <div class="space-y-6">
      <!-- Folders Grid -->
      <div v-if="visibleFolders">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Carpetas ({{ folders.length }})
          </h3>
          <UButton @click="loadFolders" variant="outline" size="sm">
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
            Actualizar
          </UButton>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            v-for="folder in displayedFolders"
            :key="folder"
            class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 cursor-pointer"
            @click="loadFolderContents(folder)"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-folder" class="w-6 h-6 text-blue-600" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 dark:text-white truncate">
                  {{ folder }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Carpeta VEP
                </p>
              </div>
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Folder Contents -->
      <div v-if="displayedSelectedFolderContents">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ selectedFolderName }} ({{ displayedSelectedFolderContents?.totalCount || 0 }} elementos)
          </h3>
          <UButton @click="$emit('close-folder')" variant="outline" size="sm">
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
            Cerrar
          </UButton>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-4 border-b border-gray-100 dark:border-gray-700">
            <UInput 
              :model-value="folderSearchTerm" 
              @update:model-value="$emit('update:folderSearchTerm', $event)"
              placeholder="Buscar dentro de la carpeta..." 
              icon="i-heroicons-magnifying-glass" 
            />
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div
              v-for="item in filteredFolderItems"
              :key="item.key"
              class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <UIcon
                  :name="item.type === 'file' ? 'i-heroicons-document-text' : 'i-heroicons-folder'"
                  :class="item.type === 'file' ? 'text-gray-500' : 'text-blue-500'"
                  class="w-5 h-5 flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 dark:text-white truncate">
                      {{ item.name }}
                    </p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span v-if="item.size">
                      {{ formatFileSize(item.size) }}
                    </span>
                    <span v-if="item.lastModified">
                      {{ formatDate(item.lastModified) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <UButton
                  v-if="item.type === 'file'"
                  variant="ghost"
                  size="sm"
                  @click="$emit('open-viewer', item)"
                  title="Previsualizar"
                >
                  <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                </UButton>

                <UButton
                  v-if="item.type === 'file'"
                  variant="ghost"
                  size="sm"
                  @click="$emit('download-file', item)"
                  title="Descargar"
                >
                  <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
                </UButton>

                <UButton
                  v-if="item.type === 'file'"
                  variant="ghost"
                  size="sm"
                  @click="$emit('prepare-rename', item)"
                  title="Renombrar"
                >
                  <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="visibleSearchResults">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Resultados de búsqueda ({{ searchResults.length }})
        </h3>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="max-h-96 overflow-y-auto">
            <div
              v-for="result in displayedSearchResults"
              :key="result.key"
              class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <UIcon
                  :name="result.type === 'file' ? 'i-heroicons-document-text' : 'i-heroicons-folder'"
                  :class="result.type === 'file' ? 'text-gray-500' : 'text-blue-500'"
                  class="w-5 h-5 flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 dark:text-white truncate">
                    {{ result.name }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {{ result.key }}
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <UButton
                  v-if="result.type === 'file'"
                  variant="ghost"
                  size="sm"
                  @click="$emit('open-viewer', result)"
                  title="Previsualizar"
                >
                  <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                </UButton>

                <UButton
                  v-if="result.type === 'file'"
                  variant="ghost"
                  size="sm"
                  @click="$emit('download-file', result)"
                  title="Descargar"
                >
                  <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="visibleShowEmpty" class="text-center py-12">
        <UIcon name="i-heroicons-folder-open" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No hay resultados
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          No se encontraron carpetas o archivos.
        </p>
        <UButton @click="loadFolders" variant="outline">
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
          Cargar carpetas
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FolderItem, FolderContents } from '~/types/api'

// Props
interface Props {
  folders: string[]
  displayedFolders: string[]
  selectedFolderName: string
  displayedSelectedFolderContents: FolderContents | null
  filteredFolderItems: FolderItem[]
  folderSearchTerm: string
  searchResults: FolderItem[]
  displayedSearchResults: FolderItem[]
  visibleFolders: boolean
  visibleSearchResults: boolean
  visibleShowEmpty: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'load-folders': []
  'load-folder-contents': [folder: string]
  'close-folder': []
  'update:folderSearchTerm': [value: string]
  'open-viewer': [item: FolderItem]
  'download-file': [item: FolderItem]
  'prepare-rename': [item: FolderItem]
}>()

// Methods
function loadFolders() {
  emit('load-folders')
}

function loadFolderContents(folder: string) {
  emit('load-folder-contents', folder)
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
