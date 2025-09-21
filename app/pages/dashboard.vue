<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile-first Header -->
    <header
      class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <!-- Logo Section -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-building-office-2"
                class="w-5 h-5 sm:w-6 sm:h-6 text-white"
              />
            </div>
            <div>
              <h1
                class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
              >
                VEP Manager
              </h1>
              <p
                class="hidden sm:block text-xs text-gray-500 dark:text-gray-400"
              >
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
            <UDropdownMenu :items="userMenuItems" class="hidden sm:block">
              <template #default="{ open }">
                <UButton variant="ghost" class="flex items-center space-x-2">
                  <UAvatar 
                    :src="`https://ui-avatars.com/api/?name=Usuario&background=3b82f6&color=ffffff`"
                    alt="Usuario"
                    size="sm"
                  />
                  <ClientOnly>
                    <span class="hidden md:block text-sm font-medium">{{
                      user?.email || "Usuario"
                    }}</span>
                    <template #fallback>
                      <span class="hidden md:block text-sm font-medium"
                        >Usuario</span
                      >
                    </template>
                  </ClientOnly>
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
          <div
            class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <UAvatar 
              :src="`https://ui-avatars.com/api/?name=Usuario&background=3b82f6&color=ffffff`"
              alt="Usuario"
              size="sm"
            />
            <div>
              <ClientOnly>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ user?.email || "Usuario" }}
                </p>
                <template #fallback>
                  <p class="font-medium text-gray-900 dark:text-white">
                    Usuario
                  </p>
                </template>
              </ClientOnly>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Contador VEP
              </p>
            </div>
          </div>
          <UButton
            variant="ghost"
            class="w-full justify-start"
            @click="
              (async () => {
                console.log('mobile menu signout clicked');
                await signOut();
                mobileMenuOpen = false;
              })()
            "
          >
            <UIcon
              name="i-heroicons-arrow-right-on-rectangle"
              class="w-4 h-4 mr-2"
            />
            Cerrar Sesión
          </UButton>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Page Title -->
      <div class="mb-6 sm:mb-8">
        <h2
          class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Gestión de VEPs
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Administra carpetas y archivos de Volantes Electrónicos de Pago
        </p>
      </div>

      <!-- Stats Cards -->
      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
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
      </div> -->

      <!-- Action Tabs -->
      <div class="mb-6">
        <div
          class="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-3 sm:px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === tab.id
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
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
        <CreateFolderTab
          v-if="activeTab === 'create'"
          :create-form="createForm"
          :create-loading="createLoading"
          :preview-folder-name="previewFolderName"
          :month-options="monthOptions"
          :year-options="yearOptions"
          @create-folder="handleCreateFolder"
          @update:create-form="createForm = $event"
        />

        <!-- Search Tab -->
        <SearchTab
          v-if="activeTab === 'search'"
          :folders="folders"
          :displayed-folders="displayedFolders"
          :selected-folder-name="selectedFolderName"
          :displayed-selected-folder-contents="displayedSelectedFolderContents"
          :filtered-folder-items="filteredFolderItems"
          :folder-search-term="folderSearchTerm"
          :search-results="searchResults"
          :displayed-search-results="displayedSearchResults"
          :visible-folders="visibleFolders"
          :visible-search-results="visibleSearchResults"
          :visible-show-empty="visibleShowEmpty"
          @load-folders="loadFolders"
          @load-folder-contents="loadFolderContents"
          @close-folder="selectedFolderContents = null"
          @update:folder-search-term="folderSearchTerm = $event"
          @open-viewer="openViewer"
          @download-file="downloadFile"
          @prepare-rename="prepareRename"
        />

        <!-- Upload Tab -->
        <UploadTab
          v-if="activeTab === 'upload'"
          :upload-form="uploadForm"
          :folder-options="folderOptions"
          :folders-loading="foldersLoading"
          :selected-files="selectedFiles"
          :is-uploading="isUploading"
          :allowed-types="allowedTypes"
          @update:upload-form="uploadForm = $event"
          @file-select="(files) => handleFileSelect({ target: { files } })"
          @clear-files="clearFiles"
          @remove-file="removeFile"
          @upload-files="uploadFiles"
        />

        <!-- Users Tab -->
        <UsersTab
          v-if="activeTab === 'users'"
          :users="users"
          :users-loading="usersLoading"
          :current-page="currentPage"
          :page-size="pageSize"
          :total-users="totalUsers"
          :total-pages="totalPages"
          :search-term="searchTerm"
          :search-field="searchField"
          :type-filter="typeFilter"
          :is-searching="isSearching"
          :search-field-options="searchFieldOptions"
          :type-filter-options="typeFilterOptions"
          :visible-pages="getVisiblePages()"
          @open-user-modal="openUserModal"
          @update:search-term="searchTerm = $event"
          @update:search-field="searchField = $event"
          @update:type-filter="typeFilter = $event"
          @handle-user-search="handleUserSearch"
          @clear-user-search="clearUserSearch"
          @confirm-delete="confirmDelete"
          @change-page="changePage"
        />

        <!-- Enviar VEPs Tab -->
        <EnviarTab
          v-if="activeTab === 'enviar'"
          @open-enviar-modal="openEnviarModal"
        />

        <!-- Job Times Tab -->
        <JobTimeTab
          v-if="activeTab === 'jobtimes'"
          :job-times="jobTimes"
          :job-times-loading="jobTimesLoading"
          :current-page="jobTimesCurrentPage"
          :page-size="jobTimesPageSize"
          :total-job-times="jobTimesTotalJobTimes"
          :total-pages="jobTimesTotalPages"
          :search-term="jobTimesSearchTerm"
          :search-field="jobTimesSearchField"
          :status-filter="jobTimesStatusFilter"
          :type-filter="jobTimesTypeFilter"
          :is-searching="jobTimesIsSearching"
          :search-field-options="jobTimesSearchFieldOptions"
          :status-filter-options="jobTimesStatusFilterOptions"
          :type-filter-options="jobTimesTypeFilterOptions"
          :page-size-options="pageSizeOptions"
          :visible-pages="getJobTimesVisiblePages()"
          @update:search-term="jobTimesSearchTerm = $event"
          @update:search-field="jobTimesSearchField = $event"
          @update:status-filter="jobTimesStatusFilter = $event"
          @update:type-filter="jobTimesTypeFilter = $event"
          @handle-job-time-search="handleJobTimeSearch"
          @clear-job-time-search="clearJobTimeSearch"
          @handle-page-size-change="handleJobTimesPageSizeChange"
          @change-page="changeJobTimesPage"
          @view-job-time="viewJobTime"
          @edit-job-time="editJobTime"
          @confirm-delete="confirmDeleteJobTime"
        />

        <!-- QR Tab -->
        <QrTab
          v-if="activeTab === 'qr'"
          @show-qr-confirmation="showQrConfirmation = true"
        />
      </div>

      <!-- Rename Modal (moved inside main template) -->
      <div
        v-if="showRenameModal"
        class="fixed inset-0 z-60 flex items-center justify-center bg-black/50"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Renombrar archivo
              </h3>
          <div class="space-y-3">
            <label class="text-sm text-gray-500 dark:text-gray-400"
              >Carpeta</label
            >
            <div class="text-sm text-gray-700 dark:text-gray-300 mb-2 truncate">
              {{ renameForm.folderPrefix ? renameForm.folderPrefix + "/" : "" }}
            </div>
            <label class="text-sm text-gray-500 dark:text-gray-400"
              >Nombre de archivo</label
            >
            <textarea
              v-model="renameForm.newKey"
              rows="2"
              class="w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700 text-sm"
            ></textarea>
            <p v-if="renameError" class="text-sm text-red-500 mt-1">
              {{ renameError }}
            </p>
          </div>
          <div class="mt-4 flex justify-end space-x-3">
            <UButton variant="ghost" @click="showRenameModal = false"
              >Cancelar</UButton
            >
            <UButton
              @click="confirmRename"
              :loading="renameLoading"
              :disabled="!!renameError"
              >Guardar</UButton
            >
          </div>
        </div>
        <!-- File Viewer Modal -->
        <div
          v-if="showViewer"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          style="z-index: 9999 !important"
        >
          <!-- Debug info -->
          <div
            class="absolute top-4 left-4 bg-red-500 text-white p-2 rounded text-xs z-[10000]"
          >
            showViewer: {{ showViewer }}, viewerBlobUrl: {{ !!viewerBlobUrl }},
            fileName: {{ viewerFileName }}
          </div>
          <!-- Simplified modal for debugging -->
          <div class="bg-white rounded-lg p-6 max-w-md">
            <h3 class="text-lg font-bold mb-4">Modal de Prueba</h3>
            <p>Archivo: {{ viewerFileName }}</p>
            <p>Tipo: {{ viewerFileType }}</p>
            <p>Blob URL: {{ viewerBlobUrl ? "Sí" : "No" }}</p>
            <div class="mt-4">
              <button
                @click="closeViewer"
                class="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- File Viewer Modal - Moved outside main -->
    <div
      v-if="showViewer"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      style="z-index: 9999 !important"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-lg w-full max-w-5xl h-[80vh] overflow-hidden flex flex-col"
      >
        <div
          class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-document" class="w-5 h-5 text-gray-500" />
            <div class="min-w-0">
              <p
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
              >
                {{ viewerFileName }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ viewerFileType || "" }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UButton variant="ghost" size="sm" @click="downloadViewerFile">
              <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
            </UButton>
            <UButton variant="ghost" size="sm" @click="closeViewer"
              >Cerrar</UButton
            >
          </div>
        </div>

        <div
          class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800 overflow-auto"
        >
          <template v-if="viewerBlobUrl">
            <!-- PDF and other embeddable types -->
            <iframe
              v-if="isPdf(viewerFileName)"
              :src="viewerBlobUrl"
              class="w-full h-full"
            />

            <!-- Images -->
            <img
              v-else-if="isImage(viewerFileName)"
              :src="viewerBlobUrl"
              class="max-w-full max-h-full object-contain"
            />

            <!-- Text/JSON/XML -->
            <pre
              v-else-if="isText(viewerFileName)"
              class="whitespace-pre-wrap p-4 text-sm overflow-auto w-full h-full"
              >{{ viewerText }}</pre
            >

            <!-- Fallback: show download link -->
            <div v-else class="p-4 text-center">
              <p class="mb-3 text-gray-600 dark:text-gray-400">
                Previsualización no disponible para este tipo de archivo.
              </p>
              <UButton @click="downloadViewerFile">Descargar archivo</UButton>
            </div>
            </template>
          <div v-else class="p-6 text-sm text-gray-500 dark:text-gray-400">
            Cargando...
          </div>
        </div>
      </div>
    </div>

    <!-- QR Confirmation Modal -->
    <div
      v-if="showQrConfirmation"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-md mx-4"
      >
        <div class="p-6 text-center">
          <div
            class="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4"
          >
            <UIcon
              name="i-heroicons-chat-bubble-left-right"
              class="w-8 h-8 text-blue-600 dark:text-blue-400"
            />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Confirmar Conexión WhatsApp
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            ¿Vas a abrir una conexión vía WhatsApp? ¿Estás seguro?
          </p>
          <div class="flex gap-3">
            <UButton
              @click="cancelQrGeneration"
              variant="outline"
              size="lg"
              class="flex-1"
            >
              Cancelar
            </UButton>
            <UButton
              @click="confirmQrGeneration"
              :loading="qrLoading"
              size="lg"
              class="flex-1"
            >
              <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
              Confirmar
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code Display Modal -->
    <div
      v-if="showQrCode"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-md overflow-hidden"
      >
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            Código QR WhatsApp
          </h3>
          <UButton variant="ghost" size="sm" @click="closeQrCode">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <div class="p-6 text-center">
          <div v-if="qrImageUrl" class="mb-6">
            <img
              :src="qrImageUrl"
              alt="Código QR para WhatsApp"
              class="mx-auto max-w-full h-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            />
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Escanea este código con WhatsApp para establecer la conexión
          </p>
          <UButton
            @click="closeQrCode"
            variant="outline"
            size="lg"
            class="w-full"
          >
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
            Cerrar
          </UButton>
        </div>
      </div>
    </div>

    <!-- User Modal (Create/Edit) -->
    <div
      v-if="showUserModal"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ editingUser ? "Editar Usuario" : "Crear Usuario" }}
          </h3>
          <UButton variant="ghost" size="sm" @click="closeUserModal">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <form @submit.prevent="handleSaveUser" class="p-6 space-y-6">
          <!-- Información básica -->
          <div class="space-y-4">
            <h4
              class="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              Información Básica
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nombre Alternativo <span class="text-red-500">*</span>
                </label>
                <UInput
                  v-model="userForm.alter_name"
                  placeholder="Juanito"
                  required
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nombre Real <span class="text-red-500">*</span>
                </label>
                <UInput
                  v-model="userForm.real_name"
                  placeholder="JUAN CARLOS PÉREZ"
                  required
                  @input="handleRealNameInput"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Teléfono Móvil <span class="text-red-500">*</span>
                </label>
                <UInput
                  v-model="userForm.mobile_number"
                  placeholder="5491123456789"
                  required
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  CUIT <span class="text-red-500">*</span>
                </label>
                <UInput
                  v-model="userForm.cuit"
                  placeholder="20-12345678-9"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Tipo <span class="text-red-500">*</span>
                  </label>
                  <USelect
                  v-model="userForm.type"
                  :items="['autónomo', 'credencial', 'monotributo']"
                  placeholder="Seleccionar tipo"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Configuración -->
          <div class="space-y-4">
            <h4
              class="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              Configuración
            </h4>

            <div class="flex items-center space-x-3">
              <UCheckbox v-model="userForm.is_group" :binary="true" />
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Es un grupo
              </label>
            </div>
          </div>

          <!-- Requerimientos -->
          <div class="space-y-4">
            <h4
              class="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              Requerimientos
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
                <UCheckbox v-model="userForm.need_papers" :binary="true" />
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Necesita papeles
                </label>
              </div>

              <div class="flex items-center space-x-3">
                <UCheckbox v-model="userForm.need_z" :binary="true" />
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Necesita cierre Z
                </label>
              </div>

              <div class="flex items-center space-x-3">
                <UCheckbox v-model="userForm.need_compra" :binary="true" />
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Necesita factura de compra
                </label>
              </div>

              <div class="flex items-center space-x-3">
                <UCheckbox v-model="userForm.need_auditoria" :binary="true" />
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Necesita auditoría
                </label>
              </div>
            </div>
          </div>

          <!-- Veps Unidos -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h4
                class="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex-1"
              >
                Veps Unidos
              </h4>
              <UButton
                @click="addJoinedUser"
                variant="outline"
                size="sm"
                class="ml-4 flex-shrink-0"
              >
                <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
                Agregar
              </UButton>
            </div>

            <div
              v-if="userForm.joined_users && userForm.joined_users.length > 0"
              class="space-y-3"
            >
              <div
                v-for="(joinedUser, index) in userForm.joined_users"
                :key="index"
                class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50"
              >
                <div class="flex items-start gap-4">
                  <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Nombre Real
                      </label>
                      <UInput
                        v-model="joinedUser.name"
                        placeholder="Nombre Real del usuario asociado"
                    class="w-full"
                        required
                        @input="
                          (event) => handleJoinedUserNameInput(index, event)
                        "
                  />
                </div>

                <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        CUIT <span class="text-red-500">*</span>
                  </label>
                      <UInput
                        v-model="joinedUser.cuit"
                        placeholder="20-87654321-9"
                    class="w-full"
                        required
                  />
                </div>
              </div>

                  <div class="flex-shrink-0 pt-8">
                    <UButton
                      @click="removeJoinedUser(index)"
                      variant="outline"
                      color="red"
                      size="sm"
                      class="p-2"
                    >
                      <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                    </UButton>
                  </div>
                </div>
              </div>
              </div>

            <div
              v-else
              class="text-sm text-gray-500 dark:text-gray-400 text-center py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
            >
              No hay usuarios asociados. Haz clic en "Agregar" para añadir uno.
            </div>
          </div>

          <!-- Fechas -->
          <!-- <div class="space-y-4">
            <h4 class="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Fechas
            </h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fecha de ejecución
                </label>
                <UInput
                  v-model="userForm.execution_date"
                  type="date"
                />
                      </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Última ejecución
                </label>
                <UInput
                  v-model="userForm.last_execution"
                  type="date"
                />
                    </div>
            </div>
          </div> -->

          <!-- Buttons -->
          <div
            class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
              <UButton
              variant="outline"
              @click="closeUserModal"
              :disabled="userModalLoading"
            >
              Cancelar
              </UButton>
            <UButton type="submit" :loading="userModalLoading">
              <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
              {{ editingUser ? "Actualizar" : "Crear" }}
            </UButton>
          </div>
            </form>
      </div>
        </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-md mx-4"
      >
        <div class="p-6 text-center">
          <div
            class="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="w-8 h-8 text-red-600 dark:text-red-400"
            />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Confirmar Eliminación
                </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            ¿Estás seguro de que deseas eliminar al usuario
            <strong>{{ deletingUser?.alter_name }}</strong
            >? Esta acción no se puede deshacer.
          </p>
          <div class="flex gap-3">
            <UButton
              @click="cancelDelete"
              variant="outline"
              size="lg"
              class="flex-1"
              :disabled="deleteLoading"
            >
              Cancelar
            </UButton>
            <UButton
              @click="handleDeleteUser"
              size="lg"
              color="red"
              class="flex-1"
              :loading="deleteLoading"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
              Eliminar
                </UButton>
          </div>
        </div>
      </div>
              </div>
              
    <!-- Delete Job Time Confirmation Modal -->
    <div
      v-if="showDeleteJobTimeConfirm"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-md mx-4"
      >
        <div class="p-6 text-center">
          <div
            class="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="w-8 h-8 text-red-600 dark:text-red-400"
            />
                    </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Confirmar Eliminación de Job Time
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            ¿Estás seguro de que deseas eliminar el job time
            <strong>#{{ deletingJobTime?.id }}</strong>
            {{
              deletingJobTime?.folder_name
                ? `(${deletingJobTime.folder_name})`
                : ""
            }}? Esta acción no se puede deshacer.
          </p>
          <div class="flex gap-3">
            <UButton
              @click="cancelDeleteJobTime"
              variant="outline"
              size="lg"
              class="flex-1"
              :disabled="deleteLoading"
            >
              Cancelar
            </UButton>
            <UButton
              @click="handleDeleteJobTime"
              size="lg"
              color="red"
              class="flex-1"
              :loading="deleteLoading"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
              Eliminar
            </UButton>
                  </div>
                </div>
              </div>
            </div>

    <!-- Job Time Details Modal -->
    <div
      v-if="showJobTimeDetailsModal"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Detalles del Job Time #{{ viewingJobTime?.id }}
                </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Información completa del trabajo programado
            </p>
          </div>
          <UButton variant="ghost" size="sm" @click="closeJobTimeDetailsModal">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                </UButton>
              </div>

        <div
          class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
          v-if="viewingJobTime"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Información General -->
            <div class="space-y-4">
              <h4
                class="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2"
              >
                Información General
              </h4>

              <div class="space-y-3">
                <div>
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >ID</label
                  >
                  <p class="text-sm text-gray-900 dark:text-white">
                    #{{ viewingJobTime.id }}
                  </p>
                </div>

                <div>
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >Carpeta</label
                  >
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ viewingJobTime.folder_name || "Sin carpeta" }}
                  </p>
                </div>

                <div>
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >Estado</label
                  >
                  <div class="mt-1">
                    <span
                      :class="[
                        'inline-flex px-3 py-1 text-xs font-semibold rounded-full',
                        viewingJobTime.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : viewingJobTime.status === 'RUNNING'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : viewingJobTime.status === 'FINISHED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                      ]"
                    >
                      {{
                        viewingJobTime.status === "PENDING"
                          ? "Pendiente"
                          : viewingJobTime.status === "RUNNING"
                          ? "Ejecutando"
                          : viewingJobTime.status === "FINISHED"
                          ? "Finalizado"
                          : "Error"
                      }}
                          </span>
                  </div>
                </div>

                <div>
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >Tipo</label
                  >
                  <div class="mt-1" v-if="viewingJobTime.type">
                    <span
                      :class="[
                        'inline-flex px-3 py-1 text-xs font-semibold rounded-full',
                        viewingJobTime.type === 'autónomo'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : viewingJobTime.type === 'credencial'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                      ]"
                    >
                      {{
                        viewingJobTime.type === "autónomo"
                          ? "Autónomo"
                          : viewingJobTime.type === "credencial"
                          ? "Credencial"
                          : "Monotributo"
                      }}
                          </span>
                        </div>
                  <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                    Sin tipo especificado
                  </p>
                      </div>

                <div>
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >Fecha de Creación</label
                  >
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ formatDateTime(viewingJobTime.created_at) }}
                  </p>
                    </div>

                <div>
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >Fecha de Ejecución</label
                  >
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ formatDateTime(viewingJobTime.execution_time) }}
                  </p>
                </div>

                <div>
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >Vencimiento</label
                  >
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ viewingJobTime.caducate }}
                  </p>
                </div>

                <div v-if="viewingJobTime.executed_at">
                  <label
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >Fecha de Ejecución Real</label
                  >
                  <p class="text-sm text-gray-900 dark:text-white">
                    {{ formatDateTime(viewingJobTime.executed_at) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Lista de Usuarios -->
            <div class="space-y-4">
              <h4
                class="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2"
              >
                Usuarios ({{ viewingJobTime.users?.length || 0 }})
              </h4>

              <div
                class="space-y-3 max-h-96 overflow-y-auto"
                v-if="viewingJobTime.users && viewingJobTime.users.length > 0"
              >
                <div
                  v-for="user in viewingJobTime.users"
                  :key="user.id"
                  class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                    <div class="flex items-center space-x-2">
                        <h5 class="font-medium text-gray-900 dark:text-white">
                          {{ user.alter_name }}
                        </h5>
                        <span
                          :class="[
                            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                            user.sent
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                          ]"
                        >
                          {{ user.sent ? "Enviado" : "No enviado" }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ user.real_name }}
                      </p>
                      <div
                        class="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400"
                      >
                        <span>📱 {{ user.mobile_number }}</span>
                        <span v-if="user.cuit">🆔 {{ user.cuit }}</span>
                      </div>

                      <!-- Usuarios Asociados -->
                      <div
                        v-if="user.joined_users && user.joined_users.length > 0"
                        class="mt-2"
                      >
                        <p
                          class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
                        >
                          Usuarios Asociados ({{ user.joined_users.length }}):
                        </p>
                        <div class="space-y-1">
                          <div
                            v-for="joinedUser in user.joined_users"
                            :key="joinedUser.cuit"
                            class="text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
                          >
                            {{ joinedUser.name }} - {{ joinedUser.cuit }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="ml-3">
                      <span
                        :class="[
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                          user.type === 'autónomo'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : user.type === 'credencial'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                        ]"
                      >
                        {{
                          user.type === "autónomo"
                            ? "Autónomo"
                            : user.type === "credencial"
                            ? "Credencial"
                            : "Monotributo"
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <UIcon
                  name="i-heroicons-users"
                  class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2"
                />
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  No hay usuarios asociados
                </p>
                  </div>
                </div>
              </div>
            </div>

        <div
          class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700"
        >
          <UButton variant="ghost" @click="closeJobTimeDetailsModal">
            Cerrar
          </UButton>
          <UButton @click="editJobTime(viewingJobTime)" v-if="viewingJobTime">
            <UIcon name="i-heroicons-pencil" class="w-4 h-4 mr-2" />
            Editar
          </UButton>
        </div>
      </div>
    </div>

    <!-- Execute Now Confirmation Modal -->
    <div
      v-if="showExecuteNowConfirm"
      class="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-md mx-4"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              Confirmar Ejecución Inmediata
              </h3>
            <UButton variant="ghost" size="sm" @click="cancelExecuteNow">
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
            </UButton>
          </div>
              
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
                  <div
                class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center"
                  >
                      <UIcon
                  name="i-heroicons-exclamation-triangle"
                  class="w-6 h-6 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  ¿Estás seguro de que quieres ejecutar el envío ahora?
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Esta acción enviará inmediatamente los VEPs a
                  {{ matchResults.filter((r) => r.matched).length }} usuarios y
                  no se puede deshacer.
                        </p>
                      </div>
                    </div>

            <!-- Resumen de archivos -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-900 dark:text-white mb-2"
              >
                Resumen del envío:
              </h4>
              <div class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div class="flex justify-between">
                  <span>Carpeta:</span>
                  <span class="font-medium">{{ selectedFolder }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Archivos exactos:</span>
                  <span class="font-medium text-green-600">{{
                    matchResults.filter(
                      (r) => r.matched && r.matchType === "exact"
                    ).length
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Archivos parciales:</span>
                  <span class="font-medium text-yellow-600">{{
                    matchResults.filter(
                      (r) => r.matched && r.matchType === "partial"
                    ).length
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Total a enviar:</span>
                  <span class="font-medium">{{
                    matchResults.filter((r) => r.matched).length
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Campo Caducate -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vencimiento <span class="text-red-500">*</span>
              </label>
              <UInput
                v-model="executeNowCaducate"
                placeholder="DD/MM (ej: 25/12)"
                maxlength="5"
                class="w-full"
                required
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Formato: DD/MM (día/mes)
              </p>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <UButton variant="outline" @click="cancelExecuteNow">
              Cancelar
                      </UButton>
            <UButton color="orange" @click="executeNow">
              <UIcon name="i-heroicons-bolt" class="w-4 h-4 mr-2" />
              Sí, Ejecutar Ahora
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Execute Now Final Confirmation Modal (Users without match) -->
    <div
      v-if="showExecuteNowFinalConfirm"
      class="fixed inset-0 z-90 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-red-600 dark:text-red-400">
              ⚠️ Usuarios Sin Archivos Detectados
            </h3>
            <UButton variant="ghost" size="sm" @click="cancelExecuteNowFinal">
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                      </UButton>
                    </div>

          <div class="space-y-4">
            <div
              class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <p
                class="text-sm font-medium text-red-800 dark:text-red-200 mb-2"
              >
                Los siguientes usuarios no tienen archivos PDF disponibles:
              </p>

              <div class="max-h-60 overflow-y-auto space-y-2">
                <div
                  v-for="result in matchResults.filter((r) => !r.matched)"
                  :key="result.user.id"
                  class="bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-200 dark:border-red-700"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
                    >
                      <UIcon
                        name="i-heroicons-x-mark"
                        class="w-4 h-4 text-red-600 dark:text-red-400"
                      />
                    </div>
                    <div class="flex-1">
                      <p
                        class="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {{ result.user.alter_name }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ result.user.real_name }} • {{ result.user.cuit }}
                      </p>
                      <p class="text-xs text-red-600 dark:text-red-400 mt-1">
                        {{ result.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
            >
              <div class="flex items-start space-x-3">
                <UIcon
                  name="i-heroicons-exclamation-triangle"
                  class="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
                />
                <div class="flex-1">
                  <p
                    class="text-sm font-medium text-yellow-800 dark:text-yellow-200"
                  >
                    ¿Continuar sin estos usuarios?
                  </p>
                  <p class="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                    Solo se procesarán los usuarios que tienen archivos
                    disponibles ({{
                      matchResults.filter((r) => r.matched).length
                    }}
                    usuarios). Los usuarios sin archivos serán omitidos del
                    envío.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <UButton variant="outline" @click="cancelExecuteNowFinal">
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
              Volver a Revisar
            </UButton>
            <UButton color="orange" @click="proceedWithExecution">
              <UIcon name="i-heroicons-bolt" class="w-4 h-4 mr-2" />
              Continuar Solo con Archivos Disponibles
              </UButton>
          </div>
            </div>
          </div>
        </div>

    <!-- Edit Job Time Modal -->
    <div
      v-if="showEditJobTimeModal"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Editar Job Time #{{ editingJobTime?.id }}
              </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Modifica los detalles del envío programado
            </p>
          </div>
          <UButton variant="ghost" size="sm" @click="closeEditJobTimeModal">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form @submit.prevent="handleSaveJobTime" class="space-y-6">
            <!-- Información General -->
            <div class="space-y-4">
              <h4
                class="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2"
              >
                Información General
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Carpeta
                </label>
                  <UInput
                    v-model="jobTimeEditForm.folder_name"
                    placeholder="Nombre de la carpeta"
                  class="w-full"
                />
              </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Vencimiento <span class="text-red-500">*</span>
                  </label>
                  <UInput
                    v-model="jobTimeEditForm.caducate"
                    placeholder="DD/MM (ej: 25/12)"
                    maxlength="5"
                    class="w-full"
                    required
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Formato: DD/MM (día/mes)
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Tipo
                  </label>
                  <USelect
                    v-model="jobTimeEditForm.type"
                    :items="[
                      { label: 'Autónomo', value: 'autónomo' },
                      { label: 'Credencial', value: 'credencial' },
                      { label: 'Monotributo', value: 'monotributo' },
                    ]"
                    value-attribute="value"
                    option-attribute="label"
                    placeholder="Seleccionar tipo"
                    class="w-full"
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Estado
                  </label>
                  <USelect
                    v-model="jobTimeEditForm.status"
                    :items="[
                      { label: 'Pendiente', value: 'PENDING' },
                      { label: 'Ejecutando', value: 'RUNNING' },
                      { label: 'Finalizado', value: 'FINISHED' },
                      { label: 'Error', value: 'ERROR' },
                    ]"
                    value-attribute="value"
                    option-attribute="label"
                    placeholder="Seleccionar estado"
                    class="w-full"
                  />
                </div>
                  </div>
                  
                  <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Fecha y Hora de Ejecución <span class="text-red-500">*</span>
                </label>
                <UInput
                  v-model="jobTimeEditForm.execution_time"
                  type="datetime-local"
                  class="w-full"
                  required
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Fecha y hora programada para la ejecución del envío
                </p>
              </div>
            </div>
          </form>
        </div>

        <div
          class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700"
        >
          <UButton
            variant="ghost"
            @click="closeEditJobTimeModal"
            :disabled="userModalLoading"
          >
            Cancelar
          </UButton>
          <UButton @click="handleSaveJobTime" :loading="userModalLoading">
            <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
            Guardar Cambios
          </UButton>
        </div>
      </div>
    </div>

    <!-- Enviar VEPs Modal -->
    <div
      v-if="showEnviarModal"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-2 sm:p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-[95vw] h-[95vh] overflow-hidden"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{
                enviarStep === 1
                  ? "Seleccionar Archivos y Usuarios"
                  : enviarStep === 2
                  ? "Resultados del Matcheo"
                  : "Configurar Envío"
              }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{
                enviarStep === 1
                  ? "Paso 1: Configurar el envío de VEPs"
                  : enviarStep === 2
                  ? "Paso 2: Revisar resultados del matcheo"
                  : "Paso 3: Elegir cuándo ejecutar el envío"
              }}
            </p>
          </div>
          <UButton variant="ghost" size="sm" @click="closeEnviarModal">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Step 1: Selection -->
          <div v-if="enviarStep === 1" class="p-4 sm:p-6">
            <div class="space-y-6">
              <!-- Top: Folder Selection (Compact) -->
              <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                >
                  Seleccionar Carpeta
                </h4>

                <div class="flex flex-col sm:flex-row gap-4 items-start">
                  <div class="flex-1">
                    <USelect
                      v-model="selectedFolder"
                      :items="availableFolders"
                      placeholder="Seleccionar carpeta de archivos VEP"
                      :loading="foldersLoading"
                      class="w-full"
                    />
                  </div>

                  <div
                    v-if="selectedFolder"
                    class="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <UIcon
                      name="i-heroicons-folder-open"
                      class="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2"
                    />
                    <span
                      class="text-sm font-medium text-blue-800 dark:text-blue-200"
                    >
                      {{ selectedFolder }}
                      </span>
                    </div>
                  </div>
                </div>
                
              <!-- Bottom: User Selection (Expanded) -->
              <div class="space-y-6 flex-1">
                <div class="flex items-center justify-between">
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Seleccionar Usuarios
                  </h4>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    {{ selectedUsers.size }} seleccionados
                  </div>
                </div>

                <!-- Search and Filters -->
                <div class="space-y-4">
                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                      <UInput
                        v-model="enviarSearchTerm"
                        placeholder="Buscar usuarios..."
                        icon="i-heroicons-magnifying-glass"
                        @input="handleEnviarSearch"
                        class="w-full"
                      />
                    </div>
                    <div>
                      <USelect
                        v-model="enviarSearchField"
                        :items="searchFieldOptions"
                        placeholder="Campo"
                        class="w-32"
                        @update:model-value="handleEnviarSearch"
                      />
                    </div>
                    <div>
                      <USelect
                        v-model="enviarTypeFilter"
                        :items="typeFilterOptions"
                        placeholder="Tipo"
                        class="w-32"
                        @update:model-value="handleTypeFilterChange"
                      />
                    </div>
              </div>

                <div class="flex items-center justify-between">
                     <div class="flex gap-2">
                       <!-- Botones de selección -->
                  <UButton 
                         variant="outline"
                         size="sm"
                         @click="selectAllEnviarUsers"
                         :disabled="enviarUsersLoading || enviarUsers.length === 0"
                       >
                         <UIcon name="i-heroicons-check-circle" class="w-4 h-4 mr-1" />
                         Seleccionar Todos
                       </UButton>
                       <UButton
                         variant="outline"
                         size="sm"
                         @click="deselectAllEnviarUsers"
                         :disabled="enviarUsersLoading || selectedUsers.size === 0"
                       >
                         <UIcon name="i-heroicons-x-circle" class="w-4 h-4 mr-1" />
                         Deseleccionar Todos
                       </UButton>
                     </div>

                     <div v-if="enviarSearchTerm" class="flex items-center">
                  <UButton 
                    variant="ghost" 
                    size="sm"
                        @click="clearEnviarSearch"
                  >
                        <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
                    Limpiar
                  </UButton>
                    </div>
                  </div>
                </div>

                <!-- Users List -->
                <div
                  class="border border-gray-200 dark:border-gray-700 rounded-lg max-h-[60vh] overflow-y-auto"
                >
                  <div v-if="enviarUsersLoading" class="p-8 text-center">
                    <UIcon
                      name="i-heroicons-arrow-path"
                      class="w-6 h-6 text-gray-400 animate-spin mx-auto mb-2"
                    />
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Cargando usuarios...
                    </p>
                      </div>

                  <div
                    v-else-if="enviarUsers.length === 0"
                    class="p-8 text-center"
                  >
                    <UIcon
                      name="i-heroicons-users"
                      class="w-8 h-8 text-gray-400 mx-auto mb-2"
                    />
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      No se encontraron usuarios
                    </p>
                  </div>

                  <div
                    v-else
                    class="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <div
                      v-for="user in enviarUsers"
                      :key="user.id"
                      class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      @click="toggleUserSelection(user.id)"
                    >
                      <div class="flex items-center space-x-3">
                        <UCheckbox
                          :model-value="selectedUsers.has(user.id)"
                          @click.stop="toggleUserSelection(user.id)"
                        />
                      <div class="flex-1 min-w-0">
                          <div class="flex items-center justify-between">
                            <div>
                              <p
                                class="text-sm font-medium text-gray-900 dark:text-white truncate"
                              >
                                {{ user.alter_name }}
                              </p>
                              <p
                                class="text-xs text-gray-500 dark:text-gray-400 truncate"
                              >
                                {{ user.real_name }} • {{ user.cuit }}
                              </p>
                            </div>
                            <span
                              :class="[
                                'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                                user.type === 'autónomo'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : user.type === 'credencial'
                                  ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                              ]"
                            >
                              {{
                                user.type === "autónomo"
                                  ? "Autónomo"
                                  : user.type === "credencial"
                                  ? "Credencial"
                                  : "Monotributo"
                              }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                      </div>
                    </div>
                    
                <!-- Pagination -->
                <div
                  v-if="enviarTotalPages > 1"
                  class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div class="flex flex-col sm:flex-row items-center gap-4">
                    <div class="text-sm text-gray-700 dark:text-gray-300">
                      Mostrando
                      {{ (enviarCurrentPage - 1) * enviarPageSize + 1 }} a
                      {{
                        Math.min(
                          enviarCurrentPage * enviarPageSize,
                          enviarTotalUsers
                        )
                      }}
                      de {{ enviarTotalUsers }} usuarios
                    </div>
                    <USelect
                      v-model="enviarPageSize"
                      :items="pageSizeOptions"
                      class="w-36"
                      value-attribute="value"
                      option-attribute="label"
                      @update:model-value="handleEnviarPageSizeChange"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <UButton 
                      variant="outline"
                      size="sm"
                      :disabled="enviarCurrentPage <= 1"
                      @click="changeEnviarPage(enviarCurrentPage - 1)"
                    >
                      <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
                      Anterior
                    </UButton>

                    <div class="flex items-center space-x-1">
                      <template
                        v-for="page in getEnviarVisiblePages()"
                        :key="page"
                      >
                        <UButton
                          v-if="page !== '...'"
                          :variant="
                            page === enviarCurrentPage ? 'solid' : 'outline'
                          "
                          size="sm"
                          @click="changeEnviarPage(page)"
                          class="min-w-[2rem]"
                        >
                          {{ page }}
                        </UButton>
                        <span v-else class="px-2 text-gray-500">...</span>
                      </template>
                </div>

                <UButton
                      variant="outline"
                      size="sm"
                      :disabled="enviarCurrentPage >= enviarTotalPages"
                      @click="changeEnviarPage(enviarCurrentPage + 1)"
                    >
                      Siguiente
                      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
              </div>
            </div>
        </div>

          <!-- Step 2: Results -->
          <div v-if="enviarStep === 2" class="p-6">
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Resultados del Matcheo
                </h4>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <span class="text-green-600 dark:text-green-400"
                    >{{
                      matchResults.filter(
                        (r) => r.matched && r.matchType === "exact"
                      ).length
                    }}
                    completos</span
                  >,
                  <span class="text-yellow-600 dark:text-yellow-400"
                    >{{
                      matchResults.filter(
                        (r) => r.matched && r.matchType === "partial"
                      ).length
                    }}
                    parciales</span
                  >,
                  <span class="text-red-600 dark:text-red-400"
                    >{{ matchResults.filter((r) => !r.matched).length }} sin
                    archivos</span
                  >
                  ({{ matchResults.length }} total)
                </div>
              </div>

              <!-- Results List -->
              <div
                class="border border-gray-200 dark:border-gray-700 rounded-lg max-h-[70vh] overflow-y-auto"
              >
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                  <div
                    v-for="result in matchResults"
                    :key="result.user.id"
                    class="p-4"
                  >
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <!-- Coincidencia exacta (verde) -->
                        <div
                          v-if="result.matched && result.matchType === 'exact'"
                          class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
                        >
                          <UIcon
                            name="i-heroicons-check"
                            class="w-5 h-5 text-green-600 dark:text-green-400"
                          />
                        </div>
                        <!-- Coincidencia parcial (amarillo) -->
                        <div
                          v-else-if="
                            result.matched && result.matchType === 'partial'
                          "
                          class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center"
                        >
                          <UIcon
                            name="i-heroicons-exclamation-triangle"
                            class="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                          />
                        </div>
                        <!-- Sin coincidencia (rojo) -->
                        <div
                          v-else
                          class="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
                        >
                          <UIcon
                            name="i-heroicons-x-mark"
                            class="w-5 h-5 text-red-600 dark:text-red-400"
                          />
                        </div>
              </div>

                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
              <div>
                            <p
                              class="text-sm font-medium text-gray-900 dark:text-white"
                            >
                              {{ result.user.alter_name }}
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              {{ result.user.real_name }} •
                              {{ result.user.cuit }}
                            </p>
                            <!-- Coincidencia exacta -->
                            <p
                              v-if="
                                result.matched && result.matchType === 'exact'
                              "
                              class="text-xs text-green-600 dark:text-green-400 mt-1"
                            >
                              ✓ {{ result.description }}
                            </p>
                            <!-- Coincidencia parcial -->
                            <p
                              v-else-if="
                                result.matched && result.matchType === 'partial'
                              "
                              class="text-xs text-yellow-600 dark:text-yellow-400 mt-1"
                            >
                              ⚠ {{ result.description }}
                            </p>
                            <!-- Sin coincidencia -->
                            <p
                              v-else
                              class="text-xs text-red-600 dark:text-red-400 mt-1"
                            >
                              ✗ {{ result.description }}
                            </p>
                          </div>

                          <div
                            :class="[
                              'px-3 py-1 rounded-full text-xs font-medium',
                              result.matched && result.matchType === 'exact'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : result.matched &&
                                  result.matchType === 'partial'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
                            ]"
                          >
                            {{
                              result.matched && result.matchType === "exact"
                                ? "Encontrado"
                                : result.matched &&
                                  result.matchType === "partial"
                                ? "Parcial"
                                : "No encontrado"
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Actions -->
        <div v-if="enviarStep === 3" class="p-6">
          <div class="space-y-8">
            <div class="text-center">
              <h4
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
              >
                Configurar Envío de VEPs
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                Elige cuándo ejecutar el envío de los archivos encontrados
              </p>

              <!-- Resumen de archivos -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  <span class="font-semibold text-green-600"
                    >{{
                      matchResults.filter(
                        (r) => r.matched && r.matchType === "exact"
                      ).length
                    }}
                    exactos</span
                  >
                  +
                  <span class="font-semibold text-yellow-600"
                    >{{
                      matchResults.filter(
                        (r) => r.matched && r.matchType === "partial"
                      ).length
                    }}
                    parciales</span
                  >
                  =
                  <span class="font-semibold"
                    >{{ matchResults.filter((r) => r.matched).length }} archivos
                    listos para enviar</span
                  >
                </div>
              </div>
            </div>

            <!-- Botones principales -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              <!-- Programar ejecución -->
              <div class="group cursor-pointer" @click="openScheduleModal">
                <div
                  class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6 text-center hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-200 transform group-hover:scale-105"
                >
                  <div
                    class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors"
                  >
                    <UIcon
                      name="i-heroicons-calendar-days"
                      class="w-10 h-10 text-white"
                    />
                  </div>
                  <h5
                    class="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3"
                  >
                    Programar Ejecución
                  </h5>
                  <p class="text-blue-700 dark:text-blue-300 mb-6 font-medium">
                    Programa el envío para una fecha y hora específica
                  </p>
                  <div
                    class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg group-hover:shadow-xl transition-all"
                  >
                    <UIcon name="i-heroicons-clock" class="w-5 h-5 mr-2" />
                    Programar Envío
                  </div>
                </div>
              </div>

              <!-- Ejecutar ahora -->
              <div class="group cursor-pointer" @click="confirmExecuteNow">
                <div
                  class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-6 text-center hover:border-green-300 dark:hover:border-green-600 hover:shadow-xl transition-all duration-200 transform group-hover:scale-105"
                >
                  <div
                    class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors"
                  >
                    <UIcon
                      name="i-heroicons-paper-airplane"
                      class="w-10 h-10 text-white"
                    />
                  </div>
                  <h5
                    class="text-xl font-bold text-green-900 dark:text-green-100 mb-3"
                  >
                    Ejecutar Ahora
                  </h5>
                  <p
                    class="text-green-700 dark:text-green-300 mb-6 font-medium"
                  >
                    Envía los archivos inmediatamente
                  </p>
                  <div
                    class="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg group-hover:shadow-xl transition-all"
                  >
                    <UIcon name="i-heroicons-bolt" class="w-5 h-5 mr-2" />
                    Ejecutar Ahora
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center space-x-4">
              <UButton
              v-if="enviarStep === 2"
              @click="backToSelection"
              variant="outline"
                size="lg"
              >
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
              Volver
              </UButton>
            <UButton
              v-if="enviarStep === 3"
              @click="backToResults"
              variant="outline"
              size="lg"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
              Volver
            </UButton>
      </div>

          <div class="flex items-center space-x-4">
            <UButton @click="closeEnviarModal" variant="outline" size="lg">
              {{
                enviarStep === 3
                  ? "Cerrar"
                  : enviarStep === 2
                  ? "Cerrar"
                  : "Cancelar"
              }}
            </UButton>

            <UButton
              v-if="enviarStep === 1"
              @click="proceedToMatching"
              :loading="matchingInProgress"
              :disabled="!selectedFolder || selectedUsers.size === 0"
              size="lg"
            >
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
              Siguiente
            </UButton>

            <UButton
              v-if="enviarStep === 2"
              @click="proceedToActions"
              size="lg"
            >
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 mr-2" />
              Siguiente
            </UButton>
          </div>
          </div>
        </div>
                </div>

    <!-- Schedule Modal -->
    <div
      v-if="showScheduleModal"
      class="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-md mx-4"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              Programar Ejecución
            </h3>
            <UButton variant="ghost" size="sm" @click="closeScheduleModal">
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                </UButton>
              </div>

          <div class="space-y-4">
            <!-- Date picker -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Fecha de ejecución
              </label>
              <UInput
                v-model="scheduleDate"
                type="date"
                :min="
                  DateTime.now()
                    .setZone('America/Argentina/Buenos_Aires')
                    .toISODate()
                "
                class="w-full"
                required
              />
            </div>

            <!-- Time picker -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Hora de ejecución
              </label>
              <UInput
                v-model="scheduleTime"
                type="time"
                class="w-full"
                required
              />
            </div>

            <!-- Caducate picker -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Vencimiento <span class="text-red-500">*</span>
              </label>
              <UInput
                v-model="scheduleCaducate"
                placeholder="DD/MM (ej: 25/12)"
                maxlength="5"
                class="w-full"
                required
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Formato: DD/MM (día/mes)
              </p>
            </div>

            <!-- Preview -->
            <div
              v-if="scheduleDate && scheduleTime && scheduleCaducate"
              class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                Ejecución programada para:
                {{ formatScheduleDateTime(scheduleDate, scheduleTime) }}
              </p>
              <p class="text-xs text-blue-600 dark:text-blue-300 mt-1">
                Vencimiento: {{ scheduleCaducate }}
              </p>
                </div>
            </div>

          <div class="flex justify-end space-x-3 mt-6">
            <UButton
              variant="outline"
              @click="closeScheduleModal"
              :disabled="schedulingInProgress"
            >
              Cancelar
            </UButton>
            <UButton
              @click="confirmSchedule"
              :loading="schedulingInProgress"
              :disabled="!scheduleDate || !scheduleTime"
            >
              <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
              Programar
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { debounce } from "lodash-es";
import { useVepApi } from "~/composables/useVepApi";
import { useAuth } from "../composables/useAuth";
import type {
  FolderContents,
  FolderItem,
  VepUser,
  CreateVepUserDto,
  UpdateVepUserDto,
  PaginatedResponse,
  JobTime,
} from "~/types/api";
import CreateFolderTab from "~/components/tabs/CreateFolderTab.vue";
import SearchTab from "~/components/tabs/SearchTab.vue";
import UploadTab from "~/components/tabs/UploadTab.vue";
import UsersTab from "~/components/tabs/UsersTab.vue";
import EnviarTab from "~/components/tabs/EnviarTab.vue";
import QrTab from "~/components/tabs/QrTab.vue";
import JobTimeTab from "~/components/tabs/JobTimeTab.vue";

// Page meta
definePageMeta({
  middleware: "auth",
});

// Composables
const vepApi = useVepApi();
const toast = useToast();
const { signOut, user } = useAuth();

// Mobile menu state
const mobileMenuOpen = ref(false);
const showLogoutModal = ref(false);
const showRenameModal = ref(false);
const showQrConfirmation = ref(false);
const showQrCode = ref(false);
const qrImageUrl = ref<string | null>(null);
const qrLoading = ref(false);

// VEP Users state
const users = ref<VepUser[]>([]);
const usersLoading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const totalUsers = ref(0);
const totalPages = ref(0);
const showUserModal = ref(false);
const showDeleteConfirm = ref(false);
const editingUser = ref<VepUser | null>(null);
const deletingUser = ref<VepUser | null>(null);
const searchTerm = ref("");
const searchField = ref<string>("Todos los campos");
const isSearching = ref(false);
const typeFilter = ref<string>("Todos los tipos");
const userModalLoading = ref(false);
const deleteLoading = ref(false);

// Job Times state
const jobTimes = ref<JobTime[]>([]);
const jobTimesLoading = ref(false);
const jobTimesCurrentPage = ref(1);
const jobTimesPageSize = ref(10);
const jobTimesTotalJobTimes = ref(0);
const jobTimesTotalPages = ref(0);
const jobTimesSearchTerm = ref("");
const jobTimesSearchField = ref<string>("Todos los campos");
const jobTimesStatusFilter = ref<string>("Todos los estados");
const jobTimesTypeFilter = ref<string>("Todos los tipos");
const jobTimesIsSearching = ref(false);
const showDeleteJobTimeConfirm = ref(false);
const deletingJobTime = ref<JobTime | null>(null);
const showJobTimeDetailsModal = ref(false);
const viewingJobTime = ref<JobTime | null>(null);
const showEditJobTimeModal = ref(false);
const editingJobTime = ref<JobTime | null>(null);
const jobTimeEditForm = reactive({
  folder_name: "",
  caducate: "",
  execution_time: "",
  type: "autónomo" as "autónomo" | "credencial" | "monotributo",
  status: "PENDING" as "PENDING" | "RUNNING" | "FINISHED" | "ERROR",
});

// Enviar VEPs state
const showEnviarModal = ref(false);
const enviarStep = ref(1); // 1: Selección, 2: Resultados, 3: Acciones
const selectedFolder = ref("");
const availableFolders = ref<Array<{ label: string; value: string }>>([]);
const selectedUsers = ref<Set<number>>(new Set());
const enviarUsers = ref<VepUser[]>([]);
const enviarUsersLoading = ref(false);
const enviarCurrentPage = ref(1);
const enviarPageSize = ref(10);
const enviarTotalUsers = ref(0);
const enviarTotalPages = ref(0);
const enviarSearchTerm = ref("");
const enviarSearchField = ref<string>("Todos los campos");
const enviarTypeFilter = ref<string>("Credencial");
const enviarIsSearching = ref(false);
const matchResults = ref<
  Array<{
    user: VepUser;
    matched: boolean;
    fileName?: string;
  }>
>([]);
const matchingInProgress = ref(false);

// Programación de ejecución
const showScheduleModal = ref(false);
const scheduleDate = ref("");
const scheduleTime = ref("");
const scheduleCaducate = ref("");
const schedulingInProgress = ref(false);
const showExecuteNowConfirm = ref(false);
const showExecuteNowFinalConfirm = ref(false);
const executeNowCaducate = ref('');

// Page size options
const pageSizeOptions = [
  { label: "10 por página", value: 10 },
  { label: "20 por página", value: 20 },
  { label: "50 por página", value: 50 },
  { label: "100 por página", value: 100 },
  { label: "200 por página", value: 200 },
];

// Search field options
const searchFieldOptions = [
  "Todos los campos",
  "Nombre real",
  "Nombre alternativo",
  "Teléfono móvil",
  "CUIT",
];

const searchFieldMap = {
  "Todos los campos": "",
  "Nombre real": "real_name",
  "Nombre alternativo": "alter_name",
  "Teléfono móvil": "mobile_number",
  CUIT: "cuit",
};

// Type filter options
const typeFilterOptions = ["Autónomo", "Credencial", "Monotributo"];

const typeFilterMap = {
  Autónomo: "autónomo",
  Credencial: "credencial",
  Monotributo: "monotributo",
};

// Job Times filter options
const jobTimesSearchFieldOptions = [
  { label: "Todos los campos", value: "all" },
  { label: "Nombre de carpeta", value: "folder_name" },
  { label: "Tipo", value: "type" },
  { label: "Estado", value: "status" },
];

const jobTimesStatusFilterOptions = [
  { label: "Todos los estados", value: "all" },
  { label: "Pendiente", value: "PENDING" },
  { label: "Ejecutando", value: "RUNNING" },
  { label: "Finalizado", value: "FINISHED" },
  { label: "Error", value: "ERROR" },
];

const jobTimesTypeFilterOptions = [
  { label: "Todos los tipos", value: "all" },
  { label: "Autónomo", value: "autónomo" },
  { label: "Credencial", value: "credencial" },
  { label: "Monotributo", value: "monotributo" },
];

const jobTimesSearchFieldMap: Record<string, string | undefined> = {
  "Todos los campos": undefined,
  "Nombre de carpeta": "folder_name",
  Tipo: "type",
  Estado: "status",
};

const jobTimesStatusFilterMap: Record<
  string,
  "PENDING" | "RUNNING" | "FINISHED" | "ERROR" | undefined
> = {
  "Todos los estados": undefined,
  Pendiente: "PENDING",
  Ejecutando: "RUNNING",
  Finalizado: "FINISHED",
  Error: "ERROR",
};

const jobTimesTypeFilterMap: Record<
  string,
  "autónomo" | "credencial" | "monotributo" | undefined
> = {
  "Todos los tipos": undefined,
  Autónomo: "autónomo",
  Credencial: "credencial",
  Monotributo: "monotributo",
};
const userForm = reactive<CreateVepUserDto>({
  alter_name: "",
  real_name: "",
  mobile_number: "",
  cuit: "",
  execution_date: null,
  is_group: false,
  last_execution: null,
  need_papers: null,
  need_z: null,
  need_compra: null,
  need_auditoria: null,
  // NUEVO: Array de usuarios asociados
  joined_users: [],
  // NUEVO: Tipo de usuario
  type: "credencial",
});

// Tab system
const activeTab = ref("create");
const tabs = [
  {
    id: "create",
    label: "Crear Carpeta",
    shortLabel: "Crear",
    icon: "i-heroicons-folder-plus",
  },
  {
    id: "search",
    label: "Buscar",
    shortLabel: "Buscar",
    icon: "i-heroicons-magnifying-glass",
  },
  {
    id: "upload",
    label: "Subir Archivos",
    shortLabel: "Subir",
    icon: "i-heroicons-cloud-arrow-up",
  },
  {
    id: "users",
    label: "Usuarios",
    shortLabel: "Usuarios",
    icon: "i-heroicons-users",
  },
  {
    id: "enviar",
    label: "Enviar Veps",
    shortLabel: "Enviar",
    icon: "i-heroicons-paper-airplane",
  },
  {
    id: "jobtimes",
    label: "Envíos Programados",
    shortLabel: "Jobs",
    icon: "i-heroicons-clock",
  },
  { id: "qr", label: "QR", shortLabel: "QR", icon: "i-heroicons-qr-code" },
];

// User menu
const userMenuItems = [
  [
    {
      label: "Perfil",
      icon: "i-heroicons-user-circle",
      click: () => console.log("Profile"),
    },
    {
      label: "Configuración",
      icon: "i-heroicons-cog-6-tooth",
      click: () => console.log("Settings"),
    },
  ],
  [
    {
      label: "Cerrar Sesión",
      icon: "i-heroicons-arrow-right-on-rectangle",
      onClick: async () => {
        console.log("user menu signout clicked");
        await signOut();
      },
    },
  ],
];

// Stats
const totalFolders = ref(0);
const totalFiles = ref(0);
const uploadedFiles = ref(0);
const recentFiles = ref(0);

// Form states
const allowedTypes = ["PDF", "DOC", "DOCX", "XLS", "XLSX", "JPG", "PNG"];

// Month options - formato correcto para USelect
const monthOptions = [
  { label: "Enero", value: "Enero" },
  { label: "Febrero", value: "Febrero" },
  { label: "Marzo", value: "Marzo" },
  { label: "Abril", value: "Abril" },
  { label: "Mayo", value: "Mayo" },
  { label: "Junio", value: "Junio" },
  { label: "Julio", value: "Julio" },
  { label: "Agosto", value: "Agosto" },
  { label: "Septiembre", value: "Septiembre" },
  { label: "Octubre", value: "Octubre" },
  { label: "Noviembre", value: "Noviembre" },
  { label: "Diciembre", value: "Diciembre" },
];

// Form states
const createForm = reactive({
  month: monthOptions[new Date().getMonth()]?.value || "Enero",
  year: new Date().getFullYear(),
});

const searchForm = reactive({
  term: "",
  folder: null as string | null,
});

const uploadForm = reactive({
  targetFolder: null as string | null,
});

const renameForm = reactive({
  oldKey: "",
  newKey: "",
  folderPrefix: null as string | null,
  baseName: "",
});

const allowedRenameExtensions = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "jpg",
  "jpeg",
  "png",
  "gif",
];

function sanitizeBaseName(name: string) {
  // Trim, collapse spaces, remove path separators
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\\/]+/g, "");
}

// Auto-sanitize user input as they type
watch(
  () => renameForm.newKey,
  (val, old) => {
    if (typeof val !== "string") return;
    const cleaned = sanitizeBaseName(val);
  if (cleaned !== val) {
    // update without creating infinite loop (only when different)
      renameForm.newKey = cleaned;
  }
  }
);

const renameError = computed(() => {
  const name = (renameForm.newKey || "").trim();
  if (!name) return "El nombre no puede estar vacío";

  // Prevent path separators
  if (/[\\/]/.test(name)) return "El nombre no puede contener \\ ni /";

  const parts: string[] = name.split(".");
  if (parts.length < 2)
    return "El archivo debe incluir extensión (por ejemplo .pdf)";
  const ext = (parts[parts.length - 1] || "").toLowerCase();
  if (!allowedRenameExtensions.includes(ext))
    return `Extensión no permitida: .${ext}`;

  // Duplicate check if folder contents loaded
  if (selectedFolderContents.value) {
    const exists = selectedFolderContents.value.items.some(
      (it) => it.name === name && it.key !== renameForm.oldKey
    );
    if (exists) return "Ya existe un archivo con ese nombre en la carpeta";
  }

  return "";
});

// Loading states
const createLoading = ref(false);
const searchLoading = ref(false);
const renameLoading = ref(false);
const foldersLoading = ref(false);
const isUploading = ref(false);

// Data states
const folders = ref<string[]>([]);
const folderOptions = ref<Array<{ label: string; value: string | null }>>([]);
const selectedFolderContents = ref<FolderContents | null>(null);
const selectedFolderName = ref("");
const searchResults = ref<FolderItem[]>([]);
const previewFolderName = ref("");
const showResults = ref(false);

// In-folder search (client-side)
const folderSearchTerm = ref("");
const filteredFolderItems = computed(() => {
  const term = folderSearchTerm.value.trim().toLowerCase();
  if (!term || !selectedFolderContents.value)
    return selectedFolderContents.value?.items || [];
  return selectedFolderContents.value.items.filter((it) => {
    return (
      it.name.toLowerCase().includes(term) ||
      (it.key && it.key.toLowerCase().includes(term))
    );
  });
});

// Computed visibility to ensure results render only in Search tab
const visibleSearchResults = computed(
  () => activeTab.value === "search" && searchResults.value.length > 0
);
const visibleFolders = computed(
  () =>
    activeTab.value === "search" &&
    folders.value.length > 0 &&
    searchResults.value.length === 0 &&
    !selectedFolderContents.value
);
const visibleShowEmpty = computed(
  () =>
    activeTab.value === "search" &&
    showResults.value &&
    !folders.value.length &&
    !selectedFolderContents.value &&
    !searchResults.value.length
);

// Displayed collections (empty when not in search tab) to avoid accidental rendering
const displayedSearchResults = computed(() =>
  activeTab.value === "search" ? searchResults.value : []
);
const displayedFolders = computed(() =>
  activeTab.value === "search" ? folders.value : []
);
const displayedSelectedFolderContents = computed(() =>
  activeTab.value === "search" ? selectedFolderContents.value : null
);

// File upload states
const selectedFiles = ref<File[]>([]);
const isDragging = ref(false);
// Year options - formato correcto para USelect
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 11 }, (_, i) => {
  const year = currentYear - 5 + i;
  return { label: year.toString(), value: year };
});

// Watchers
watch(activeTab, async (newTab, oldTab) => {
  console.log("[debug] activeTab change:", {
    newTab,
    oldTab,
    folders: folders.value.length,
    folderOptions: folderOptions.value.length,
    showResults: showResults.value,
    searchResults: searchResults.value.length,
  });

  // Limpiar solo el estado de búsqueda cuando se sale de la pestaña Search
  if (newTab !== "search") {
    showResults.value = false;
    searchResults.value = [];
    selectedFolderContents.value = null;
    selectedFolderName.value = "";
    // NO vaciar `folders` porque otros tabs (upload) dependen de esta lista
  }

  // Si entramos a la pestaña de upload y no tenemos carpetas, cargarlas
  if (
    newTab === "upload" &&
    (!folders.value.length || !folderOptions.value.length)
  ) {
    try {
      await loadFolders();
    } catch (e) {
      // Silenciar; loadFolders ya notifica con toast en caso de error
    }
  }

  // Si entramos a la pestaña de usuarios, cargar usuarios
  if (newTab === "users" && users.value.length === 0) {
    try {
      await loadUsers();
    } catch (e) {
      // Silenciar; loadUsers ya notifica con toast en caso de error
    }
  }

  // Si entramos a la pestaña de job times, cargar job times (siempre actualizar)
  // Los job times cambian de estado frecuentemente y se crean desde otras tabs
  if (newTab === "jobtimes") {
    try {
      await loadJobTimes();
    } catch (e) {
      // Silenciar; loadJobTimes ya notifica con toast en caso de error
    }
  }
});

// Watch pageSize changes
watch(
  pageSize,
  async (newSize, oldSize) => {
    console.log("PageSize watcher triggered:", oldSize, "->", newSize);
    if (oldSize !== newSize && activeTab.value === "users") {
      currentPage.value = 1;
      await loadUsers();
    }
  },
  { immediate: false }
);

// Watch enviarPageSize changes
watch(
  enviarPageSize,
  async (newSize, oldSize) => {
    console.log("EnviarPageSize watcher triggered:", oldSize, "->", newSize);
    if (oldSize !== newSize && showEnviarModal.value) {
      enviarCurrentPage.value = 1;
      await loadEnviarUsers();
    }
  },
  { immediate: false }
);

watch(
  [() => createForm.month, () => createForm.year],
  async ([month, year]) => {
  if (month && year) {
    try {
      // Convertir nombre de mes a número para la API
        const monthNumber =
          monthOptions.findIndex((m) => m.value === month) + 1;
        const nameInfo = await vepApi.generateFolderName(monthNumber, year);
        previewFolderName.value = nameInfo.folderName;
    } catch (error) {
        previewFolderName.value = "";
    }
  }
  },
  { immediate: true }
);

// Methods
async function logout() {
  try {
    console.log("logout() called - delegating to signOut()");
    await signOut();
    toast.add({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
      color: "success",
    });
  } catch (error) {
    console.error("Error signing out:", error);
    toast.add({
      title: "Error",
      description: "Error al cerrar sesión",
      color: "error",
    });
  }
}

async function handleCreateFolder() {
  createLoading.value = true;
  
  try {
    // Convertir nombre de mes a número para la API
    const monthNumber =
      monthOptions.findIndex((m) => m.value === createForm.month) + 1;
    const result = await vepApi.createFolderSafely(
      monthNumber,
      createForm.year
    );
    
    if (result.success) {
      toast.add({
        title: "Carpeta creada",
        description: result.message,
        color: "success",
      });

      createForm.month = monthOptions[new Date().getMonth()]?.value || "Enero";
      createForm.year = new Date().getFullYear();
      await loadFolders();
    } else {
      toast.add({
        title: "Carpeta ya existe",
        description: result.message,
        color: "warning",
      });
    }
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "Error al crear carpeta",
      color: "error",
    });
  } finally {
    createLoading.value = false;
  }
}

async function loadFolders() {
  foldersLoading.value = true;

  try {
    const response = await vepApi.listAllFolders();
    folders.value = response.folders;
    totalFolders.value = response.totalCount;
    
    folderOptions.value = [
      { label: "Todas las carpetas", value: null },
      ...response.folders.map((folder) => ({ label: folder, value: folder })),
    ];
    
    // Solo mostrar resultados si estamos en la pestaña de búsqueda
    if (activeTab.value === "search") {
      showResults.value = true;
    }
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "Error al cargar carpetas",
      color: "error",
    });
  } finally {
    foldersLoading.value = false;
  }
}

