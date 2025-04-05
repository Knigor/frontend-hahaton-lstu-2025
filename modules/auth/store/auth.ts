import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    scheduleTimeoutId: null as null | ReturnType<typeof setTimeout>
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
    },
    logout() {
      this.accessToken = null
      sessionStorage.clear()
      localStorage.clear()
    }
  },
  getters: {
    getRefreshToken: () => useCookie('refresh_token').value
  }
})
