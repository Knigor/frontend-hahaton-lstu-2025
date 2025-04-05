<script setup lang="ts">
import ModalStart from '../components/ModalStart.vue'
import { MoveLeft } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import FoodCard from '../components/FoodCard.vue'
import ScrollSection from '../components/ScrollSection.vue'
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'custom'
})

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
              <div v-for="i in 5" class="flex flex-row gap-1">
                <div>•</div>
                <div>Гантеля</div>
              </div>
            </div>
            <div class="flex text-[20px] font-medium">Потребуется</div>
            <div class="flex flex-row bg-[#E0E0E0]">
              <div></div>
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

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}
</style>
