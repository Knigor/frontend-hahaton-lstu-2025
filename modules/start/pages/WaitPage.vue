<template>
  <div class="wait-page">
    <h1 class="title animate-pulse">Подождите, составляем план тренировки</h1>
    <div class="subtitle flex animate-pulse flex-row">
      <div class="fade transition duration-300">{{ currentText }}</div>
    </div>
  </div>
</template>

<script setup>
import { usePlanGenerate } from '../composables/usePlanGenerate'

const { getGenerate } = usePlanGenerate()

const texts = [
  'Подбираем упражнения...',
  'Вычисляем калории...',
  'Считаем количество подходов...',
  'Считаем количество повторений...',
  'Вычисляем количество сетов...',
  'Смотрим количество дней...',
  'Умножаем количество недель...'
]

const currentIndex = ref(0)
const currentText = ref(texts[currentIndex.value])

const startTextRotation = () => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % texts.length
    currentText.value = texts[currentIndex.value]
  }, 3000)
}

onMounted(async () => {
  startTextRotation()
  // потом убрать, должен быть await

  const response = await getGenerate()

  if (response.success) {
    navigateTo('/')
  } else {
    navigateTo('/start')
  }
})
</script>

<style scoped>
.wait-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
}

.fade {
  transition: opacity 1s ease-in-out;
  opacity: 1;
}
</style>
