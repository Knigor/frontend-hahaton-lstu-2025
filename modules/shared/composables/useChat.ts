import type { $Fetch } from 'ofetch'

export const useChat = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  async function UseSendMessage(message: string) : Promise<{ response?: any; success: boolean; error?: any }> {
    try {
      const result = await $protectedApi('fitness/chat/send', {
        method: 'POST',
        body:{
          "text": message
        }
      })
      return { response : result, success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
  return { UseSendMessage }
}
