<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div class="flex items-center justify-between">
                <DialogTitle as="h3" class="text-center text-lg leading-6 font-medium text-gray-900">
                  Поделиться планом
                </DialogTitle>
                <X class="btn-circle cursor-pointer p-3 hover:bg-gray-200" size="32" @click="closeModal" />
              </div>
              <!-- Юзер пишет сообщение -->
              <p class="mb-4">
                Ваш план будет сохранен на комьютер в виде файла который вы можете отправить любому человеку в
                интернете.
              </p>

              <input v-model="fileName" type="text" placeholder="Введите название файла"
                class="input border input-primary mb-4" />
              <button @click="getPlanData" :disabled="!fileName" class="btn btn-primary w-full text-[24px]">Скачать
                план</button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import { usePlan } from '../../main/composables/usePlan'
import { UseTableShare } from '~/modules/shared/composables/useTableShare'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const isOpen = defineModel()
const { downloadPlan } = UseTableShare()
const fileName = ref('')
const { getPlan } = usePlan()
const data = ref(null)
async function getPlanData() {
  closeModal()
  data.value = await getPlan()
  data.value = data.value.response.week_plan
  downloadPlan(data.value, fileName.value)
}

function closeModal() {
  isOpen.value = false
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
