<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Envíos Programados
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Administra los envíos de VEPs programados
            </p>
          </div>
        </div>
      </template>

      <!-- Loading State -->
      <div v-if="jobTimesLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Cargando envíos programados...</p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div v-if="!jobTimesLoading" class="space-y-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <UInput
              :model-value="searchTerm"
              @update:model-value="$emit('update:searchTerm', $event)"
              placeholder="Buscar envíos programados... (ej: carpeta, tipo, estado)"
              icon="i-heroicons-magnifying-glass"
              @input="$emit('handle-job-time-search')"
              class="w-full"
            />
          </div>
          <div>
            <USelect
              :model-value="searchField"
              @update:model-value="$emit('update:searchField', $event)"
              :items="searchFieldOptions"
              placeholder="Campo"
              class="w-40"
            />
          </div>
          <div>
            <USelect
              :model-value="statusFilter"
              @update:model-value="$emit('update:statusFilter', $event)"
              :items="statusFilterOptions"
              placeholder="Estado"
              class="w-40"
            />
          </div>
          <div>
            <USelect
              :model-value="typeFilter"
              @update:model-value="$emit('update:typeFilter', $event)"
              :items="typeFilterOptions"
              placeholder="Tipo"
              class="w-40"
            />
          </div>
        </div>

        <div v-if="searchTerm" class="flex items-center justify-between">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <template v-if="isSearching">
              Buscando "{{ searchTerm }}"...
            </template>
            <template v-else>
              Resultados para "{{ searchTerm }}" {{ searchField !== 'Todos los campos' ? `en ${searchField.toLowerCase()}` : 'en todos los campos' }}
            </template>
          </p>
          <UButton variant="ghost" size="sm" @click="$emit('clear-job-time-search')">
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
            Limpiar
          </UButton>
        </div>
      </div>

      <!-- Job Times List -->
      <div v-if="jobTimes.length > 0" class="space-y-4">
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Carpeta
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usuarios
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vencimiento(aparece en el mensaje)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ejecutado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Creado
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="jobTime in jobTimes" :key="jobTime.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ jobTime.folder_name || 'Sin carpeta' }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span v-if="jobTime.type" :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    jobTime.type === 'autónomo'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : jobTime.type === 'credencial'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  ]">
                    {{ jobTime.type === 'autónomo' ? 'Autónomo' : jobTime.type === 'credencial' ? 'Credencial' : 'Monotributo' }}
                  </span>
                  <span v-else class="text-sm text-gray-500 dark:text-gray-400">Sin tipo</span>
                </td>
                <td class="px-6 py-4">
                  <span :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    jobTime.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : jobTime.status === 'RUNNING'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : jobTime.status === 'FINISHED'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  ]">
                    {{ 
                      jobTime.status === 'PENDING' ? 'Pendiente' 
                      : jobTime.status === 'RUNNING' ? 'Ejecutando'
                      : jobTime.status === 'FINISHED' ? 'Finalizado' 
                      : 'Error' 
                    }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ jobTime.users?.length || 0 }} usuarios
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1" v-if="jobTime.users && jobTime.users.length > 0">
                      {{ jobTime.users.filter(u => u.sent).length }} enviados
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ jobTime.caducate }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ jobTime.executed_at ? formatDateTime(jobTime.executed_at) : '-' }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDateTime(jobTime.created_at) }}
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <UButton
                      variant="ghost"
                      size="sm"
                      @click="$emit('view-job-time', jobTime)"
                      title="Ver detalles"
                    >
                      <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                    </UButton>
                    <!-- <UButton
                      variant="ghost"
                      size="sm"
                      @click="$emit('edit-job-time', jobTime)"
                      title="Editar"
                    >
                      <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                    </UButton> -->
                    <UButton
                      variant="ghost"
                      size="sm"
                      color="red"
                      @click="$emit('confirm-delete', jobTime)"
                      title="Eliminar"
                    >
                      <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                    </UButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden space-y-4">
          <div v-for="jobTime in jobTimes" :key="jobTime.id" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ jobTime.folder_name || 'Sin carpeta' }}
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ID: {{ jobTime.id }}
                </p>
              </div>
              <div class="flex items-center space-x-2 ml-2">
                <span v-if="jobTime.type" :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  jobTime.type === 'autónomo'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : jobTime.type === 'credencial'
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                ]">
                  {{ jobTime.type === 'autónomo' ? 'Autónomo' : jobTime.type === 'credencial' ? 'Credencial' : 'Monotributo' }}
                </span>
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  jobTime.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : jobTime.status === 'RUNNING'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : jobTime.status === 'FINISHED'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                ]">
                  {{ 
                    jobTime.status === 'PENDING' ? 'Pendiente' 
                    : jobTime.status === 'RUNNING' ? 'Ejecutando'
                    : jobTime.status === 'FINISHED' ? 'Finalizado' 
                    : 'Fallido' 
                  }}
                </span>
              </div>
            </div>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm">
                <UIcon name="i-heroicons-users" class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-gray-900 dark:text-white">
                  {{ jobTime.users?.length || 0 }} usuarios
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-2" v-if="jobTime.users && jobTime.users.length > 0">
                    ({{ jobTime.users.filter(u => u.sent).length }} enviados)
                  </span>
                </span>
              </div>
              <div class="flex items-center text-sm">
                <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-gray-900 dark:text-white">Vencimiento: {{ jobTime.caducate }}</span>
              </div>
              <div class="flex items-center text-sm" v-if="jobTime.executed_at">
                <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-400 mr-2" />
                <span class="text-gray-900 dark:text-white">Ejecutado: {{ formatDateTime(jobTime.executed_at) }}</span>
              </div>
              <div class="flex items-center text-sm">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-gray-900 dark:text-white">Programado: {{ formatDateTime(jobTime.execution_time) }}</span>
              </div>
              <div class="flex items-center text-sm">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-gray-500 dark:text-gray-400">Creado: {{ formatDateTime(jobTime.created_at) }}</span>
              </div>
            </div>
            
            <div class="flex items-center justify-end space-x-2">
              <UButton
                variant="outline"
                size="sm"
                @click="$emit('view-job-time', jobTime)"
              >
                <UIcon name="i-heroicons-eye" class="w-4 h-4 mr-1" />
                Ver
              </UButton>
              <UButton
                variant="outline"
                size="sm"
                @click="$emit('edit-job-time', jobTime)"
              >
                <UIcon name="i-heroicons-pencil" class="w-4 h-4 mr-1" />
                Editar
              </UButton>
              <UButton
                variant="outline"
                size="sm"
                color="red"
                @click="$emit('confirm-delete', jobTime)"
              >
                <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
                Eliminar
              </UButton>
            </div>
          </div>
        </div>

        <!-- Search Results Info -->
        <div v-if="searchTerm.trim()" class="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            {{ totalJobTimes }} resultado{{ totalJobTimes !== 1 ? 's' : '' }} encontrado{{ totalJobTimes !== 1 ? 's' : '' }}
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Mostrando {{ (currentPage - 1) * pageSize + 1 }} a {{ Math.min(currentPage * pageSize, totalJobTimes) }} de {{ totalJobTimes }} envíos programados
            </div>
            <USelect
              :model-value="pageSize"
              @update:model-value="$emit('handle-page-size-change', $event)"
              :items="pageSizeOptions"
              placeholder="Por página"
              class="w-32"
            />
          </div>
          <div class="flex items-center space-x-2">
            <UButton
              variant="outline"
              size="sm"
              :disabled="currentPage <= 1"
              @click="$emit('change-page', currentPage - 1)"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
              Anterior
            </UButton>
            
            <div class="flex items-center space-x-1">
              <template v-for="page in visiblePages" :key="page">
                <UButton
                  v-if="page !== '...'"
                  :variant="page === currentPage ? 'solid' : 'outline'"
                  size="sm"
                  @click="$emit('change-page', page)"
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
              :disabled="currentPage >= totalPages"
              @click="$emit('change-page', currentPage + 1)"
            >
              Siguiente
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!jobTimesLoading" class="text-center py-12">
        <UIcon name="i-heroicons-clock" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ searchTerm ? 'No se encontraron envíos programados' : 'No hay envíos programados registrados' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {{ searchTerm ? 'Prueba con diferentes términos de búsqueda.' : 'Los envíos programados aparecerán aquí cuando programes envíos.' }}
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { JobTime } from '~/types/api'

