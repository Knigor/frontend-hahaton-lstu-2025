<script setup lang="ts">
import { object, string, ValidationError } from 'yup'
import { ref, computed } from 'vue'
import YandexIcon from '~/modules/shared/assets/icons/Yandex_icon_1.svg'

const name = ref('')
const nameError = ref('')

const email = ref('')
const emailError = ref('')

const password = ref('')
const passwordError = ref('')

const isPending = ref(false)

const isFormSubmitDisabled = computed(
  () => !name.value.trim() || !email.value.trim() || !password.value.trim()
)

const resetErrors = () => {
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''
}

const checkValid = async () => {
  const registerSchema = object({
    name: string().required('Необходимо указать имя'),
    email: string()
      .required('Необходимо указать email')
      .email('Некорректный email'),
    password: string()
      .required('Необходимо указать пароль')
      .min(6, 'Пароль должен содержать минимум 6 символов')
  })
  try {
    await registerSchema.validate({
      name: name.value,
      email: email.value,
      password: password.value
    })
    return true
  } catch (err) {
    if (err instanceof ValidationError) {
      if (err.path === 'name') nameError.value = err.message
      if (err.path === 'email') emailError.value = err.message
      if (err.path === 'password') passwordError.value = err.message
    }
    return false
  }
}

const onSubmit = async () => {
  const isValid = await checkValid()
  if (!isValid) return
  resetErrors()
  isPending.value = true
  try {
    setTimeout(() => {
      isPending.value = false
      console.log('Регистрация успешна:', {
        name: name.value,
        email: email.value,
        password: password.value
      })
    }, 2000)
  } catch (err) {
    console.error('Ошибка при регистрации:', err)
  }
}

onMounted(() => {
  window.YaAuthSuggest.init(
    {
      client_id: '607b69aea9714146a984ddeaf9e303e4',
      response_type: 'token',
      redirect_uri: 'https://not-five.ru'
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
  console.log('Переход к авторизации через Яндекс ID')
  // Здесь можно добавить редирект на страницу авторизации Яндекса
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="overflow-hidden p-0">
      <div class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">Регистрация</h1>
              <p class="text-start text-gray-600">
                Заполните все поля для регистрации
              </p>
            </div>
            <div class="grid gap-3">
              <label class="floating-label">
                <span>Имя</span>
                <input
                  v-model="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  class="input input-primary rounded-2xl border-2"
                  @input="resetErrors"
                />
                <p v-if="nameError" class="text-sm text-red-500">
                  {{ nameError }}
                </p>
              </label>
            </div>
            <div class="grid gap-3">
              <label class="floating-label">
                <span>Email</span>
                <input
                  v-model="email"
                  type="text"
                  placeholder="Введите ваш email"
                  class="input input-primary rounded-2xl border-2"
                  @input="resetErrors"
                />
                <p v-if="emailError" class="text-sm text-red-500">
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
                  placeholder="Введите ваш пароль"
                  class="input input-primary rounded-2xl border-2"
                  @input="resetErrors"
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
              Зарегистрироваться
            </button>
            <!-- Кнопка яндекса -->
            <div id="buttonContainerId" class="flex justify-center"></div>
            <div class="text-center text-sm">
              Уже есть аккаунт?
              <NuxtLink to="/authorization">
                <button class="btn btn-link m-0 p-0 hover:text-blue-400">
                  Войти
                </button>
              </NuxtLink>
            </div>
          </div>
        </form>
        <div class="relative hidden overflow-hidden md:block">
          <img
            src="/modules/shared/assets/icons/auth/auth_2.jpg"
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
