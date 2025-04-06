<template>
  <div class="flex flex-row items-center justify-center gap-4">
    <MoveLeft
      class="btn-circle cursor-pointer p-3 hover:bg-gray-200"
      size="32"
      @click="scrollLeft"
    ></MoveLeft>
    <div
      ref="foodCardContainer"
      class="scrollbar-hide flex w-[500px] overflow-x-auto whitespace-nowrap"
    >
      <FoodCard
        v-for="food in props.food"
        :name="food.name"
        :value="food.gram"
        class="mr-2"
      ></FoodCard>
    </div>

    <MoveRight
      class="btn-circle cursor-pointer p-3 hover:bg-gray-200"
      size="32"
      @click="scrollRight"
    ></MoveRight>
  </div>
</template>

<script setup lang="ts">
import { MoveLeft } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import FoodCard from '../components/FoodCard.vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
  food: {
    type: Array,
    default: () => [],
  },
})

const foodCardContainer = ref<HTMLDivElement | null>(null)
const scrollLeft = () => {
  if (foodCardContainer.value) {
    foodCardContainer.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (foodCardContainer.value) {
    foodCardContainer.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}

const handleWheelScroll = (event: WheelEvent) => {
  if (foodCardContainer.value) {
    event.preventDefault()
    foodCardContainer.value.scrollBy({ left: event.deltaY, behavior: 'smooth' })
  }
}

onMounted(() => {
  if (foodCardContainer.value) {
    foodCardContainer.value.addEventListener('wheel', handleWheelScroll)
  }
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}
</style>
