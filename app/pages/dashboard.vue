<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile-first Header -->
    <header class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <!-- Logo Section -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-building-office-2" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                VEP Manager
              </h1>
              <p class="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                Sistema Contable
              </p>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-2">
            <!-- Mobile Menu Button -->
            <UButton
              variant="ghost"
              size="sm"
              class="sm:hidden"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
            </UButton>

            <!-- Desktop User Menu -->
            <UDropdownMenu 
              :items="userMenuItems"
              class="hidden sm:block"
            >
              <template #default="{ open }">
                <UButton variant="ghost" class="flex items-center space-x-2">
                  <UAvatar 
                    :src="`https://ui-avatars.com/api/?name=Usuario&background=3b82f6&color=ffffff`"
                    alt="Usuario"
                    size="sm"
                  />
                  <span class="hidden md:block text-sm font-medium">{{ user?.email || 'Usuario' }}</span>
                  <UIcon 
                    name="i-heroicons-chevron-down" 
                    class="w-4 h-4 transition-transform"
                    :class="{ 'rotate-180': open }"
                  />
                </UButton>
              </template>
            </UDropdownMenu>
            <!-- Fallback explicit logout button for desktop to ensure signOut() is reachable -->
            <!-- <UButton v-if="!mobileMenuOpen" variant="ghost" class="ml-2 hidden md:flex items-center" @click="(async () => { console.log('desktop explicit signout clicked'); await signOut() })()">
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-2" />
              Cerrar sesión
            </UButton> -->
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen" 
        class="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="px-4 py-3 space-y-2">
          <div class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <UAvatar 
              :src="`https://ui-avatars.com/api/?name=Usuario&background=3b82f6&color=ffffff`"
              alt="Usuario"
              size="sm"
            />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ user?.email || 'Usuario' }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Contador VEP</p>
            </div>
          </div>
          <UButton
            variant="ghost"
            class="w-full justify-start"
            @click="(async () => { console.log('mobile menu signout clicked'); await signOut(); mobileMenuOpen = false })()"
          >
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-2" />
            Cerrar Sesión
          </UButton>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Page Title -->
      <div class="mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gestión de VEPs
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Administra carpetas y archivos de Volantes Electrónicos de Pago
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UIcon name="i-heroicons-folder" class="w-5 h-5 text-blue-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">Carpetas</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ totalFolders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <UIcon name="i-heroicons-document" class="w-5 h-5 text-green-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">Archivos</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ totalFiles }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <UIcon name="i-heroicons-cloud-arrow-up" class="w-5 h-5 text-purple-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">Subidos</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ uploadedFiles }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <div class="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-orange-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">Recientes</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{{ recentFiles }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Tabs -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-3 sm:px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === tab.id
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            <UIcon :name="tab.icon" class="w-4 h-4 mr-2 inline" />
            <span class="hidden sm:inline">{{ tab.label }}</span>
            <span class="sm:hidden">{{ tab.shortLabel }}</span>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="space-y-6">
        <!-- Create Folder Tab -->
        <div v-if="activeTab === 'create'" class="space-y-4">
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

        <!-- Search Tab -->
        <div v-if="activeTab === 'search'" class="space-y-4">
          <div v-if="activeTab === 'search'" class="space-y-6">
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

            <div v-if="activeTab === 'search' && displayedSelectedFolderContents">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ selectedFolderName }} ({{ displayedSelectedFolderContents?.totalCount || 0 }} elementos)
                </h3>
                <UButton @click="selectedFolderContents = null" variant="outline" size="sm">
                  <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
                  Cerrar
                </UButton>
              </div>

              <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                  <UInput v-model="folderSearchTerm" placeholder="Buscar dentro de la carpeta..." icon="i-heroicons-magnifying-glass" />
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
                        @click="openViewer(item)"
                        title="Previsualizar"
                      >
                        <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                      </UButton>

                      <UButton
                        v-if="item.type === 'file'"
                        variant="ghost"
                        size="sm"
                        @click="downloadFile(item)"
                        title="Descargar"
                      >
                        <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
                      </UButton>

                      <UButton
                        v-if="item.type === 'file'"
                        variant="ghost"
                        size="sm"
                        @click="prepareRename(item)"
                        title="Renombrar"
                      >
                        <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                        @click="openViewer(result)"
                        title="Previsualizar"
                      >
                        <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                      </UButton>

                      <UButton
                        v-if="result.type === 'file'"
                        variant="ghost"
                        size="sm"
                        @click="downloadFile(result)"
                        title="Descargar"
                      >
                        <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

        <div v-if="activeTab === 'upload'" class="space-y-4">
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
                  v-model="uploadForm.targetFolder"
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
                        @click="($refs.fileInput as HTMLInputElement)?.click()" 
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
                    @click="clearFiles" 
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
                      @click="removeFile(index)"
                      variant="ghost" 
                      size="sm"
                      color="error"
                    >
                      <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                    </UButton>
                  </div>
                </div>

                <UButton
                  @click="uploadFiles"
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

        <!-- QR Tab -->
        <div v-if="activeTab === 'qr'" class="space-y-4">
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
                  @click="showQrConfirmation = true"
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
      </div>


      <!-- Rename Modal (moved inside main template) -->
      <div v-if="showRenameModal" class="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Renombrar archivo</h3>
          <div class="space-y-3">
            <label class="text-sm text-gray-500 dark:text-gray-400">Carpeta</label>
            <div class="text-sm text-gray-700 dark:text-gray-300 mb-2 truncate">{{ renameForm.folderPrefix ? renameForm.folderPrefix + '/' : '' }}</div>
            <label class="text-sm text-gray-500 dark:text-gray-400">Nombre de archivo</label>
            <textarea v-model="renameForm.newKey" rows="2" class="w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700 text-sm"></textarea>
            <p v-if="renameError" class="text-sm text-red-500 mt-1">{{ renameError }}</p>
          </div>
          <div class="mt-4 flex justify-end space-x-3">
            <UButton variant="ghost" @click="showRenameModal = false">Cancelar</UButton>
            <UButton @click="confirmRename" :loading="renameLoading" :disabled="!!renameError">Guardar</UButton>
          </div>
        </div>
        <!-- File Viewer Modal -->
        <div v-if="showViewer" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4" style="z-index: 9999 !important;">
          <!-- Debug info -->
          <div class="absolute top-4 left-4 bg-red-500 text-white p-2 rounded text-xs z-[10000]">
            showViewer: {{ showViewer }}, viewerBlobUrl: {{ !!viewerBlobUrl }}, fileName: {{ viewerFileName }}
          </div>
          <!-- Simplified modal for debugging -->
          <div class="bg-white rounded-lg p-6 max-w-md">
            <h3 class="text-lg font-bold mb-4">Modal de Prueba</h3>
            <p>Archivo: {{ viewerFileName }}</p>
            <p>Tipo: {{ viewerFileType }}</p>
            <p>Blob URL: {{ viewerBlobUrl ? 'Sí' : 'No' }}</p>
            <div class="mt-4">
              <button @click="closeViewer" class="bg-blue-500 text-white px-4 py-2 rounded">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- File Viewer Modal - Moved outside main -->
    <div v-if="showViewer" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4" style="z-index: 9999 !important;">
      <div class="bg-white dark:bg-gray-900 rounded-lg w-full max-w-5xl h-[80vh] overflow-hidden flex flex-col">
        <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-document" class="w-5 h-5 text-gray-500" />
            <div class="min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ viewerFileName }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ viewerFileType || '' }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UButton variant="ghost" size="sm" @click="downloadViewerFile">
              <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
            </UButton>
            <UButton variant="ghost" size="sm" @click="closeViewer">Cerrar</UButton>
          </div>
        </div>

        <div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800 overflow-auto">
          <template v-if="viewerBlobUrl">
            <!-- PDF and other embeddable types -->
            <iframe v-if="isPdf(viewerFileName)" :src="viewerBlobUrl" class="w-full h-full" />

            <!-- Images -->
            <img v-else-if="isImage(viewerFileName)" :src="viewerBlobUrl" class="max-w-full max-h-full object-contain" />

            <!-- Text/JSON/XML -->
            <pre v-else-if="isText(viewerFileName)" class="whitespace-pre-wrap p-4 text-sm overflow-auto w-full h-full">{{ viewerText }}</pre>

            <!-- Fallback: show download link -->
            <div v-else class="p-4 text-center">
              <p class="mb-3 text-gray-600 dark:text-gray-400">Previsualización no disponible para este tipo de archivo.</p>
              <UButton @click="downloadViewerFile">Descargar archivo</UButton>
            </div>
          </template>
          <div v-else class="p-6 text-sm text-gray-500 dark:text-gray-400">Cargando...</div>
        </div>
      </div>
    </div>

    <!-- QR Confirmation Modal -->
    <div v-if="showQrConfirmation" class="fixed inset-0 z-70 flex items-center justify-center bg-black/50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div class="text-center">
          <div class="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Confirmar Conexión WhatsApp
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            ¿Vas a abrir una conexión vía WhatsApp? ¿Estás seguro?
          </p>
          <div class="flex space-x-3">
            <UButton
              @click="cancelQrGeneration"
              variant="outline"
              class="flex-1"
            >
              Cancelar
            </UButton>
            <UButton
              @click="confirmQrGeneration"
              :loading="qrLoading"
              class="flex-1"
              color="green"
            >
              <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
              Confirmar
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code Display Modal -->
    <div v-if="showQrCode" class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Código QR WhatsApp
          </h3>
          <UButton variant="ghost" size="sm" @click="closeQrCode">
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
          </UButton>
        </div>
        
        <div class="p-6 text-center">
          <div v-if="qrImageUrl" class="mb-4">
            <img 
              :src="qrImageUrl" 
              alt="Código QR para WhatsApp"
              class="mx-auto max-w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Escanea este código con WhatsApp para establecer la conexión
          </p>
          <UButton @click="closeQrCode" variant="outline" class="w-full">
            Cerrar
          </UButton>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useVepApi } from '~/composables/useVepApi'
