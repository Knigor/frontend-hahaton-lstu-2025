import { useUserData } from '../store/user'
import type { $Fetch } from 'ofetch'

export const useUserDataFunc = () => {
  const { $publicApi } = useNuxtApp() as unknown as { $publicApi: $Fetch }

  const userDataStore = useUserData()
  async function sendData() {
    try {
      await $publicApi('auth/login', {
        method: 'POST',
        body: {
          type: userDataStore.type,
          sex: userDataStore.sex,
          age: userDataStore.age,
          height: userDataStore.height,
          weight: userDataStore.weight,
          targetWeight: userDataStore.targetWeight,
          equipment: userDataStore.equipment,
          other: userDataStore.other,
          form: userDataStore.form
        }
      })

      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
  return { sendData }
}
