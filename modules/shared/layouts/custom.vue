<script setup lang="ts">
import { CircleUserRound } from 'lucide-vue-next'
import { LogOut } from 'lucide-vue-next'
import { UserPen } from 'lucide-vue-next'
import { MessageSquare } from 'lucide-vue-next'
import { RotateCw } from 'lucide-vue-next'
import { ExternalLink } from 'lucide-vue-next'
import ModalStart from '../components/ModalStart.vue'
import { User } from 'lucide-vue-next'
import { ListRestart } from 'lucide-vue-next'
import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'

const openModal = ref(false)

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
        data-tip="Изменить данные"
      >
        <ListRestart
          stroke-width="1.5"
          color="#422AD5"
          @click="openModal = true"
          class="h-8 w-8"
        />
      </div>

      <ModalStart v-model="openModal"></ModalStart>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Чат с нейронкой"
      >
        <MessageSquare stroke-width="1.5" color="#422AD5" class="h-8 w-8" />
      </div>

      <div
        class="tooltip tooltip-right cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Поделиться планом"
      >
        <ExternalLink stroke-width="1.5" color="#422AD5" class="h-8 w-8" />
      </div>

      <div
        class="tooltip tooltip-right mt-auto cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-gray-200"
        data-tip="Выход"
      >
        <LogOut @click="handleLogOut" stroke-width="1.5" color="#422AD5" />
      </div>
    </div>
    <div @click="openPanel" class="h-full w-1 cursor-pointer"></div>
    <slot></slot>
  </div>
</template>

<style scoped></style>
