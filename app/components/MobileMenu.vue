<template>
  <div class="lg:hidden">
    <!-- Mobile menu button -->
    <UButton
      variant="ghost"
      size="sm"
      @click="isOpen = !isOpen"
      class="p-2"
    >
      <UIcon 
        :name="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" 
        class="h-5 w-5"
      />
    </UButton>

    <!-- Mobile menu overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black bg-opacity-50"
      @click="isOpen = false"
    />

    <!-- Mobile menu panel -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-xl"
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Menú
          </h3>
          <UButton
            variant="ghost"
            size="sm"
            @click="isOpen = false"
            class="p-1"
          >
            <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
          </UButton>
        </div>

        <nav class="p-4 space-y-2">
          <slot :close="() => isOpen = false" />
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

// Close menu when route changes
watch(() => useRoute().path, () => {
  isOpen.value = false
})
</script> 