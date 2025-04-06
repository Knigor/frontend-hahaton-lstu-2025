import type { $Fetch } from 'ofetch'

export const usePlan = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  async function getPlan() {
    try {
      const result = await $protectedApi('fitness/plan', {
        method: 'GET',
      })
      return { response : result, success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
  return { getPlan }
}
