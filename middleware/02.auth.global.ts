import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { refreshToken } = useAuth()

  console.log('вызываем middleware')

  const publicRoutes = ['/authorization', '/register']

  if (authStore.accessToken === null) {
    const response = await refreshToken()

    if (response.success) {
      return navigateTo('/')
    }

    if (response?.error?.status === 401 && !publicRoutes.includes(to.path)) {
      return navigateTo('/authorization')
    }

    if (response?.error) {
      console.error('refreshToken error', response.error.status)
    }
  }
})
