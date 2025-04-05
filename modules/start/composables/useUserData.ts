import { useUserData } from '../store/user'
import type { $Fetch } from 'ofetch'

export const useUserDataFunc = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  const userDataStore = useUserData()
  async function sendData() {
    try {
      await $protectedApi('symfony/user/', {
        method: 'PUT',
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
