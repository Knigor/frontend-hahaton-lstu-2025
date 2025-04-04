<script setup lang="ts">
  import ModalStart from '../components/ModalStart.vue';
  definePageMeta({
    layout: 'custom'
  })
  const isOpen =  ref<Boolean>(false)
</script>
  
<template>
  <button @click="isOpen = true" class="btn btn-primary">Указать данные</button>
  <ModalStart v-model="isOpen"/>
</template>

<style scoped></style>
