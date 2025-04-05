<script setup>
useHead({
  htmlAttrs: {
    'data-theme': 'light'
  }
})

onMounted(() => {
  window.addEventListener('message', (event) => {
    if (event.data === 'refreshApp') {
      // Обновляем всё приложение
      window.location.reload()

      // Или, если вы используете Nuxt 3 и хотите более мягкое обновление:
      // refreshNuxtData() // для обновления данных
      // await navigateTo('/', { replace: true }) // для навигации на корень
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('message')
})
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
