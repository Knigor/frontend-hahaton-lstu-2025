<script setup lang="ts">
import Button from '~/modules/shared/components/common/buttons/Button.vue'
import Link from '~/modules/shared/components/common/buttons/Link.vue'
import Input from '~/modules/shared/components/common/inputs/Input.vue'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="overflow-hidden p-0">
      <div class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">Добро пожаловать</h1>
            </div>
            <div class="grid gap-3">
              <Input id="email" type="email" required />
            </div>
            <div class="grid gap-3">
              <Input id="password" type="password" />
            </div>
            <Button type="submit" />
            <div class="text-center text-sm">
              Нет аккаунта?
              <NuxtLink to="/"><Link /></NuxtLink>
            </div>
          </div>
        </form>

        <div class="relative hidden md:block">
          <img
            src="/modules/shared/assets/icons/lain.png"
            alt="Image"
            class="absolute inset-0 h-full w-full rounded-r-2xl object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  </div>
</template>