import { useAuth } from '../composables/useAuth'
import type { FolderContents, FolderItem } from '~/types/api'

// Page meta
definePageMeta({
  middleware: 'auth'
})

// Composables
const vepApi = useVepApi()
const toast = useToast()
const { signOut, user } = useAuth()

// Mobile menu state
const mobileMenuOpen = ref(false)
const showLogoutModal = ref(false)
const showRenameModal = ref(false)
const showQrConfirmation = ref(false)
const showQrCode = ref(false)
const qrImageUrl = ref<string | null>(null)
const qrLoading = ref(false)

// Tab system
const activeTab = ref('create')
const tabs = [
  { id: 'create', label: 'Crear Carpeta', shortLabel: 'Crear', icon: 'i-heroicons-folder-plus' },
  { id: 'search', label: 'Buscar', shortLabel: 'Buscar', icon: 'i-heroicons-magnifying-glass' },
  { id: 'upload', label: 'Subir Archivos', shortLabel: 'Subir', icon: 'i-heroicons-cloud-arrow-up' },
  { id: 'qr', label: 'QR', shortLabel: 'QR', icon: 'i-heroicons-qr-code' }
]

// User menu
const userMenuItems = [
  [{
    label: 'Perfil',
    icon: 'i-heroicons-user-circle',
    click: () => console.log('Profile')
  }, {
    label: 'Configuración',
    icon: 'i-heroicons-cog-6-tooth',
    click: () => console.log('Settings')
  }],
  [{
    label: 'Cerrar Sesión',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    onClick: async () => { console.log('user menu signout clicked'); await signOut() }
  }]
]

