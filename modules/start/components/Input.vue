<template>
  <input
    v-model="model"
    type="text"
    :placeholder="props.placeholder"
    class="input input-primary rounded-3xl border-2"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Введите что-то...'
  }
})
const model = defineModel<string>()
</script>

<style scoped></style>