async function loadFolderContents(folderName: string) {
  try {
    const contents = await vepApi.getFolderContents(folderName);
    selectedFolderContents.value = contents;
    selectedFolderName.value = folderName;

    const fileCount = contents.items.filter(
      (item) => item.type === "file"
    ).length;
    totalFiles.value = fileCount;
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "Error al cargar contenido",
      color: "error",
    });
  }
}

async function handleSearch() {
  if (!searchForm.term.trim()) return;

  searchLoading.value = true;

  try {
    const response = await vepApi.searchFiles(
      searchForm.term,
      searchForm.folder || undefined
    );
    searchResults.value = response.files;
    showResults.value = true;
    
    toast.add({
      title: "Búsqueda completada",
      description: `Encontrados ${response.totalCount} resultados`,
      color: "success",
    });
  } catch (error: any) {
    toast.add({
      title: "Error en búsqueda",
      description: error.message || "Error al buscar archivos",
      color: "error",
    });
  } finally {
    searchLoading.value = false;
  }
}

function clearSearch() {
  searchForm.term = "";
  searchForm.folder = "";
  searchResults.value = [];
  selectedFolderContents.value = null;
  showResults.value = false;
}

function prepareRename(item: FolderItem) {
  // Split folder prefix and base filename
  renameForm.oldKey = item.key;
  const idx = item.key.lastIndexOf("/");
  if (idx !== -1) {
    renameForm.folderPrefix = item.key.substring(0, idx);
    renameForm.baseName = item.key.substring(idx + 1);
  } else {
    renameForm.folderPrefix = null;
    renameForm.baseName = item.key;
  }
  renameForm.newKey = renameForm.baseName;
  // Open modal to rename inline instead of switching to the Manage tab
  showRenameModal.value = true;
}