// Stats
const totalFolders = ref(0)
const totalFiles = ref(0)
const uploadedFiles = ref(0)
const recentFiles = ref(0)

// Form states
const allowedTypes = ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'JPG', 'PNG']

// Month options - formato correcto para USelect
const monthOptions = [
  { label: 'Enero', value: 'Enero' },
  { label: 'Febrero', value: 'Febrero' },
  { label: 'Marzo', value: 'Marzo' },
  { label: 'Abril', value: 'Abril' },
  { label: 'Mayo', value: 'Mayo' },
  { label: 'Junio', value: 'Junio' },
  { label: 'Julio', value: 'Julio' },
  { label: 'Agosto', value: 'Agosto' },
  { label: 'Septiembre', value: 'Septiembre' },
  { label: 'Octubre', value: 'Octubre' },
  { label: 'Noviembre', value: 'Noviembre' },
  { label: 'Diciembre', value: 'Diciembre' }
]

// Form states
const createForm = reactive({
  month: monthOptions[new Date().getMonth()]?.value || 'Enero',
  year: new Date().getFullYear()
})

const searchForm = reactive({
  term: '',
  folder: null as string | null
})

const uploadForm = reactive({
  targetFolder: null as string | null
})

const renameForm = reactive({
  oldKey: '',
  newKey: '',
  folderPrefix: null as string | null,
  baseName: ''
})

const allowedRenameExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif']

function sanitizeBaseName(name: string) {
  // Trim, collapse spaces, remove path separators
  return name.trim().replace(/\s+/g, ' ').replace(/[\\/]+/g, '')
}

// Auto-sanitize user input as they type
watch(() => renameForm.newKey, (val, old) => {
  if (typeof val !== 'string') return
  const cleaned = sanitizeBaseName(val)
  if (cleaned !== val) {
    // update without creating infinite loop (only when different)
    renameForm.newKey = cleaned
  }
})

const renameError = computed(() => {
  const name = (renameForm.newKey || '').trim()
  if (!name) return 'El nombre no puede estar vacío'

  // Prevent path separators
  if (/[\\/]/.test(name)) return 'El nombre no puede contener \\ ni /'

  const parts: string[] = name.split('.')
  if (parts.length < 2) return 'El archivo debe incluir extensión (por ejemplo .pdf)'
  const ext = (parts[parts.length - 1] || '').toLowerCase()
  if (!allowedRenameExtensions.includes(ext)) return `Extensión no permitida: .${ext}`

  // Duplicate check if folder contents loaded
  if (selectedFolderContents.value) {
    const exists = selectedFolderContents.value.items.some(it => it.name === name && it.key !== renameForm.oldKey)
    if (exists) return 'Ya existe un archivo con ese nombre en la carpeta'
  }

  return ''
})

// Loading states
const createLoading = ref(false)
const searchLoading = ref(false)
const renameLoading = ref(false)
const foldersLoading = ref(false)
const isUploading = ref(false)

// Data states
const folders = ref<string[]>([])
const folderOptions = ref<Array<{label: string, value: string | null}>>([])
const selectedFolderContents = ref<FolderContents | null>(null)
const selectedFolderName = ref('')
const searchResults = ref<FolderItem[]>([])
const previewFolderName = ref('')
const showResults = ref(false)

// In-folder search (client-side)
const folderSearchTerm = ref('')
const filteredFolderItems = computed(() => {
  const term = folderSearchTerm.value.trim().toLowerCase()
  if (!term || !selectedFolderContents.value) return selectedFolderContents.value?.items || []
  return selectedFolderContents.value.items.filter(it => {
    return it.name.toLowerCase().includes(term) || (it.key && it.key.toLowerCase().includes(term))
  })
})

// Computed visibility to ensure results render only in Search tab
const visibleSearchResults = computed(() => activeTab.value === 'search' && searchResults.value.length > 0)
const visibleFolders = computed(() => activeTab.value === 'search' && folders.value.length > 0 && searchResults.value.length === 0 && !selectedFolderContents.value)
const visibleShowEmpty = computed(() => activeTab.value === 'search' && showResults.value && !folders.value.length && !selectedFolderContents.value && !searchResults.value.length)

