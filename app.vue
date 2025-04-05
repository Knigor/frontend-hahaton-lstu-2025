<script setup>
import { useAuthStore } from './modules/auth/store/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

useHead({
  htmlAttrs: {
    'data-theme': 'light'
  }
})

watch(
  () => authStore.accessToken,
  (newToken) => {
    if (newToken && route.path !== '/') {
      router.push('/')
    }
  }
)
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
/* between layouts */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
