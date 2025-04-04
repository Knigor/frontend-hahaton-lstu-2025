import { useAuthStore } from '~/modules/auth/store/auth'
import type { $Fetch } from 'ofetch'

export const useAuth = () => {
  const { $publicApi } = useNuxtApp() as unknown as { $publicApi: $Fetch }
  const authStore = useAuthStore()

  const onLogin = async (login: string, password: string) => {
    try {
      const { token: access_token } = await $publicApi('auth/login', {
        method: 'POST',
        body: { email: login, password }
      })
      authStore.setAccessToken(access_token)

      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const refreshToken = async () => {
    try {
      const { token: access_token } = await $publicApi('auth/refresh_token')
      authStore.setAccessToken(access_token)

      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  return { onLogin, refreshToken }
}
