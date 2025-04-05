<script setup lang="ts">
import ModalStart from '../components/ModalStart.vue'
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
        class="flex flex-row items-center justify-center gap-2 text-[24px] font-bold"
      >
        <div>Понедельник</div>
        •
        <div>13 апреля</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
