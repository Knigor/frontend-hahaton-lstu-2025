import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'
import { useProfile } from '~/modules/main/composables/useProfile'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { refreshToken } = useAuth()
  const { getProfile } = useProfile()

  console.log('вызываем middleware', localStorage.getItem('firstLogin'))

  const publicRoutes = ['/authorization', '/register']

  if (authStore.accessToken === null) {
    const response = await refreshToken()

    if (response.success) {
      if (localStorage.getItem('firstLogin')) {
        return navigateTo('/')
      } else {
        return navigateTo('/start')
      }
    }

    if (response?.error?.status === 401 && !publicRoutes.includes(to.path)) {
      return navigateTo('/authorization')
    }

    if (response?.error) {
      console.error('refreshToken error', response.error.status)
    }
  }
})
