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
                    <div>Пол</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">
                    {{ userStore.sex == 'male' ? 'Мужчина' : 'Женщина' }}
                  </div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Рост</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">{{ userStore.height }} см</div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Вес</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">{{ userStore.weight }} кг</div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Возраст</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">{{ userStore.age }} лет</div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Целевой вес</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">{{ userStore.targetWeight }} кг</div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Дополнительная информация</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">{{ userStore.other }}</div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Спортивный инвентарь</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">
                    {{ equipment[userStore.equipment] }}
                  </div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Текущая форма</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">
                    {{ equipment[userStore.equipment] }}
                  </div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Цель тренировки</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">{{ type[userStore.type] }}</div>
                </fieldset>

                <fieldset class="fieldset w-full">
                  <legend class="fieldset-legend">
                    <div>Текущая форма</div>
                    <div class="text-red-500"></div>
                  </legend>
                  <div class="text-xl">{{ form[userStore.form] }}</div>
                </fieldset>
              </div>

              <div class="mt-4 flex items-center justify-center">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Закрыть
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
import { useUserData } from '~/modules/start/store/user'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const userStore = useUserData()
const isOpen = defineModel()

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const type = {
  strength: 'Увеличение массы',
  fit: 'Поддержка формы',
  thick: 'Похудение'
}

const equipment = {
  minimal: 'Минимальный',
  home: 'Домаший зал',
  gym: 'Упражняюсь в зале'
}

const form = {
  nothing: 'Дрищ',
  walk: 'Иногда хожу',
  fit: 'Поддерживал форму',
  active: 'Активно занимаюсь спортом'
}

console.log(type['stgength'])
</script>

<style scoped>
input {
  width: 100%;
}
select {
  width: 100%;
}
</style>
