import { useAuthStore } from '~/modules/auth/store/auth'
import type { $Fetch } from 'ofetch'

export const useAuth = () => {
  const { $publicApi } = useNuxtApp() as unknown as { $publicApi: $Fetch }
  const authStore = useAuthStore()

  const onLogin = async (login: string, password: string) => {
    try {
      const { access: access_token, refresh: refresh_token } = await $publicApi(
        '/api/token/',
        {
          method: 'POST',
          body: { username: login, password }
        }
      )
      authStore.setAccessToken(access_token)
      authStore.setRefreshToken(refresh_token)
      authStore.setScheduleTokenRefresh(access_token, async () => {
        await onRefreshToken()
      })
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const onRefreshToken = async () => {
    try {
      console.log(
        { access: authStore.accessToken, refresh: authStore.getRefreshToken },
        '11'
      )
      const currentRefreshToken = authStore.getRefreshToken
      if (!currentRefreshToken) throw new Error('No refresh token')

      const { access: access_token } = await $publicApi('/api/token/refresh/', {
        method: 'POST',
        body: { refresh: currentRefreshToken }
      })

      authStore.setAccessToken(access_token)
      authStore.setScheduleTokenRefresh(access_token, async () => {
        await onRefreshToken()
      })
      return { success: true }
    } catch (error) {
      authStore.logout()
      navigateTo('/authorization')
      return { success: false, error }
    }
  }

  return { onLogin, onRefreshToken }
}
