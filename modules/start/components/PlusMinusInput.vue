<template>
    <div class="flex flex-row gap-1">
        <button class="btn btn-primary btn-circle">
            <Minus></Minus>
        </button>
        <Input/>
        <button class="btn btn-primary btn-circle">
            <Plus></Plus>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { Plus } from 'lucide-vue-next';
    import { Minus } from 'lucide-vue-next';
    import Input from './Input.vue';
</script>

<style scoped>

</style>