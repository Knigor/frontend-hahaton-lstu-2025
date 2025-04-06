<script setup lang="ts">
import { CircleUserRound } from 'lucide-vue-next'
import { LogOut } from 'lucide-vue-next'
import { UserPen } from 'lucide-vue-next'
import { MessageSquare } from 'lucide-vue-next'
import { RotateCw } from 'lucide-vue-next'
import { ExternalLink } from 'lucide-vue-next'
import ModalStart from '../components/ModalStart.vue'
import ModalChat from '../components/ModalChat.vue'
import SendPlan from '../components/SendPlan.vue'
import ModalRefresh from '../components/ModalRefresh.vue'
import ModalCorrect from '../components/ModalCorrect.vue'
import { User } from 'lucide-vue-next'
import { ListRestart } from 'lucide-vue-next'
import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'

import { MessageSquareQuote } from 'lucide-vue-next'

const openModal = ref(false)
const openChat = ref(false)
const openSend = ref(false)
const openRefresh = ref(false)
const openCorrect = ref(false)

const authStore = useAuthStore()
const { logout } = useAuth()

onMounted(() => {
  if (window.opener) {
    // Отправляем сообщение в родительское окно перед закрытием
    window.opener.postMessage('refreshApp', '*')
    window.close()
  }
})

function openPanel() {}

const handleLogOut = async () => {
  const response = await logout()

  if (response.success) {
    navigateTo('/authorization')
  } else {
    console.error('Ошибка при выходе:', response.error)
  }
}
</script>

<template>
  <div class="flex h-screen w-screen flex-row">
    <div
      class="flex w-16 flex-col items-center border-r-[1px] border-gray-300 pt-[24px] pb-[24px]"
    >
      <div
        class="tooltip tooltip-right hover:borderx mb-auto flex cursor-pointer flex-row rounded-2xl p-2 transition duration-300 hover:rounded-2xl hover:bg-gray-200"
        data-tip="Профиль"
      >
        <UserPen stroke-width="1.5" color="#422AD5" class="h-8 w-8" />
      </div>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Скорректировать план"
      >
        <MessageSquareQuote
          stroke-width="1.5"
          color="#422AD5"
          @click="openCorrect = true"
          class="h-8 w-8"
        />
      </div>

      <ModalCorrect v-model="openCorrect"></ModalCorrect>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Обновить план"
      >
        <ListRestart
          stroke-width="1.5"
          color="#422AD5"
          @click="openRefresh = true"
          class="h-8 w-8"
        />
      </div>

      <ModalRefresh v-model="openRefresh"></ModalRefresh>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Чат с нейронкой"
      >
        <MessageSquare
          @click="openChat = true"
          stroke-width="1.5"
          color="#422AD5"
          class="h-8 w-8"
        />
      </div>

      <ModalChat v-model="openChat"></ModalChat>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Поделиться планом"
      >
        <ExternalLink
          @click="openSend = true"
          stroke-width="1.5"
          color="#422AD5"
          class="h-8 w-8"
        />
      </div>

      <SendPlan v-model="openSend"></SendPlan>

      <div
        class="tooltip tooltip-right mt-auto cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Выход"
      >
        <LogOut @click="handleLogOut" stroke-width="1.5" color="#422AD5" />
      </div>
    </div>
    <div @click="openPanel" class="h-full w-1"></div>
    <slot></slot>
  </div>
</template>

<style scoped></style>
