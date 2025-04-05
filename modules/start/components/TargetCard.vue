<template>
  <div
    :class="[
      props.selected ? 'grad-selected' : 'grad-deselected',
      'relative',
      ,
      'w-[250px]',
      'rounded-2xl',
      'shadow-hover',
      'cursor-pointer'
    ]"
  >
    <div
      class="flex flex-col items-center justify-center pt-[42px] pb-[40px] text-[20px] font-medium"
    >
      <div :class="['z-2', props.selected ? 'text-white' : '']">
        {{ props.header || '' }}
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  header: {
    type: String
  }
})
</script>

<style scoped>
.grad-selected::after {
  content: '';
  border-radius: 16px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(66, 42, 213);
  background: linear-gradient(
    180deg,
    rgba(66, 42, 213, 1) 43%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: 0.5s;
}
.shadow-hover {
  transition: 0.2s;
}
.grad-deselected:hover {
  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.grad-deselected::after {
  content: '';
  border-radius: 16px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 43%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: 0.5s;
}
.zetka {
  z-index: 0;
}
</style>
