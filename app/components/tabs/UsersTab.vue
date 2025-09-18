<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Gestión de Usuarios VEP
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Administra los usuarios del sistema VEP
            </p>
          </div>
          <UButton
            @click="$emit('open-user-modal')"
            size="lg"
            class="w-full sm:w-auto"
          >
            <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
            Nuevo Usuario
          </UButton>
        </div>
      </template>

      <!-- Loading State -->
      <div v-if="usersLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Cargando usuarios...</p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div v-if="!usersLoading" class="space-y-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <UInput
              :model-value="searchTerm"
              @update:model-value="$emit('update:searchTerm', $event)"
              placeholder="Buscar usuarios... (ej: Juan, 12345678, +54911)"
              icon="i-heroicons-magnifying-glass"
              @input="$emit('handle-user-search')"
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
          <UButton variant="ghost" size="sm" @click="$emit('clear-user-search')">
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
            Limpiar
          </UButton>
        </div>
      </div>

      <!-- Users List -->
      <div v-if="users.length > 0" class="space-y-4">
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usuario
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contacto
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  CUIT
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      Apodo: {{ user.alter_name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ user.real_name }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ user.mobile_number }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ user.cuit || '-' }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    user.type === 'autónomo'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  ]">
                    {{ user.type === 'autónomo' ? 'Autónomo' : 'Credencial' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <UButton
                      variant="ghost"
                      size="sm"
                      @click="$emit('open-user-modal', user)"
                      title="Editar"
                    >
                      <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                    </UButton>
                    <UButton
                      variant="ghost"
                      size="sm"
                      color="red"
                      @click="$emit('confirm-delete', user)"
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
          <div v-for="user in users" :key="user.id" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ user.alter_name }}
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ user.real_name }}
                </p>
              </div>
              <span :class="[
                'inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2',
                user.type === 'autónomo'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
              ]">
                {{ user.type === 'autónomo' ? 'Autónomo' : 'Credencial' }}
              </span>
            </div>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm">
                <UIcon name="i-heroicons-phone" class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-gray-900 dark:text-white">{{ user.mobile_number }}</span>
              </div>
              <div class="flex items-center text-sm">
                <UIcon name="i-heroicons-identification" class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-gray-900 dark:text-white">{{ user.cuit || 'Sin CUIT' }}</span>
              </div>
            </div>
            
            <div class="flex items-center justify-end space-x-2">
              <UButton
                variant="outline"
                size="sm"
                @click="$emit('open-user-modal', user)"
              >
                <UIcon name="i-heroicons-pencil" class="w-4 h-4 mr-1" />
                Editar
              </UButton>
              <UButton
                variant="outline"
                size="sm"
                color="red"
                @click="$emit('confirm-delete', user)"
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
            {{ totalUsers }} resultado{{ totalUsers !== 1 ? 's' : '' }} encontrado{{ totalUsers !== 1 ? 's' : '' }}
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="!searchTerm.trim()" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Mostrando {{ (currentPage - 1) * pageSize + 1 }} a {{ Math.min(currentPage * pageSize, totalUsers) }} de {{ totalUsers }} usuarios
            </div>
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
      <div v-else-if="!usersLoading" class="text-center py-12">
        <UIcon name="i-heroicons-users" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados' }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {{ searchTerm ? 'Prueba con diferentes términos de búsqueda.' : 'Comienza creando tu primer usuario VEP.' }}
        </p>
        <UButton
          v-if="!searchTerm"
          @click="$emit('open-user-modal')"
          size="lg"
        >
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
          Crear Usuario
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { VepUser } from '~/types/api'

// Props
interface Props {
  users: VepUser[]
  usersLoading: boolean
  currentPage: number
  pageSize: number
  totalUsers: number
  totalPages: number
  searchTerm: string
  searchField: string
  typeFilter: string
  isSearching: boolean
  searchFieldOptions: Array<{ label: string; value: string }>
  typeFilterOptions: Array<{ label: string; value: string }>
  visiblePages: (number | string)[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'open-user-modal': [user?: VepUser]
  'update:searchTerm': [value: string]
  'update:searchField': [value: string]
  'update:typeFilter': [value: string]
  'handle-user-search': []
  'clear-user-search': []
  'confirm-delete': [user: VepUser]
  'change-page': [page: number]
}>()
</script>
