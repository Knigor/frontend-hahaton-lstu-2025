<template>
    <div class="w-[250px] h-[280px] grad rounded-2xl relative">
        <div class="flex flex-col items-center justify-center pt-[40px] pb-[40px] text-[20px] font-medium">
            <div >Стать сильнее </div>
        </div>
        <div>
            <img class="zetka relative"  src="../assets/strength.png" alt="">
        </div>
        
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .grad{
        
    }
    .grad::after{
        content: '';
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        
        background: rgb(66,42,213);
        background: linear-gradient(180deg, rgba(66,42,213,1) 43%, rgba(255,255,255,0) 100%);
        transition: 0.3s;
    }
    .zetka{
        z-index: -1;
    }
</style>