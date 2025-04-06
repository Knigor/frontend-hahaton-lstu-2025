import { useAuthStore } from '~/modules/auth/store/auth'
import { useAuth } from '~/modules/auth/composables/useAuth'
import { useProfile } from '~/modules/main/composables/useProfile'
import { useUserData } from '~/modules/start/store/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const userDataStore = useUserData()
  const { refreshToken } = useAuth()
  const { getProfile } = useProfile()

  console.log('вызываем middleware', localStorage.getItem('firstLogin'))

  const publicRoutes = ['/authorization', '/register']

  if (authStore.accessToken === null) {
    const response = await refreshToken()

    // if (response.success) {
    //   if (localStorage.getItem('firstLogin')) {
    //     return navigateTo('/')
    //   } else {
    //     return navigateTo('/start')
    //   }
    // }

    // получаем профиль

    if (authStore.accessToken && to.path !== '/start-second') {
      const { response, success, error } = await getProfile()

      if (response.filled_in_data) {
        navigateTo('/')
      } else {
        userDataStore.age = response.age
        userDataStore.height = response.height
        userDataStore.weight = response.weight
        userDataStore.sex = response.gender
        userDataStore.form = response.level_of_training
        userDataStore.equipment = response.inventory
        userDataStore.targetWeight = response.desired_weight
        userDataStore.type = response.target
        userDataStore.other = response.details
      }

      if (!success) {
        return { success: false, error }
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