async function handleRenameFile() {
  if (!renameForm.oldKey.trim() || !renameForm.newKey.trim()) return;
  
  renameLoading.value = true;
  
  try {
    const result = await vepApi.renameFile(
      renameForm.oldKey,
      renameForm.newKey
    );
    
    toast.add({
      title: "Archivo renombrado",
      description: result.message,
      color: "success",
    });
    
    renameForm.oldKey = "";
    renameForm.newKey = "";
    
    if (selectedFolderContents.value) {
      await loadFolderContents(selectedFolderName.value);
    }
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "Error al renombrar archivo",
      color: "error",
    });
  } finally {
    renameLoading.value = false;
  }
}

async function confirmRename() {
  if (!renameForm.oldKey.trim() || !renameForm.newKey.trim()) return;

  // Build the full destination key (keep folder prefix hidden)
  const destination = renameForm.folderPrefix
    ? `${renameForm.folderPrefix}/${renameForm.newKey}`
    : renameForm.newKey;

  renameLoading.value = true;
  try {
    const result = await vepApi.renameFile(renameForm.oldKey, destination);
    toast.add({
      title: "Archivo renombrado",
      description: result.message,
      color: "success",
    });

    // Update UI: if we had folder contents loaded, refresh
    if (selectedFolderContents.value) {
      await loadFolderContents(selectedFolderName.value);
    }

    // Close modal and clear form
    showRenameModal.value = false;
    renameForm.oldKey = "";
    renameForm.newKey = "";
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "Error al renombrar archivo",
      color: "error",
    });
  } finally {
    renameLoading.value = false;
  }
}

