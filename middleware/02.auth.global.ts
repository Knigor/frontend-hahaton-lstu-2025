import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { refreshToken } = useAuth()

  if (authStore.accessToken === null) {
    console.log('Вызываем refreshToken')

    try {
      await refreshToken()
    } catch (error) {
      console.log(error.status)
      return navigateTo('/authorization')
    }
  }
})
