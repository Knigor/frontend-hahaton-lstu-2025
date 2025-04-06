<template>
  <div
    class="grad flex h-[125px] min-w-[220px] flex-col items-start rounded-2xl border-[1px] border-solid border-[#D1D1D1] p-4"
  >
    <div class="text-[20px] font-medium">{{ props.name }}</div>
    <div class="text-[16px] font-medium">{{ props.value }}грамм.</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  value: String
})
</script>

<style scoped>
.grad {
  background-color: rgba(0, 255, 255, 0.116);
}
</style>
