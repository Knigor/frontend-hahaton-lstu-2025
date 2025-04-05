<template>
  <div class="flex flex-row gap-1">
    <button class="btn btn-primary btn-circle">
      <Minus></Minus>
    </button>
    <Input v-model="model" :placeholder="props.placeholder" />
    <button class="btn btn-primary btn-circle">
      <Plus></Plus>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { Minus } from 'lucide-vue-next'
import Input from './Input.vue'
const props = defineProps({
  placeholder: String
})
const model = defineModel()
</script>

<style scoped></style>
