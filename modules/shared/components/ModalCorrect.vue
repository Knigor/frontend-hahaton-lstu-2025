<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-start text-lg leading-6 font-medium text-gray-900"
              >
                Скорректировать план
              </DialogTitle>
              <div class="mt-2 flex w-full flex-col items-center"></div>

              <p class="text-sm text-gray-500">
                Укажите данные для корректировки, для того чтобы обновить план
                на неделю
              </p>

              <textarea
                v-model="comment"
                placeholder="Введите текст"
                class="textarea textarea-primary mt-4 resize-none overflow-hidden border border-gray-300"
                rows="1"
                oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              ></textarea>

              <div class="mt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  class="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Отменить
                </button>
                <button
                  type="button"
                  :disabled="isLoading"
                  :class="[
                    'inline-flex w-full items-center justify-center gap-4 rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                    isLoading
                      ? 'cursor-not-allowed bg-blue-400 text-white'
                      : 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
                  ]"
                  @click="handleSendData(comment)"
                >
                  Отправить
                  <span v-if="isLoading" class="loading loading-spinner"></span>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { usePlanGenerate } from '../../start/composables/usePlanGenerate'

const { sendFintess } = usePlanGenerate()
const isOpen = defineModel()
const comment = ref('')
const isLoading = ref(false)

const handleSendData = async (comment) => {
  isLoading.value = true

  try {
    await sendFintess(comment)

    isOpen.value = false
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>

<style scoped>
input {
  width: 100%;
}
select {
  width: 100%;
}
</style>
