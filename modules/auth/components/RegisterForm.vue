<script setup lang="ts">
import Button from '~/modules/shared/components/common/buttons/Button.vue'
import { Apple } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="overflow-hidden p-0">
      <div class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">Зарегистрироваться</h1>
              <p class="text-start text-gray-600">
                Заполните все поля для регистрации
              </p>
            </div>
            <div class="grid gap-3">
              <label class="floating-label">
                <span>Имя</span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  class="input input-primary border"
                />
              </label>
            </div>
            <div class="grid gap-3">
              <label class="floating-label">
                <span>Email</span>
                <input
                  type="text"
                  placeholder="Введите ваш email"
                  class="input input-primary border"
                />
              </label>
            </div>
            <div class="grid gap-3">
              <label class="floating-label">
                <span>Пароль</span>
                <input
                  type="password"
                  placeholder="введите ваш пароль"
                  class="input input-primary border"
                />
              </label>
            </div>
            <Button type="submit" />
            <button class="btn border-black bg-black text-white">
              <svg
                aria-label="Email icon"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  fill="none"
                  stroke="black"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <Apple stroke-width="4" color="#ff0000" fill="#fff" />
              Войти с Яндекс ID
            </button>
            <div class="text-center text-sm">
              Нет аккаунта?
              <NuxtLink to="/authorization">
                <button class="btn btn-link m-0 p-0 hover:text-blue-400">
                  Войти
                </button></NuxtLink
              >
            </div>
          </div>
        </form>

        <div class="relative hidden md:block">
          <img
            src="/modules/shared/assets/icons/Tralalero_Tralala.png"
            alt="Image"
            class="absolute inset-0 h-full w-full rounded-r-2xl object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  </div>
</template>