// Props
interface Props {
  jobTimes: JobTime[]
  jobTimesLoading: boolean
  currentPage: number
  pageSize: number
  totalJobTimes: number
  totalPages: number
  searchTerm: string
  searchField: string
  statusFilter: string
  typeFilter: string
  isSearching: boolean
  searchFieldOptions: Array<{ label: string; value: string }>
  statusFilterOptions: Array<{ label: string; value: string }>
  typeFilterOptions: Array<{ label: string; value: string }>
  pageSizeOptions: Array<{ label: string; value: number }>
  visiblePages: (number | string)[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:searchField': [value: string]
  'update:statusFilter': [value: string]
  'update:typeFilter': [value: string]
  'handle-job-time-search': []
  'clear-job-time-search': []
  'handle-page-size-change': [value: number]
  'change-page': [page: number]
  'view-job-time': [jobTime: JobTime]
  'edit-job-time': [jobTime: JobTime]
  'confirm-delete': [jobTime: JobTime]
}>()

// Helper function to format date/time
function formatDateTime(dateString: string | null): string {
  if (!dateString) return 'Sin fecha'
  
  const dt = DateTime.fromISO(dateString).setZone('America/Argentina/Buenos_Aires')
  
  return dt.toLocaleString({
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }, { locale: 'es-AR' })
}
</script>