// File upload methods
function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault();
  if (
    !event.relatedTarget ||
    !(event.currentTarget as Element).contains(event.relatedTarget as Node)
  ) {
    isDragging.value = false;
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;
  
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files));
  }
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    addFiles(Array.from(target.files));
  }
}

function addFiles(files: File[]) {
  const validFiles = files.filter((file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    
    if (!validTypes.includes(file.type)) {
      toast.add({
        title: "Tipo de archivo no válido",
        description: `${file.name} no es un tipo de archivo permitido`,
        color: "warning",
      });
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.add({
        title: "Archivo muy grande",
        description: `${file.name} supera el límite de 10MB`,
        color: "warning",
      });
      return false;
    }

    return true;
  });

  const newFiles = validFiles.filter(
    (file) =>
      !selectedFiles.value.some(
        (existing) => existing.name === file.name && existing.size === file.size
      )
  );

  selectedFiles.value.push(...newFiles);
  
  if (newFiles.length > 0) {
    toast.add({
      title: "Archivos agregados",
      description: `${newFiles.length} archivo(s) listos para subir`,
      color: "success",
    });
  }
}

function removeFile(index: number) {
  selectedFiles.value.splice(index, 1);
}

function clearFiles() {
  selectedFiles.value = [];
}

async function uploadFiles() {
  if (!uploadForm.targetFolder || selectedFiles.value.length === 0) return;
  
  isUploading.value = true;
  
  try {
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.add({
      title: "Archivos subidos",
      description: `${selectedFiles.value.length} archivo(s) subido(s) exitosamente`,
      color: "success",
    });
    
    uploadedFiles.value += selectedFiles.value.length;
    clearFiles();
    
    if (selectedFolderContents.value) {
      await loadFolderContents(selectedFolderName.value);
    }
  } catch (error: any) {
    toast.add({
      title: "Error en la subida",
      description: "Error al subir archivos",
      color: "error",
    });
  } finally {
    isUploading.value = false;
  }
}

