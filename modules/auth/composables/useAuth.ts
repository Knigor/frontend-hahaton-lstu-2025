import { useAuthStore } from '~/modules/auth/store/auth'
import type { $Fetch } from 'ofetch'
import { useUserData } from '~/modules/start/store/user'
import { useProfile } from '~/modules/main/composables/useProfile'

export const useAuth = () => {
  const { $publicApi } = useNuxtApp() as unknown as { $publicApi: $Fetch }
  const authStore = useAuthStore()
  const userDataStore = useUserData()
  const { getProfile } = useProfile()

  const onLogin = async (login: string, password: string) => {
    try {
      const { token: access_token } = await $publicApi('auth/login', {
        method: 'POST',
        body: { email: login, password }
      })

      authStore.setAccessToken(access_token)

      // После установки токена, вызываем getProfile
      const { response, success, error } = await getProfile()

      if (response.filled_in_data) {
        userDataStore.age = response.age
        userDataStore.height = response.height
        userDataStore.weight = response.weight
        userDataStore.sex = response.gender
        userDataStore.form = response.level_of_training
        userDataStore.equipment = response.inventory
        userDataStore.targetWeight = response.desired_weight
        userDataStore.type = response.target
        userDataStore.other = response.details
      } else {
        navigateTo('/')
      }
      if (!success) {
        return { success: false, error }
      }

      // Если всё прошло успешно, возвращаем токен и профиль
      return { success: true, profile: response }
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
