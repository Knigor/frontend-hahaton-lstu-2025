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
                class="text-center text-lg leading-6 font-medium text-gray-900"
              >
                Личные данные
              </DialogTitle>
              <div class="mt-2 flex w-full flex-col items-center">
                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Пон</div>
                    <div class="text-red-500">*</div>
                  </legend>
                  <input
                    type="text"
                    class="input input-natural border"
                    placeholder="Мужской..."
                  />
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Рост</div>
                    <div class="text-red-500">*</div>
                  </legend>
                  <input
                    type="text"
                    class="input input-natural border"
                    placeholder="190см..."
                  />
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Вес</div>
                    <div class="text-red-500">*</div>
                  </legend>
                  <input
                    type="number"
                    class="input input-natural border"
                    placeholder="72 кг..."
                  />
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Возраст</div>
                    <div class="text-red-500">*</div>
                  </legend>
                  <input
                    type="number"
                    class="input input-natural border"
                    placeholder="22 года..."
                  />
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Цель тренировки</div>
                    <div class="text-red-500">*</div>
                  </legend>
                  <select class="select border">
                    <option disabled selected>Выбрать...</option>
                    <option>Масса</option>
                    <option>Всё равно</option>
                    <option>Сброс</option>
                  </select>
                </fieldset>
              </div>

              <div class="mt-4 flex items-center justify-center">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Обновить
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
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const isOpen = defineModel()

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