// Utility functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatDate(date: Date | string): string {
  // Convertir a DateTime en timezone Buenos Aires
  const dt = DateTime.fromJSDate(new Date(date)).setZone(
    "America/Argentina/Buenos_Aires"
  );

  return dt.toLocaleString(
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    { locale: "es-AR" }
  );
}

function formatDateTime(dateString: string | null): string {
  if (!dateString) return "Sin fecha";

  const dt = DateTime.fromISO(dateString).setZone(
    "America/Argentina/Buenos_Aires"
  );

  return dt.toLocaleString(
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    { locale: "es-AR" }
  );
}

// Job Times functions
async function loadJobTimes() {
  console.log(
    "Loading job times with pageSize:",
    jobTimesPageSize.value,
    "currentPage:",
    jobTimesCurrentPage.value
  );
  jobTimesLoading.value = true;

  try {
    const fieldValue =
      jobTimesSearchFieldMap[jobTimesSearchField.value] || undefined;
    const statusValue =
      jobTimesStatusFilterMap[jobTimesStatusFilter.value] || undefined;
    const typeValue =
      jobTimesTypeFilterMap[jobTimesTypeFilter.value] || undefined;
    const searchValue = jobTimesSearchTerm.value.trim() || undefined;

    const response = await vepApi.getJobTimesPaginated(
      jobTimesCurrentPage.value,
      jobTimesPageSize.value,
      searchValue,
      fieldValue,
      statusValue,
      typeValue
    );

    jobTimes.value = response.data;
    jobTimesTotalJobTimes.value = response.total;
    jobTimesTotalPages.value = response.totalPages;

    console.log(
      "Job times loaded:",
      response.data.length,
      "job times, total:",
      response.total,
      "with filters:",
      {
        search: searchValue,
        field: fieldValue,
        status: statusValue,
        type: typeValue,
      }
    );
  } catch (error: any) {
    console.error("Error loading job times:", error);
    showErrorToast("Error", error.message || "Error al cargar job times");
  } finally {
    jobTimesLoading.value = false;
  }
}