// Displayed collections (empty when not in search tab) to avoid accidental rendering
const displayedSearchResults = computed(() => (activeTab.value === 'search' ? searchResults.value : []))
const displayedFolders = computed(() => (activeTab.value === 'search' ? folders.value : []))
const displayedSelectedFolderContents = computed(() => (activeTab.value === 'search' ? selectedFolderContents.value : null))

// File upload states
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
// Year options - formato correcto para USelect
const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 11 }, (_, i) => {
  const year = currentYear - 5 + i
  return { label: year.toString(), value: year }
})

// Watchers
watch(activeTab, async (newTab, oldTab) => {
  console.log('[debug] activeTab change:', { newTab, oldTab, folders: folders.value.length, folderOptions: folderOptions.value.length, showResults: showResults.value, searchResults: searchResults.value.length })

  // Limpiar solo el estado de búsqueda cuando se sale de la pestaña Search
  if (newTab !== 'search') {
    showResults.value = false
    searchResults.value = []
    selectedFolderContents.value = null
    selectedFolderName.value = ''
    // NO vaciar `folders` porque otros tabs (upload) dependen de esta lista
  }

  // Si entramos a la pestaña de upload y no tenemos carpetas, cargarlas
  if (newTab === 'upload' && (!folders.value.length || !folderOptions.value.length)) {
    try {
      await loadFolders()
    } catch (e) {
      // Silenciar; loadFolders ya notifica con toast en caso de error
    }
  }
})

watch([() => createForm.month, () => createForm.year], async ([month, year]) => {
  if (month && year) {
    try {
      // Convertir nombre de mes a número para la API
      const monthNumber = monthOptions.findIndex(m => m.value === month) + 1
      const nameInfo = await vepApi.generateFolderName(monthNumber, year)
      previewFolderName.value = nameInfo.folderName
    } catch (error) {
      previewFolderName.value = ''
    }
  }
}, { immediate: true })

// Methods
async function logout() {
  try {
    console.log('logout() called - delegating to signOut()')
    await signOut()
    toast.add({
      title: 'Sesión cerrada',
      description: 'Has cerrado sesión exitosamente',
      color: 'success'
    })
  } catch (error) {
    console.error('Error signing out:', error)
    toast.add({
      title: 'Error',
      description: 'Error al cerrar sesión',
      color: 'error'
    })
  }
}

async function handleCreateFolder() {
  createLoading.value = true
  
  try {
    // Convertir nombre de mes a número para la API
    const monthNumber = monthOptions.findIndex(m => m.value === createForm.month) + 1
    const result = await vepApi.createFolderSafely(monthNumber, createForm.year)
    
    if (result.success) {
      toast.add({
        title: 'Carpeta creada',
        description: result.message,
        color: 'success'
      })
      
      createForm.month = monthOptions[new Date().getMonth()]?.value || 'Enero'
      createForm.year = new Date().getFullYear()
      await loadFolders()
    } else {
      toast.add({
        title: 'Carpeta ya existe',
        description: result.message,
        color: 'warning'
      })
    }
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Error al crear carpeta',
      color: 'error'
    })
  } finally {
    createLoading.value = false
  }
}

async function loadFolders() {
  foldersLoading.value = true
  
  try {
    const response = await vepApi.listAllFolders()
    folders.value = response.folders
    totalFolders.value = response.totalCount
    
    folderOptions.value = [
      { label: 'Todas las carpetas', value: null },
      ...response.folders.map(folder => ({ label: folder, value: folder }))
    ]
    
    // Solo mostrar resultados si estamos en la pestaña de búsqueda
    if (activeTab.value === 'search') {
      showResults.value = true
    }
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Error al cargar carpetas',
      color: 'error'
    })
  } finally {
    foldersLoading.value = false
  }
}

