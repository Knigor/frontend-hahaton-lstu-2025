import type { $Fetch } from 'ofetch'

export const useProfile = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  async function getProfile() {
    try {
      const result = await $protectedApi('fitness/profile', {
        method: 'GET'
      })
      return { response: result, success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
  return { getProfile }
}
