<template>
  <div
    class="grad flex h-[125px] w-[220px] flex-col items-start rounded-2xl border-[1px] border-solid border-[#D1D1D1] p-4"
  >
    <div class="text-[20px] font-medium">{{ props.name }}</div>
    <div class="text-[16px] font-medium">{{ props.value }}</div>
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
  background: rgb(66, 42, 213);
  background: linear-gradient(
    165deg,
    rgba(66, 42, 213, 0.6208684157256652) 15%,
    rgba(7, 99, 23, 0.3435574913559174) 87%
  );
}
</style>
