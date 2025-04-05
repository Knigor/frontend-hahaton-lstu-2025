import { useAuthStore } from '~/modules/auth/store/auth'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export default defineNuxtPlugin(() => {
  type ApiRequestOptions = NitroFetchOptions<NitroFetchRequest>
  const authStore = useAuthStore()

  const request = $fetch.create({
    responseType: 'json',
    credentials: 'include',
    headers: {},
    baseURL: `${useRuntimeConfig().public.apiBase}`,

    async onResponse({ request, options, response }) {
      console.log('Protected API onResponse:', {
        response,
        status: response.status,
        request,
        options
      })
    },
    async onResponseError(ctx) {
      if ([401].includes(ctx.response.status)) {
        console.log(authStore.getRefreshToken)
        if (ctx.request.endsWith('/api/token/refresh/')) return // чтобы не уйти в луп
        if (ctx.request.endsWith('/api/token/')) return // чтобы не уйти в луп
        authStore.logout()
        return navigateTo('/authorization')
      }
    }
  })

  const protectedApi = <T>(
    url: string,
    options?: ApiRequestOptions
  ): Promise<T> => request(url, options) as Promise<T>

  // Экспортируем защищенный API-клиент
  return {
    provide: {
      protectedApi
    }
  }
})
