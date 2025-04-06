import type { $Fetch } from 'ofetch'

export const usePlanGenerate = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  async function getGenerate() {
    try {
      const result = await $protectedApi('fitness/plan/generate', {
        method: 'GET'
      })
      return { response: result, success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  async function sendFintess(comment: string) {
    try {
      const result = await $protectedApi('fitness/plan/generate', {
        method: 'POST',
        body: { comment: comment }
      })
      return { response: result, success: true }
    } catch (error) {
      console.log(error)
    }
  }

  return { getGenerate, sendFintess }
}
