<script setup lang="ts">
import ModalStart from '../components/ModalStart.vue'
import { MoveLeft, X } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import FoodCard from '../components/FoodCard.vue'
import ScrollSection from '../components/ScrollSection.vue'
import { ref, onMounted } from 'vue'
import { Check } from 'lucide-vue-next';

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

const inventory = ref([
  { id: 1, name: 'Гантеля' },
  { id: 2, name: 'Штанга' },
  { id: 3, name: 'Брусья' },
  { id: 4, name: 'Скамья' },
  { id: 5, name: 'Коврик' },
])
const isOpen = ref<boolean>(false)
</script>

<template>
  <div
    class="flex w-full flex-col items-center justify-between gap-4 p-[32px] text-center"
  >
    <p class="f text-[40px] font-bold">План тренировок</p>
    <div
      class="w-full grow rounded-2xl border-[1px] border-[#D1D1D1] bg-[#F0F0F0] p-3"
    >
      <div
        class="mb-4 flex flex-row items-center justify-center gap-2 text-[24px] font-bold"
      >
        <div>Понедельник</div>
        •
        <div>13 апреля</div>
      </div>
      <div class="flex flex-row">
        <div class="grow">
          <div class="text-[24px] font-medium">Питание</div>
          <div class="text-[20px]">Завтрак</div>
          <ScrollSection />
          <div class="text-[20px]">Обед</div>
          <ScrollSection />
          <div class="text-[20px]">Ужин</div>
          <ScrollSection />
        </div>
        <div class="grow">
          <div class="grow text-[24px] font-medium">Тренировка</div>

          <div class="flex flex-col gap-2">
            <div class="flex text-[20px] font-medium">Потребуется</div>
            <div class="flex flex-row gap-1">
              <div v-for="value in inventory" :key="value.id" class="flex flex-row gap-1">
                <div>•</div>
                <div>{{value.name}}</div>
              </div>
            </div>
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
                <tr v-for="exercise in exercises" :key="exercise.id" :class="exercise.checked ? 'bg-[#00D390]' : ''">
                  <td class=" p-2">{{ exercise.name }}</td>
                  <td class=" p-2">{{ exercise.reps }}</td>
                  <td class=" p-2">{{ exercise.sets }}</td>
                  <td class=" p-2">
                    <button v-if="!exercise.checked" @click="exercise.checked = true" class="btn btn-circle btn-primary">
                      <Check class="h-4 w-4" />  
                    </button>
                    <button v-if="exercise.checked"  @click="exercise.checked = false" class="btn btn-circle btn-primary">
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
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: auto;

}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}
</style>
