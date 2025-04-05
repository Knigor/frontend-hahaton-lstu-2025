<script setup lang="ts">
import { CircleUserRound } from 'lucide-vue-next'
import { LogOut } from 'lucide-vue-next'
import { UserPen } from 'lucide-vue-next'
import { MessageSquare } from 'lucide-vue-next'
import { RotateCw } from 'lucide-vue-next'
import { ExternalLink } from 'lucide-vue-next'
import ModalStart from '../components/ModalStart.vue'

const openModal = ref(false)

onMounted(() => {
  if (window.opener) {
    // Закрываем popup
    window.close()
    // Устанавливаем флаг в localStorage, чтобы основной странице знать о закрытии popup
    localStorage.setItem('popupClosed', 'true')
  }
})

function openPanel() {}
</script>

<template>
  <div class="flex h-screen w-screen flex-row">
    <div
      class="flex w-16 flex-col items-center border-r-[1px] border-gray-300 pt-[24px] pb-[24px]"
    >
      <div
        class="tooltip tooltip-right mb-[24px] mb-auto flex cursor-pointer flex-row rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Профиль"
      >
        <CircleUserRound class="h-8 w-8" />
      </div>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Изменить данные"
      >
        <UserPen @click="openModal = true" class="h-8 w-8" />
      </div>

      <ModalStart v-model="openModal"></ModalStart>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Чат с нейронкой"
      >
        <MessageSquare class="h-8 w-8" />
      </div>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Поделиться планом"
      >
        <ExternalLink class="h-8 w-8" />
      </div>

      <div
        class="tooltip tooltip-right mt-auto cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Выход"
      >
        <LogOut />
      </div>
    </div>
    <div @click="openPanel" class="h-full w-1 cursor-pointer"></div>
    <slot></slot>
  </div>
</template>

<style scoped></style>