async function loadFolderContents(folderName: string) {
  try {
    const contents = await vepApi.getFolderContents(folderName)
    selectedFolderContents.value = contents
    selectedFolderName.value = folderName
    
    const fileCount = contents.items.filter(item => item.type === 'file').length
    totalFiles.value = fileCount
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Error al cargar contenido',
      color: 'error'
    })
  }
}

async function handleSearch() {
  if (!searchForm.term.trim()) return
  
  searchLoading.value = true
  
  try {
    const response = await vepApi.searchFiles(searchForm.term, searchForm.folder || undefined)
    searchResults.value = response.files
    showResults.value = true
    
    toast.add({
      title: 'Búsqueda completada',
      description: `Encontrados ${response.totalCount} resultados`,
      color: 'success'
    })
  } catch (error: any) {
    toast.add({
      title: 'Error en búsqueda',
      description: error.message || 'Error al buscar archivos',
      color: 'error'
    })
  } finally {
    searchLoading.value = false
  }
}

function clearSearch() {
  searchForm.term = ''
  searchForm.folder = ''
  searchResults.value = []
  selectedFolderContents.value = null
  showResults.value = false
}

function prepareRename(item: FolderItem) {
  // Split folder prefix and base filename
  renameForm.oldKey = item.key
  const idx = item.key.lastIndexOf('/')
  if (idx !== -1) {
    renameForm.folderPrefix = item.key.substring(0, idx)
    renameForm.baseName = item.key.substring(idx + 1)
  } else {
    renameForm.folderPrefix = null
    renameForm.baseName = item.key
  }
  renameForm.newKey = renameForm.baseName
  // Open modal to rename inline instead of switching to the Manage tab
  showRenameModal.value = true
}

async function handleRenameFile() {
  if (!renameForm.oldKey.trim() || !renameForm.newKey.trim()) return
  
  renameLoading.value = true
  
  try {
    const result = await vepApi.renameFile(renameForm.oldKey, renameForm.newKey)
    
    toast.add({
      title: 'Archivo renombrado',
      description: result.message,
      color: 'success'
    })
    
    renameForm.oldKey = ''
    renameForm.newKey = ''
    
    if (selectedFolderContents.value) {
      await loadFolderContents(selectedFolderName.value)
    }
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Error al renombrar archivo',
      color: 'error'
    })
  } finally {
    renameLoading.value = false
  }
}

async function confirmRename() {
  if (!renameForm.oldKey.trim() || !renameForm.newKey.trim()) return

  // Build the full destination key (keep folder prefix hidden)
  const destination = renameForm.folderPrefix ? `${renameForm.folderPrefix}/${renameForm.newKey}` : renameForm.newKey

  renameLoading.value = true
  try {
    const result = await vepApi.renameFile(renameForm.oldKey, destination)
    toast.add({ title: 'Archivo renombrado', description: result.message, color: 'success' })

    // Update UI: if we had folder contents loaded, refresh
    if (selectedFolderContents.value) {
      await loadFolderContents(selectedFolderName.value)
    }

    // Close modal and clear form
    showRenameModal.value = false
    renameForm.oldKey = ''
    renameForm.newKey = ''
  } catch (error: any) {
    toast.add({ title: 'Error', description: error.message || 'Error al renombrar archivo', color: 'error' })
  } finally {
    renameLoading.value = false
  }
}

// File upload methods
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
}

function clearFiles() {
  selectedFiles.value = []
}

async function uploadFiles() {
  if (!uploadForm.targetFolder || selectedFiles.value.length === 0) return
  
  isUploading.value = true
  
  try {
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.add({
      title: 'Archivos subidos',
      description: `${selectedFiles.value.length} archivo(s) subido(s) exitosamente`,
      color: 'success'
    })
    
    uploadedFiles.value += selectedFiles.value.length
    clearFiles()
    
    if (selectedFolderContents.value) {
      await loadFolderContents(selectedFolderName.value)
    }
  } catch (error: any) {
    toast.add({
      title: 'Error en la subida',
      description: 'Error al subir archivos',
      color: 'error'
    })
  } finally {
    isUploading.value = false
  }
}

