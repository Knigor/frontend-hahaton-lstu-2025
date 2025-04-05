import { useAuthStore } from '~/modules/auth/store/auth'
import type { $Fetch } from 'ofetch'
import { useUserData } from '~/modules/start/store/user'

export const useAuth = () => {
  const { $publicApi } = useNuxtApp() as unknown as { $publicApi: $Fetch }
  const authStore = useAuthStore()
  const userDataStore = useUserData()

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

  const onRegister = async (name: string, login: string, password: string) => {
    try {
      const { token: access_token } = await $publicApi('auth/register', {
        method: 'POST',
        body: { name: name, email: login, password }
      })
      authStore.setAccessToken(access_token)

      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const logout = async () => {
    try {
      await $publicApi('auth/logout')
      authStore.logout()
      userDataStore.clearData()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const refreshToken = async () => {
    try {
      const { token: access_token } = await $publicApi('auth/refresh_token')

      console.log(access_token)
      authStore.setAccessToken(access_token)

      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  return { onLogin, refreshToken, onRegister, logout }
}
