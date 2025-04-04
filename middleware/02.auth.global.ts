import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { refreshToken } = useAuth()

  if (authStore.accessToken === null) {
    const response = await refreshToken()

    if (
      response.error.status === 401 &&
      to.path !== '/authorization' &&
      !authStore.accessToken
    ) {
      return navigateTo('/authorization')
    }

    if (response.error) {
      console.error('refreshToken error', response.error.status)
    }
  }
})
