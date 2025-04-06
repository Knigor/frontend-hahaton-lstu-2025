<script setup lang="ts">
import ModalStart from '../components/ModalStart.vue'
import { MoveLeft, X } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import FoodCard from '../components/FoodCard.vue'
import ScrollSection from '../components/ScrollSection.vue'
import { ref, onMounted } from 'vue'
import { Check } from 'lucide-vue-next';
import { usePlan } from '../composables/usePlan'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-vue-next';

const { getPlan } = usePlan()

definePageMeta({
  layout: 'custom'
})
const exercises = ref([
  { id: 1, name: 'Отжимания', reps: 10, sets: 3, checked: false },
  { id: 2, name: 'Приседания', reps: 15, sets: 4, checked: false },
  { id: 3, name: 'Тяга', reps: 12, sets: 3, checked: false },
  { id: 4, name: 'Жим', reps: 8, sets: 4, checked: false },
  { id: 5, name: 'Планка', reps: 30, sets: 3, checked: false },
  { id: 6, name: 'Скручивания', reps: 15, sets: 4, checked: false },
  { id: 7, name: 'Бёрпи', reps: 10, sets: 3, checked: false },
  { id: 8, name: 'Выпады', reps: 12, sets: 4, checked: false },
])

const isOpen = ref<boolean>(false)
const data = ref(null)
async function getPlanData() {
  data.value = await getPlan()
  data.value = data.value.response.week_plan
  console.log(data.value)
}
const currentDay = ref(0)
getPlanData()
function prevDay() {
  if (currentDay.value === 0)
    currentDay.value = data.value.length - 1
  else
    currentDay.value--
}
function nextDay() {
  if (currentDay.value === data.value.length - 1) {
    currentDay.value = 0
  }
  else
    currentDay.value++
}
</script>

<template>
  <div class="flex w-full flex-col items-center  gap-4 p-[32px] text-center">
    <p class="f text-[40px] font-bold">План тренировок</p>
    <div class="flex flex-row w-full items-center justify-between gap-4">
      <div @click="prevDay()"
        class="h-[200px] flex items-center justify-center rounded-2xl border-[1px] border-[#D1D1D1] bg-[#F0F0F0] p-3 hover:bg-gray-200">
        <ArrowBigLeft></ArrowBigLeft>
      </div>
      <div v-if="data" class="w-full grow rounded-2xl border-[1px] border-[#D1D1D1] bg-[#F0F0F0] p-3">

        <div class="mb-4 flex flex-row items-center justify-center gap-2 text-[24px] font-bold">
          <div>{{ data[currentDay].day }}</div>
        </div>
        <div class="flex flex-row">
          <div class="grow">
            <div class="text-[24px] font-medium">Питание</div>
            <div class="text-[20px]">Завтрак</div>
            <ScrollSection :food="data[currentDay].dishes.breakfast" />
            <div class="text-[20px]">Обед</div>
            <ScrollSection :food="data[currentDay].dishes.dinner" />
            <div class="text-[20px]">Ужин</div>
            <ScrollSection :food="data[currentDay].dishes.lunch" />
          </div>
          <div class="grow">
            <div class="grow text-[24px] font-medium">Тренировка</div>

            <div class="flex flex-col gap-2">

              <div class="flex text-[20px] font-medium">Упражнения</div>
              <div class="overflow-auto h-[400px]">
                <table class="w-full border-collapse">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="p-2 text-center">Название</th>
                      <th class="p-2 text-center">Повторы</th>
                      <th class="p-2 text-center">Подходы</th>
                      <th class="p-2 text-center">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="exercise in data[currentDay].exercise">
                      <td class=" p-2">{{ exercise.name }}</td>
                      <td class=" p-2">{{ exercise.repetitions }}</td>
                      <td class=" p-2">{{ exercise.approaches }}</td>
                      <td class=" p-2">
                        <button v-if="!exercise.checked" @click="exercise.checked = true"
                          class="btn btn-circle btn-primary">
                          <Check class="h-4 w-4" />
                        </button>
                        <button v-if="exercise.checked" @click="exercise.checked = false"
                          class="btn btn-circle btn-primary">
                          <X class="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div @click="nextDay()"
        class="h-[200px] flex items-center justify-center rounded-2xl border-[1px] border-[#D1D1D1] bg-[#F0F0F0] p-3 hover:bg-gray-200">
        <ArrowBigRight></ArrowBigRight>
      </div>

    </div>

  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: auto;

}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, and Opera */
}
</style>