const handleJobTimeSearch = debounce(() => {
  jobTimesIsSearching.value = true;
  jobTimesCurrentPage.value = 1;
  loadJobTimes().finally(() => {
    jobTimesIsSearching.value = false;
  });
}, 300);

function clearJobTimeSearch() {
  jobTimesSearchTerm.value = "";
  jobTimesSearchField.value = "Todos los campos";
  jobTimesStatusFilter.value = "Todos los estados";
  jobTimesTypeFilter.value = "Todos los tipos";
  jobTimesCurrentPage.value = 1;
  loadJobTimes();
}

async function handleJobTimesPageSizeChange(newPageSize: number) {
  console.log(
    "Changing job times page size from",
    jobTimesPageSize.value,
    "to",
    newPageSize
  );
  jobTimesPageSize.value = newPageSize;
  jobTimesCurrentPage.value = 1;
  await loadJobTimes();
}

function changeJobTimesPage(page: number) {
  if (page >= 1 && page <= jobTimesTotalPages.value) {
    jobTimesCurrentPage.value = page;
    loadJobTimes();
  }
}

function getJobTimesVisiblePages() {
  const current = jobTimesCurrentPage.value;
  const total = jobTimesTotalPages.value;
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (current + delta < total - 1) {
    rangeWithDots.push("...", total);
  } else {
    rangeWithDots.push(total);
  }

  return total > 1 ? rangeWithDots : [1];
}

function viewJobTime(jobTime: JobTime) {
  console.log("View job time:", jobTime);
  viewingJobTime.value = jobTime;
  showJobTimeDetailsModal.value = true;
}

function closeJobTimeDetailsModal() {
  showJobTimeDetailsModal.value = false;
  viewingJobTime.value = null;
}

function editJobTime(jobTime: JobTime) {
  console.log("Edit job time:", jobTime);
  editingJobTime.value = jobTime;

  // Llenar el formulario con los datos actuales
  jobTimeEditForm.folder_name = jobTime.folder_name || "";
  jobTimeEditForm.caducate = jobTime.caducate;
  jobTimeEditForm.type = jobTime.type || "autónomo";
  jobTimeEditForm.status = jobTime.status;

  // Formatear execution_time para el input datetime-local
  if (jobTime.execution_time) {
    const dt = DateTime.fromISO(jobTime.execution_time).setZone(
      "America/Argentina/Buenos_Aires"
    );
    jobTimeEditForm.execution_time = dt.toFormat("yyyy-MM-dd'T'HH:mm");
  }

  showEditJobTimeModal.value = true;
  // Cerrar modal de detalles si está abierto
  showJobTimeDetailsModal.value = false;
}

function closeEditJobTimeModal() {
  showEditJobTimeModal.value = false;
  editingJobTime.value = null;
  resetJobTimeEditForm();
}

function resetJobTimeEditForm() {
  jobTimeEditForm.folder_name = "";
  jobTimeEditForm.caducate = "";
  jobTimeEditForm.execution_time = "";
  jobTimeEditForm.type = "autónomo";
  jobTimeEditForm.status = "PENDING";
}

function validateCaducate(caducate: string): boolean {
  // Validar formato DD/MM
  const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])$/;
  return regex.test(caducate);
}

async function handleSaveJobTime() {
  if (!editingJobTime.value) return;

  // Validaciones
  if (!jobTimeEditForm.caducate.trim()) {
    showErrorToast("Error", "El campo Vencimiento es obligatorio");
    return;
  }

  if (!validateCaducate(jobTimeEditForm.caducate)) {
    showErrorToast(
      "Error",
      "El formato de Vencimiento debe ser DD/MM (ej: 25/12)"
    );
    return;
  }

  if (!jobTimeEditForm.execution_time) {
    showErrorToast("Error", "La fecha y hora de ejecución son obligatorias");
    return;
  }

  userModalLoading.value = true;

  try {
    // Convertir execution_time a ISO string con timezone Buenos Aires
    const executionDateTime = DateTime.fromFormat(
      jobTimeEditForm.execution_time,
      "yyyy-MM-dd'T'HH:mm",
      { zone: "America/Argentina/Buenos_Aires" }
    );

    const updateData = {
      folder_name: jobTimeEditForm.folder_name.trim() || null,
      caducate: jobTimeEditForm.caducate.trim(),
      execution_time: executionDateTime.toISO(),
      type: jobTimeEditForm.type,
      status: jobTimeEditForm.status,
    };

    await vepApi.updateJobTime(editingJobTime.value.id, updateData);

    showSuccessToast(
      "Job Time Actualizado",
      `El job time #${editingJobTime.value.id} ha sido actualizado exitosamente`
    );

    closeEditJobTimeModal();
    await loadJobTimes();
  } catch (error: any) {
    console.error("Error updating job time:", error);
    showErrorToast("Error", error.message || "Error al actualizar el job time");
  } finally {
    userModalLoading.value = false;
  }
}

function confirmDeleteJobTime(jobTime: JobTime) {
  deletingJobTime.value = jobTime;
  showDeleteJobTimeConfirm.value = true;
}

function cancelDeleteJobTime() {
  showDeleteJobTimeConfirm.value = false;
  deletingJobTime.value = null;
}

async function handleDeleteJobTime() {
  if (!deletingJobTime.value) return;

  deleteLoading.value = true;

  try {
    await vepApi.deleteJobTime(deletingJobTime.value.id);

    showSuccessToast(
      "Job Time Eliminado",
      `El job time #${deletingJobTime.value.id} ha sido eliminado exitosamente`
    );

    cancelDeleteJobTime();
    await loadJobTimes();
  } catch (error: any) {
    console.error("Error deleting job time:", error);
    showErrorToast("Error", error.message || "Error al eliminar el job time");
  } finally {
    deleteLoading.value = false;
  }
}

// Initialize
onMounted(() => {
  loadFolders();
  // Set initial stats
  recentFiles.value = 12;
});

// --- File viewer state & helpers ---
const showViewer = ref(false);
const viewerBlobUrl = ref<string | null>(null);
const viewerBlob = ref<Blob | null>(null);
const viewerFileName = ref("");
const viewerFileType = ref("");
const viewerText = ref("");

function isPdf(name: string) {
  return name?.toLowerCase().endsWith(".pdf");
}

function isImage(name: string) {
  return /\.(jpg|jpeg|png|gif)$/i.test(name || "");
}

function isText(name: string) {
  return /\.(txt|json|xml)$/i.test(name || "");
}

async function openViewer(item: FolderItem) {
  // Determine key and filename
  const key = item.key;
  const fileName = item.name || key.split("/").pop() || "archivo";

  viewerFileName.value = fileName;
  viewerFileType.value = "";
  viewerText.value = "";
  viewerBlob.value = null;
  if (viewerBlobUrl.value) {
    URL.revokeObjectURL(viewerBlobUrl.value);
    viewerBlobUrl.value = null;
  }

  showViewer.value = true;

  try {
    // Prefer download-by-key endpoint
    const blob = await vepApi.downloadFileByKey(key);

    viewerBlob.value = blob;
    viewerFileType.value = blob.type || "";
    viewerBlobUrl.value = URL.createObjectURL(blob);

    if (isText(fileName)) {
      // Read text content
      try {
        viewerText.value = await blob.text();
      } catch (e) {
        viewerText.value = "No se pudo leer el contenido como texto.";
      }
    }
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "No se pudo obtener el archivo",
      color: "error",
    });
    showViewer.value = false;
  }
}

function closeViewer() {
  showViewer.value = false;
  if (viewerBlobUrl.value) {
    URL.revokeObjectURL(viewerBlobUrl.value);
    viewerBlobUrl.value = null;
  }
  viewerBlob.value = null;
  viewerFileName.value = "";
  viewerFileType.value = "";
  viewerText.value = "";
}

async function downloadFile(item: FolderItem) {
  try {
    const key = item.key;
    const fileName = item.name || key.split("/").pop() || "archivo";
    // Use download by key
    const blob = await vepApi.downloadFileByKey(key);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "Error descargando archivo",
      color: "error",
    });
  }
}

async function downloadViewerFile() {
  if (!viewerBlob.value) {
    toast.add({
      title: "Error",
      description: "No hay archivo cargado para descargar",
      color: "error",
    });
    return;
  }

  try {
    const url = URL.createObjectURL(viewerBlob.value);
    const a = document.createElement("a");
    a.href = url;
    a.download = viewerFileName.value || "archivo";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: "Error descargando archivo",
      color: "error",
    });
  }
}

