import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { onRefreshToken } = useAuth()
  console.log(
    Boolean(useCookie('refresh_token').value && to.path === '/authorization')
  )
  if (
    (to.path === '/authorization' && authStore.accessToken) ||
    Boolean(useCookie('refresh_token').value && to.path === '/authorization')
  ) {
    return navigateTo('/')
  }

  if (to.path !== '/authorization' && !authStore.accessToken) {
    console.log('абоба')
    if (authStore.getRefreshToken) {
      try {
        const { success } = await onRefreshToken()
        if (success) return
      } catch (error) {
        console.error(error)
        authStore.logout()
        return navigateTo('/authorization')
      }
    }
    authStore.logout()
    // return navigateTo('/authorization')
  }
})
