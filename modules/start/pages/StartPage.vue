<script setup lang="ts">
  import PlusMinusInput from "../components/PlusMinusInput.vue"
  import TargetCard from "../components/TargetCard.vue";
  import Input from "../components/Input.vue";
  import { LogOut } from 'lucide-vue-next';
  import { MoveRight } from 'lucide-vue-next';

  const allChoosed = ref(false)
</script>

<template>
  <div class="flex flex-col items-center w-screen h-screen pl-16 pr-16 justify-evenly">
    <div class="flex flex-col items-center rounded-2xl">
      <div class="text-[4rem] font-bold">
        Давайте начнём!
      </div>
      <div class="text-[2rem]">
        С чего начинаете и чего хотите достичь?
      </div>
    </div>

    <div class="flex flex-row w-full gap-8 ">
      <div class="flex flex-col bg-[#F0F0F0] w-[450px] items-center p-[32px] gap-4 rounded-2xl">
        <div class="text-[32px] font-medium ">
          Параметры
        </div>
        <div class="flex flex-col w-full gap-4">
          <div class="text-[20px] font-medium">
            Пол
          </div>
          <div class="text-[20px] flex flex-row items-center gap-2">
            <label class="fieldset-label text-black">
              <input type="radio" name="radio-1" class="radio  bg-[#422AD5] checked:bg-[#422AD5] checked:text-[#DBD6FC] p-[6px]" :checked="true" />
              Мужской
            </label>
            
            <label class="fieldset-label text-black">
              <input type="radio" name="radio-1" class="radio  bg-[#422AD5] checked:bg-[#422AD5] checked:text-[#DBD6FC] p-[6px]" :checked="false" />
              Женский
            </label>
          </div>
        </div>
        <div class="flex flex-col items-center w-full text-[20px] font-medium">
          Возраст
        </div>
        <PlusMinusInput></PlusMinusInput>
        <div class="flex flex-col items-center w-full text-[20px] font-medium">
          Рост
        </div>
        <PlusMinusInput></PlusMinusInput>
        <div class="flex flex-col items-center w-full text-[20px] font-medium">
          Вес
        </div>
        <PlusMinusInput></PlusMinusInput>
      </div>

      <div class="flex flex-col bg-[#F0F0F0] grow tems-center p-[32px] gap-4 rounded-2xl">
        <div class="flex flex-col items-center">
          <div class="text-[32px] font-medium">Цель</div>
        </div>
        <div class="flex flex-row gap-2 justify-around">
          <TargetCard></TargetCard>
          <TargetCard></TargetCard>
          <TargetCard></TargetCard>
        </div>

        <div class="flex flex-row items-center justify-center gap-2">
          <div class="text-[20px] font-medium">Я хочу весить...</div>
          <Input></Input>
        </div>
      </div>
      
      
      
    </div>
    <div class="flex flex-row w-full">
      <button class="btn btn-square rounded-2xl  border-[#422AD5]">
        <LogOut color="#422AD5"></LogOut>
      </button>
      <button :disabled="!allChoosed" class=" ml-auto mr-auto btn btn-primary rounded-2xl">
        Идем дальше
        <MoveRight></MoveRight>
      </button>
    </div>
    
  </div>
</template>

<style scoped></style>