// QR Code functions
async function confirmQrGeneration() {
  showQrConfirmation.value = false;
  qrLoading.value = true;

  try {
    const qrBlob = await vepApi.getQrCode();

    // Clean up previous URL if exists
    if (qrImageUrl.value) {
      URL.revokeObjectURL(qrImageUrl.value);
    }

    qrImageUrl.value = URL.createObjectURL(qrBlob);
    showQrCode.value = true;

    toast.add({
      title: "Código QR generado",
      description: "El código QR está listo para ser escaneado",
      color: "success",
    });
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message || "Error al generar el código QR",
      color: "error",
    });
  } finally {
    qrLoading.value = false;
  }
}

function cancelQrGeneration() {
  showQrConfirmation.value = false;
}

function closeQrCode() {
  showQrCode.value = false;
  if (qrImageUrl.value) {
    URL.revokeObjectURL(qrImageUrl.value);
    qrImageUrl.value = null;
  }
}

// Enviar VEPs functions
function openEnviarModal() {
  console.log("Opening Enviar modal...");
  showEnviarModal.value = true;
  enviarStep.value = 1;
  loadFoldersForEnviar();
  loadEnviarUsers();
}

function closeEnviarModal() {
  showEnviarModal.value = false;
  enviarStep.value = 1;
  selectedFolder.value = "";
  selectedUsers.value.clear();
  enviarUsers.value = [];
  matchResults.value = [];
  resetEnviarFilters();
}

function resetEnviarFilters() {
  enviarSearchTerm.value = "";
  enviarSearchField.value = "Todos los campos";
  enviarTypeFilter.value = "Credencial";
  enviarCurrentPage.value = 1;
}

async function loadFoldersForEnviar() {
  foldersLoading.value = true;
  try {
    const response = await vepApi.listAllFolders();
    console.log("Folders API response:", response);
    // Convertir las carpetas al formato requerido por USelect
    availableFolders.value = response.folders.map((folder) => ({
      label: folder,
      value: folder,
    }));
    console.log("Available folders for selector:", availableFolders.value);
  } catch (error: any) {
    console.error("Error loading folders for enviar:", error);
    showErrorToast("Error", error.message || "Error al cargar carpetas");
  } finally {
    foldersLoading.value = false;
  }
}

async function loadEnviarUsers() {
  enviarUsersLoading.value = true;

  try {
    const fieldValue = searchFieldMap[enviarSearchField.value] || undefined;
    const typeValue = typeFilterMap[enviarTypeFilter.value] || undefined;
    const searchValue = enviarSearchTerm.value.trim() || undefined;

    const response = await vepApi.getVepUsersPaginated(
      enviarCurrentPage.value,
      enviarPageSize.value,
      searchValue,
      fieldValue,
      typeValue as "autónomo" | "credencial" | "monotributo" | undefined
    );

    enviarUsers.value = response.data;
    enviarTotalUsers.value = response.total;
    enviarTotalPages.value = response.totalPages;
  } catch (error: any) {
    showErrorToast("Error", error.message || "Error al cargar usuarios");
  } finally {
    enviarUsersLoading.value = false;
  }
}

let enviarSearchTimeout: NodeJS.Timeout | null = null;

function handleEnviarSearch() {
  if (enviarSearchTimeout) {
    clearTimeout(enviarSearchTimeout);
  }

  enviarSearchTimeout = setTimeout(async () => {
    enviarCurrentPage.value = 1;
    enviarIsSearching.value = true;
    await loadEnviarUsers();
    enviarIsSearching.value = false;
  }, 300);
}

function clearEnviarSearch() {
  resetEnviarFilters();
  loadEnviarUsers();
}

function toggleUserSelection(userId: number) {
  if (selectedUsers.value.has(userId)) {
    selectedUsers.value.delete(userId);
  } else {
    selectedUsers.value.add(userId);
  }
}

function selectAllEnviarUsers() {
  // Seleccionar todos los usuarios de la página actual
  enviarUsers.value.forEach(user => {
    selectedUsers.value.add(user.id);
  });
}

function deselectAllEnviarUsers() {
  // Deseleccionar todos los usuarios
  selectedUsers.value.clear();
}

function selectAllUsers() {
  enviarUsers.value.forEach((user) => {
    selectedUsers.value.add(user.id);
  });
}

function deselectAllUsers() {
  selectedUsers.value.clear();
}

async function handleTypeFilterChange() {
  if (selectedUsers.value.size > 0) {
    // Mostrar confirmación antes de cambiar filtro
    if (
      confirm(
        "Cambiar el filtro de tipo deseleccionará todos los usuarios seleccionados. ¿Continuar?"
      )
    ) {
      selectedUsers.value.clear();
      enviarCurrentPage.value = 1;
      await loadEnviarUsers();
    } else {
      // Revertir el cambio si el usuario cancela
      return;
    }
  } else {
    enviarCurrentPage.value = 1;
    await loadEnviarUsers();
  }
}

function changeEnviarPage(page: number) {
  enviarCurrentPage.value = page;
  loadEnviarUsers();
}

async function handleEnviarPageSizeChange() {
  console.log("Enviar page size changed to:", enviarPageSize.value);
  enviarCurrentPage.value = 1;
  await loadEnviarUsers();
}

function getEnviarVisiblePages() {
  const pages = [];
  const total = enviarTotalPages.value;
  const current = enviarCurrentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push("...");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
}

async function proceedToMatching() {
  if (!selectedFolder.value) {
    showErrorToast("Error", "Debe seleccionar una carpeta");
    return;
  }

  if (selectedUsers.value.size === 0) {
    showErrorToast("Error", "Debe seleccionar al menos un usuario");
    return;
  }

  matchingInProgress.value = true;

  try {
    // Obtener contenido de la carpeta
    const folderContents = await vepApi.getFolderContents(selectedFolder.value);
    console.log("Folder contents:", folderContents);

    // Obtener usuarios seleccionados
    const selectedUsersList = enviarUsers.value.filter((user) =>
      selectedUsers.value.has(user.id)
    );

    // Realizar matcheo en memoria por CUIT
    const results = selectedUsersList.map((user) => {
      const mainCuit = user.cuit;
      const associatedCuits = user.joined_users?.map((ju) => ju.cuit) || [];
      const allCuits = [mainCuit, ...associatedCuits].filter(Boolean);

      // Buscar archivos por CUIT
      const foundFiles = [];
      const missingCuits = [];

      for (const cuit of allCuits) {
        // Buscar archivo que contenga este CUIT
        const matchingFile = folderContents.items.find(
          (item) =>
            item.name.includes(`[${cuit}]`) && item.name.endsWith(".pdf")
        );

        if (matchingFile) {
          foundFiles.push({ cuit, fileName: matchingFile.name });
        } else {
          missingCuits.push(cuit);
        }
      }

      // Determinar el estado del match
      if (foundFiles.length === 0) {
        // Ningún archivo encontrado - ROJO
        return {
          user,
          matched: false,
          matchType: "none" as const,
          description: `No se encontró archivo para ningún CUIT: ${allCuits.join(
            ", "
          )}`,
          foundFiles: [],
          missingCuits: allCuits,
          fileName: undefined,
        };
      } else if (missingCuits.length > 0) {
        // Algunos archivos encontrados, otros faltantes - AMARILLO
        const mainCuitFound = foundFiles.some((f) => f.cuit === mainCuit);
        const missingAssociated = missingCuits.filter(
          (cuit) => cuit !== mainCuit
        );

        let description = "";
        if (!mainCuitFound) {
          description = `Falta archivo para CUIT principal: ${mainCuit}`;
        } else if (missingAssociated.length > 0) {
          description = `Archivo principal encontrado, faltan usuarios asociados: ${missingAssociated.join(
            ", "
          )}`;
        }

        return {
          user,
          matched: true,
          matchType: "partial" as const,
          description,
          foundFiles,
          missingCuits,
          fileName: foundFiles[0]?.fileName, // Para compatibilidad
        };
      } else {
        // Todos los archivos encontrados - VERDE
        return {
          user,
          matched: true,
          matchType: "exact" as const,
          description: `Todos los archivos encontrados (${foundFiles.length} archivos)`,
          foundFiles,
          missingCuits: [],
          fileName: foundFiles[0]?.fileName, // Para compatibilidad
        };
      }
    });

    // Ordenar resultados por prioridad: rojo (none) > amarillo (partial) > verde (exact)
    const sortedResults = results.sort((a, b) => {
      const priorityOrder = { none: 0, partial: 1, exact: 2 };
      return priorityOrder[a.matchType] - priorityOrder[b.matchType];
    });

    matchResults.value = sortedResults;
    enviarStep.value = 2;
  } catch (error: any) {
    showErrorToast("Error", error.message || "Error al procesar archivos");
  } finally {
    matchingInProgress.value = false;
  }
}

function backToSelection() {
  enviarStep.value = 1;
}

function backToResults() {
  enviarStep.value = 2;
}

function proceedToActions() {
  enviarStep.value = 3;
}

// Funciones de programación
function openScheduleModal() {
  showScheduleModal.value = true;
  // Inicializar con fecha de mañana y hora actual en timezone Buenos Aires
  const nowBA = DateTime.now().setZone("America/Argentina/Buenos_Aires");
  const tomorrowBA = nowBA.plus({ days: 1 });

  scheduleDate.value = tomorrowBA.toISODate(); // YYYY-MM-DD format
  scheduleTime.value = nowBA.toFormat("HH:mm");

  // Inicializar caducate con el día y mes de mañana
  scheduleCaducate.value = tomorrowBA.toFormat("dd/MM");
}

function closeScheduleModal() {
  showScheduleModal.value = false;
  scheduleDate.value = "";
  scheduleTime.value = "";
  scheduleCaducate.value = "";
}

function formatScheduleDateTime(date: string, time: string) {
  // Crear DateTime en timezone Buenos Aires
  const dateTimeBA = DateTime.fromISO(`${date}T${time}`, {
    zone: "America/Argentina/Buenos_Aires",
  });

  return dateTimeBA.toLocaleString(
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    },
    { locale: "es-AR" }
  );
}

async function confirmSchedule() {
  if (!scheduleDate.value || !scheduleTime.value || !scheduleCaducate.value)
    return;

  // Validar caducate
  if (!validateCaducate(scheduleCaducate.value)) {
    showErrorToast(
      "Error",
      "El formato de Vencimiento debe ser DD/MM (ej: 25/12)"
    );
    return;
  }

  schedulingInProgress.value = true;

  try {
    // Crear DateTime en timezone Buenos Aires
    const scheduledDateTimeBA = DateTime.fromISO(
      `${scheduleDate.value}T${scheduleTime.value}`,
      {
        zone: "America/Argentina/Buenos_Aires",
      }
    );

    // Obtener usuarios con archivos encontrados (verdes y amarillos)
    const matchedUsers = matchResults.value
      .filter((result) => result.matched)
      .map((result) => ({ ...result.user, sent: false })); // Agregar sent: false por defecto

    // Console log del JSON como solicitado
    const scheduleData = {
      scheduledDateTime: scheduledDateTimeBA.toISO(), // ISO string con timezone
      scheduledDateTimeLocal: scheduledDateTimeBA.toFormat(
        "yyyy-MM-dd HH:mm:ss ZZZZ"
      ), // Formato legible con timezone
      timezone: "America/Argentina/Buenos_Aires",
      folderName: selectedFolder.value, // Nombre de la carpeta seleccionada
      caducate: scheduleCaducate.value, // Campo caducate
      users: matchedUsers,
      totalUsers: matchedUsers.length,
      exactMatches: matchResults.value.filter(
        (r) => r.matched && r.matchType === "exact"
      ).length,
      partialMatches: matchResults.value.filter(
        (r) => r.matched && r.matchType === "partial"
      ).length,
    };

    console.log(
      "📅 PROGRAMAR EJECUCIÓN:",
      JSON.stringify(scheduleData, null, 2)
    );

    // Crear JobTime en la base de datos
    const jobTimeData = {
      users: matchedUsers,
      execution_time: scheduledDateTimeBA.toISO(),
      type:
        enviarTypeFilter.value !== "Todos los tipos"
          ? (typeFilterMap[enviarTypeFilter.value] as
              | "autónomo"
              | "credencial"
              | "monotributo")
          : undefined,
      folder_name: selectedFolder.value,
      caducate: scheduleCaducate.value, // Campo caducate obligatorio
      status: "PENDING" as const,
    };

    await vepApi.createJobTime(jobTimeData);

    showSuccessToast(
      "Ejecución Programada",
      `Envío programado para ${formatScheduleDateTime(
        scheduleDate.value,
        scheduleTime.value
      )}`
    );

    closeScheduleModal();
    closeEnviarModal();

    // Recargar job times si estamos en esa pestaña
    if (activeTab.value === "jobtimes") {
      await loadJobTimes();
    }
  } catch (error: any) {
    showErrorToast("Error", error.message || "Error al programar la ejecución");
  } finally {
    schedulingInProgress.value = false;
  }
}

function confirmExecuteNow() {
  // Inicializar caducate con fecha actual
  const nowBA = DateTime.now().setZone('America/Argentina/Buenos_Aires');
  executeNowCaducate.value = nowBA.toFormat('dd/MM');
  
  // Verificar si hay usuarios sin match
  const usersWithoutMatch = matchResults.value.filter((r) => !r.matched);

  if (usersWithoutMatch.length > 0) {
    // Si hay usuarios sin match, mostrar la confirmación final primero
    showExecuteNowFinalConfirm.value = true;
  } else {
    // Si todos tienen match, mostrar la confirmación normal
    showExecuteNowConfirm.value = true;
  }
}

