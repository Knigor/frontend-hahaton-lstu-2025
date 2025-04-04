<script setup lang="ts">
import { object, string, ValidationError } from 'yup'
import { useAuth } from '../composables/useAuth'

const { onLogin } = useAuth()
const email = ref('')
const emailError = ref('')

const password = ref('')
const passwordError = ref('')

const isPending = ref(false)

const isFormSubmitDisabled = computed(
  () => !email.value.trim() || !password.value.trim()
)

const resetErrors = () => {
  emailError.value = ''
  passwordError.value = ''
}

const checkValid = async () => {
  const loginSchema = object({
    email: string()
      .required('Необходимо указать email')
      .email('Некорректный email'),
    password: string()
      .required('Необходимо указать пароль')
      .min(6, 'Пароль должен содержать минимум 6 символов')
  })
  try {
    await loginSchema.validate({
      email: email.value,
      password: password.value
    })
    return true
  } catch (err) {
    if (err instanceof ValidationError) {
      if (err.path === 'email') emailError.value = err.message
      if (err.path === 'password') passwordError.value = err.message
    }
    return false
  }
}

onMounted(() => {
  window.YaAuthSuggest.init(
    {
      client_id: '607b69aea9714146a984ddeaf9e303e4',
      response_type: 'token',
      redirect_uri: 'https://not-five.ru/api/auth/yandex/callback'
    },
    'https://not-five.ru',
    {
      view: 'button',
      parentId: 'buttonContainerId',
      buttonSize: 'm',
      buttonView: 'main',
      buttonTheme: 'light',
      buttonBorderRadius: '16',
      buttonIcon: 'ya'
    }
  )
    .then(({ handler }) => handler())
    .then((data) => console.log('Сообщение с токеном', data))
    .catch((error) => console.log('Обработка ошибки', error))
})

const loginWithYandex = () => {
  window.location.href = 'https://not-five.ru/api/auth/yandex/login'
}

const onSubmit = async () => {
  const isValid = await checkValid()
  if (!isValid) return
  resetErrors()
  isPending.value = true
  try {
    await onLogin(email.value, password.value)
    navigateTo('/')
  } catch (err) {
    console.error('Ошибка при отправке формы:', err)
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="overflow-hidden p-0">
      <div class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">Добро пожаловать</h1>
              <p class="text-start text-gray-600">
                Введите ваш email чтобы войти
              </p>
            </div>
            <div class="grid gap-3">
              <label class="floating-label">
                <span>Email</span>
                <input
                  v-model="email"
                  type="email"
                  placeholder="email"
                  class="input input-primary rounded-2xl border-2"
                  @input="resetErrors"
                />
                <p v-if="emailError" class="mt-1 text-sm text-red-500">
                  {{ emailError }}
                </p>
              </label>
            </div>
            <div class="grid gap-3">
              <label class="floating-label">
                <span>Пароль</span>
                <input
                  v-model="password"
                  type="password"
                  placeholder="введите ваш пароль"
                  class="input input-primary rounded-2xl border-2"
                  @input="passwordError = ''"
                />
                <p v-if="passwordError" class="text-sm text-red-500">
                  {{ passwordError }}
                </p>
              </label>
            </div>
            <div
              v-if="isPending"
              class="relative h-2 w-full overflow-hidden rounded-lg bg-gray-100"
            >
              <div
                class="inner-bar absolute top-0 left-0 h-full w-1/4 rounded-lg bg-blue-600"
              ></div>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-full rounded-2xl"
              :disabled="isFormSubmitDisabled"
            >
              Войти
            </button>
            <!-- Кнопка яндекса -->
            <div id="buttonContainerId" class="flex justify-center"></div>
            <button
              class="btn btn-primary w-full rounded-2xl"
              @click="loginWithYandex"
            >
              Яндекс
            </button>
            <div class="text-center text-sm">
              Нет аккаунта?
              <NuxtLink to="/register">
                <button class="btn btn-link m-0 p-0 hover:text-blue-400">
                  Зарегистрироваться
                </button>
              </NuxtLink>
            </div>
          </div>
        </form>
        <div class="relative hidden overflow-hidden md:block">
          <img
            src="/modules/shared/assets/icons/auth/guts.jpg"
            alt="Image"
            class="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@keyframes slide {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}

.yaPreloadingSuggestBlockContainer {
  height: 0px;
}

.inner-bar {
  animation: slide 2s linear infinite;
}
</style>