// Utility functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Initialize
onMounted(() => {
  loadFolders()
  // Set initial stats
  recentFiles.value = 12
})

// --- File viewer state & helpers ---
const showViewer = ref(false)
const viewerBlobUrl = ref<string | null>(null)
const viewerBlob = ref<Blob | null>(null)
const viewerFileName = ref('')
const viewerFileType = ref('')
const viewerText = ref('')


function isPdf(name: string) {
  return name?.toLowerCase().endsWith('.pdf')
}

function isImage(name: string) {
  return /\.(jpg|jpeg|png|gif)$/i.test(name || '')
}

function isText(name: string) {
  return /\.(txt|json|xml)$/i.test(name || '')
}

async function openViewer(item: FolderItem) {
  // Determine key and filename
  const key = item.key
  const fileName = item.name || key.split('/').pop() || 'archivo'

  viewerFileName.value = fileName
  viewerFileType.value = ''
  viewerText.value = ''
  viewerBlob.value = null
  if (viewerBlobUrl.value) {
    URL.revokeObjectURL(viewerBlobUrl.value)
    viewerBlobUrl.value = null
  }

  showViewer.value = true

  try {
    // Prefer download-by-key endpoint
    const blob = await vepApi.downloadFileByKey(key)
    
    viewerBlob.value = blob
    viewerFileType.value = blob.type || ''
    viewerBlobUrl.value = URL.createObjectURL(blob)

    if (isText(fileName)) {
      // Read text content
      try {
        viewerText.value = await blob.text()
      } catch (e) {
        viewerText.value = 'No se pudo leer el contenido como texto.'
      }
    }
  } catch (error: any) {
    toast.add({ title: 'Error', description: error.message || 'No se pudo obtener el archivo', color: 'error' })
    showViewer.value = false
  }
}

function closeViewer() {
  showViewer.value = false
  if (viewerBlobUrl.value) {
    URL.revokeObjectURL(viewerBlobUrl.value)
    viewerBlobUrl.value = null
  }
  viewerBlob.value = null
  viewerFileName.value = ''
  viewerFileType.value = ''
  viewerText.value = ''
}

async function downloadFile(item: FolderItem) {
  try {
    const key = item.key
    const fileName = item.name || key.split('/').pop() || 'archivo'
    // Use download by key
    const blob = await vepApi.downloadFileByKey(key)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (error: any) {
    toast.add({ title: 'Error', description: error.message || 'Error descargando archivo', color: 'error' })
  }
}

async function downloadViewerFile() {
  if (!viewerBlob.value) {
    toast.add({ title: 'Error', description: 'No hay archivo cargado para descargar', color: 'error' })
    return
  }

  try {
    const url = URL.createObjectURL(viewerBlob.value)
    const a = document.createElement('a')
    a.href = url
    a.download = viewerFileName.value || 'archivo'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (error: any) {
    toast.add({ title: 'Error', description: 'Error descargando archivo', color: 'error' })
  }
}

// QR Code functions
async function confirmQrGeneration() {
  showQrConfirmation.value = false
  qrLoading.value = true
  
  try {
    const qrBlob = await vepApi.getQrCode()
    
    // Clean up previous URL if exists
    if (qrImageUrl.value) {
      URL.revokeObjectURL(qrImageUrl.value)
    }
    
    qrImageUrl.value = URL.createObjectURL(qrBlob)
    showQrCode.value = true
    
    toast.add({
      title: 'Código QR generado',
      description: 'El código QR está listo para ser escaneado',
      color: 'success'
    })
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Error al generar el código QR',
      color: 'error'
    })
  } finally {
    qrLoading.value = false
  }
}

function cancelQrGeneration() {
  showQrConfirmation.value = false
}

function closeQrCode() {
  showQrCode.value = false
  if (qrImageUrl.value) {
    URL.revokeObjectURL(qrImageUrl.value)
    qrImageUrl.value = null
  }
}
</script>