function cancelExecuteNow() {
  showExecuteNowConfirm.value = false;
  executeNowCaducate.value = '';
}

function proceedWithExecution() {
  // Cerrar la confirmación final y mostrar la confirmación normal
  showExecuteNowFinalConfirm.value = false;
  showExecuteNowConfirm.value = true;
}

function cancelExecuteNowFinal() {
  showExecuteNowFinalConfirm.value = false;
  executeNowCaducate.value = '';
}

async function executeNow() {
  // Validar caducate
  if (!executeNowCaducate.value.trim()) {
    showErrorToast('Error', 'El campo Vencimiento es obligatorio')
    return
  }
  
  if (!validateCaducate(executeNowCaducate.value)) {
    showErrorToast('Error', 'El formato de Vencimiento debe ser DD/MM (ej: 25/12)')
    return
  }

  try {
    // Obtener tiempo actual en timezone Buenos Aires
    const nowBA = DateTime.now().setZone("America/Argentina/Buenos_Aires");

    // Usar caducate seleccionado por el usuario
    const caducateToUse = executeNowCaducate.value || nowBA.toFormat("dd/MM");

    // Obtener usuarios con archivos encontrados (verdes y amarillos)
    const matchedUsers = matchResults.value
      .filter((result) => result.matched)
      .map((result) => ({ ...result.user, sent: false })); // Agregar sent: false por defecto

    // Console log del JSON como solicitado
    const executeData = {
      executionTime: nowBA.toISO(), // ISO string con timezone
      executionTimeLocal: nowBA.toFormat("yyyy-MM-dd HH:mm:ss ZZZZ"), // Formato legible con timezone
      timezone: "America/Argentina/Buenos_Aires",
      folderName: selectedFolder.value, // Nombre de la carpeta seleccionada
      caducate: caducateToUse, // Campo caducate seleccionado
      users: matchedUsers,
      totalUsers: matchedUsers.length,
      exactMatches: matchResults.value.filter(
        (r) => r.matched && r.matchType === "exact"
      ).length,
      partialMatches: matchResults.value.filter(
        (r) => r.matched && r.matchType === "partial"
      ).length,
    };

    console.log("🚀 EJECUTAR AHORA:", JSON.stringify(executeData, null, 2));

    // Crear JobTime en la base de datos con status FINISHED (ya que se ejecuta inmediatamente)
    const jobTimeData = {
      users: matchedUsers,
      execution_time: nowBA.toISO(),
      type:
        enviarTypeFilter.value !== "Todos los tipos"
          ? (typeFilterMap[enviarTypeFilter.value] as
              | "autónomo"
              | "credencial"
              | "monotributo")
          : undefined,
      folder_name: selectedFolder.value,
      caducate: caducateToUse, // Campo caducate obligatorio
      status: "PENDING" as const,
    };

    await vepApi.createJobTime(jobTimeData);

    showSuccessToast(
      "Envío Programado",
      `El envío de ${matchedUsers.length} archivos VEP se ejecutará en los próximos minutos`
    );

    // Cerrar modales y resetear
    showExecuteNowConfirm.value = false;
    showExecuteNowFinalConfirm.value = false;
    executeNowCaducate.value = '';
    closeEnviarModal();

    // Recargar job times si estamos en esa pestaña
    if (activeTab.value === "jobtimes") {
      await loadJobTimes();
    }
  } catch (error: any) {
    showErrorToast("Error", error.message || "Error al ejecutar el envío");
    showExecuteNowConfirm.value = false;
    showExecuteNowFinalConfirm.value = false;
    executeNowCaducate.value = '';
  }
}

// VEP Users functions
async function loadUsers() {
  console.log(
    "Loading users with pageSize:",
    pageSize.value,
    "currentPage:",
    currentPage.value
  );
  usersLoading.value = true;

  try {
    // Usar siempre el endpoint paginado con todos los filtros
    const fieldValue = searchFieldMap[searchField.value] || undefined;
    const typeValue = typeFilterMap[typeFilter.value] || undefined;
    const searchValue = searchTerm.value.trim() || undefined;

    const response = await vepApi.getVepUsersPaginated(
      currentPage.value,
      pageSize.value,
      searchValue,
      fieldValue,
      typeValue as "autónomo" | "credencial" | "monotributo" | undefined
    );

    users.value = response.data;
    totalUsers.value = response.total;
    totalPages.value = response.totalPages;

    console.log(
      "Users loaded:",
      response.data.length,
      "users, total:",
      response.total,
      "with filters:",
      {
        search: searchValue,
        field: fieldValue,
        type: typeValue,
      }
    );
  } catch (error: any) {
    console.error("Error loading users:", error);
    showErrorToast("Error", error.message || "Error al cargar usuarios");
  } finally {
    usersLoading.value = false;
  }
}

// User search functions
let userSearchTimeout: NodeJS.Timeout | null = null;

function handleUserSearch() {
  console.log(
    "Search triggered with field:",
    searchField.value,
    "term:",
    searchTerm.value
  );
  if (userSearchTimeout) {
    clearTimeout(userSearchTimeout);
  }

  userSearchTimeout = setTimeout(async () => {
    currentPage.value = 1;
    isSearching.value = true;
    await loadUsers();
    isSearching.value = false;
  }, 300); // Debounce 300ms
}

function clearUserSearch() {
  searchTerm.value = "";
  searchField.value = "Todos los campos";
  typeFilter.value = "Todos los tipos";
  currentPage.value = 1;
  loadUsers();
}

async function handlePageSizeChange() {
  console.log("Page size changed to:", pageSize.value);
  currentPage.value = 1;
  await loadUsers();
}

// Funciones para manejar usuarios asociados dinámicamente
function addJoinedUser() {
  if (!userForm.joined_users) {
    userForm.joined_users = [];
  }
  userForm.joined_users.push({
    name: "",
    cuit: "",
  });
}

function removeJoinedUser(index: number) {
  if (userForm.joined_users && userForm.joined_users.length > index) {
    userForm.joined_users.splice(index, 1);
  }
}

// Funciones helper para notificaciones personalizadas
function showErrorToast(title: string, description: string) {
  // Crear notificación personalizada
  createCustomNotification(title, description, "error");
}

function showSuccessToast(title: string, description: string) {
  // Crear notificación personalizada
  createCustomNotification(title, description, "success");
}

function createCustomNotification(
  title: string,
  description: string,
  type: "error" | "success"
) {
  if (process.client) {
    // Crear el elemento de notificación
    const notification = document.createElement("div");
    notification.className = `
      fixed top-4 right-4 z-50 max-w-sm w-full
      ${
        type === "error"
          ? "bg-red-600 border-red-700"
          : "bg-green-600 border-green-700"
      }
      border rounded-lg shadow-lg p-4 mb-4
      transform transition-all duration-300 ease-in-out
      translate-x-full opacity-0
    `;

    notification.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            ${
              type === "error"
                ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>'
                : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>'
            }
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <h3 class="text-sm font-semibold text-white">${title}</h3>
          <p class="text-sm text-white/90 mt-1">${description}</p>
        </div>
        <div class="ml-4 flex-shrink-0">
          <button class="inline-flex text-white/80 hover:text-white focus:outline-none" onclick="this.parentElement.parentElement.parentElement.remove()">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Agregar al DOM
    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.classList.remove("translate-x-full", "opacity-0");
      notification.classList.add("translate-x-0", "opacity-100");
    }, 10);

    // Auto-remover después de 5 segundos
    setTimeout(
      () => {
        notification.classList.add("translate-x-full", "opacity-0");
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      },
      type === "error" ? 5000 : 3000
    );
  }
}

// Funciones para transformar nombres reales a mayúsculas
function handleRealNameInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const upperValue = target.value.toUpperCase();
  userForm.real_name = upperValue;
  // Actualizar el valor del input para que se muestre en mayúsculas
  target.value = upperValue;
  console.log(
    "Transforming real name to uppercase:",
    target.value,
    "to",
    upperValue
  );
}

function handleJoinedUserNameInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const upperValue = target.value.toUpperCase();
  if (userForm.joined_users && userForm.joined_users[index]) {
    userForm.joined_users[index].name = upperValue;
    // Actualizar el valor del input para que se muestre en mayúsculas
    target.value = upperValue;
    console.log(
      "Transforming joined user name to uppercase:",
      target.value,
      "to",
      upperValue
    );
  }
}

function openUserModal(user?: VepUser) {
  if (user) {
    editingUser.value = user;
    Object.assign(userForm, {
      ...user,
      // Asegurar que joined_users sea un array válido
      joined_users: user.joined_users ? [...user.joined_users] : [],
    });
  } else {
    editingUser.value = null;
    resetUserForm();
  }
  showUserModal.value = true;
}

function resetUserForm() {
  Object.assign(userForm, {
    alter_name: "",
    real_name: "",
    mobile_number: "",
    cuit: "",
    execution_date: null,
    is_group: false,
    last_execution: null,
    need_papers: null,
    need_z: null,
    need_compra: null,
    need_auditoria: null,
    // NUEVO: Array vacío para usuarios asociados
    joined_users: [],
    // NUEVO: Tipo de usuario por defecto
    type: "credencial",
  });
}

function closeUserModal() {
  showUserModal.value = false;
  editingUser.value = null;
  resetUserForm();
}

async function handleSaveUser() {
  // Validar campos obligatorios básicos
  if (
    !userForm.alter_name.trim() ||
    !userForm.real_name.trim() ||
    !userForm.mobile_number.trim() ||
    !userForm.cuit.trim()
  ) {
    showErrorToast(
      "Error",
      "Los campos obligatorios (nombre alternativo, nombre real, teléfono móvil y CUIT) deben estar completos"
    );
    return;
  }

  // Validar usuarios asociados si existen
  if (userForm.joined_users && userForm.joined_users.length > 0) {
    for (let i = 0; i < userForm.joined_users.length; i++) {
      const joinedUser = userForm.joined_users[i];
      if (!joinedUser.name.trim() || !joinedUser.cuit.trim()) {
        showErrorToast(
          "Error",
          `El usuario asociado #${i + 1} debe tener nombre y CUIT completos`
        );
        return;
      }
    }
  }

  userModalLoading.value = true;

  try {
    if (editingUser.value) {
      const formWithOutId = {
        alter_name: userForm.alter_name,
        real_name: userForm.real_name,
        mobile_number: userForm.mobile_number,
        cuit: userForm.cuit,
        execution_date: userForm.execution_date,
        is_group: userForm.is_group,
        last_execution: null,
        need_papers: userForm.need_papers,
        need_z: userForm.need_z,
        need_compra: userForm.need_compra,
        need_auditoria: userForm.need_auditoria,
        joined_users: userForm.joined_users,
        type: userForm.type,
      };
      // Actualizar usuario existente
      const updatedUser = await vepApi.updateVepUser(
        editingUser.value.id,
        formWithOutId
      );

      // Actualizar en la lista local
      const index = users.value.findIndex(
        (u) => u.id === editingUser.value!.id
      );
      if (index !== -1) {
        users.value[index] = updatedUser;
      }

      showSuccessToast(
        "Usuario actualizado",
        `${updatedUser.alter_name} ha sido actualizado exitosamente`
      );
    } else {
      // Crear nuevo usuario
      const newUser = await vepApi.createVepUser(userForm);

      // Si no estamos en búsqueda y estamos en la primera página, agregar al principio
      if (!searchTerm.value.trim() && currentPage.value === 1) {
        users.value.unshift(newUser);
        // Si excede el pageSize, quitar el último
        if (users.value.length > pageSize.value) {
          users.value.pop();
        }
      }

      // Actualizar totales
      totalUsers.value += 1;
      totalPages.value = Math.ceil(totalUsers.value / pageSize.value);

      showSuccessToast(
        "Usuario creado",
        `${newUser.alter_name} ha sido creado exitosamente`
      );
    }

    closeUserModal();
  } catch (error: any) {
    showErrorToast("Error", error.message || "Error al guardar usuario");
  } finally {
    userModalLoading.value = false;
  }
}

function cancelDelete() {
  showDeleteConfirm.value = false;
  deletingUser.value = null;
}

async function handleDeleteUser() {
  if (!deletingUser.value) return;

  deleteLoading.value = true;

  try {
    await vepApi.deleteVepUser(deletingUser.value.id);

    // Remover de la lista local
    users.value = users.value.filter((u) => u.id !== deletingUser.value!.id);

    // Actualizar totales
    totalUsers.value -= 1;
    totalPages.value = Math.ceil(totalUsers.value / pageSize.value);

    // Si la página actual está vacía y no es la primera, ir a la anterior
    if (users.value.length === 0 && currentPage.value > 1) {
      currentPage.value -= 1;
      await loadUsers();
    }

    showSuccessToast(
      "Usuario eliminado",
      `${deletingUser.value.alter_name} ha sido eliminado exitosamente`
    );

    cancelDelete();
  } catch (error: any) {
    showErrorToast("Error", error.message || "Error al eliminar usuario");
  } finally {
    deleteLoading.value = false;
  }
}

function confirmDelete(user: VepUser) {
  deletingUser.value = user;
  showDeleteConfirm.value = true;
}

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadUsers();
  }
}

function getVisiblePages() {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push("...");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
}
</script>
