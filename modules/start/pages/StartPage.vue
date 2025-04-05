<script setup lang="ts">
import PlusMinusInput from '../components/PlusMinusInput.vue'
import TargetCard from '../components/TargetCard.vue'
import Input from '../components/Input.vue'
import { LogOut } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import { useUserData } from '../store/user'

const userDataStore = useUserData()
const router = useRouter()

const allChoosed = computed(() => {
  if (
    userDataStore.type &&
    userDataStore.sex &&
    userDataStore.age &&
    userDataStore.height &&
    userDataStore.weight &&
    userDataStore.targetWeight
  ) {
    return true
  } else {
    return false
  }
})
const type = ref('')
const sex = ref('male')
const age = ref(null)
const height = ref(null)
const weight = ref(null)
const targetWeight = ref(null)

const tooltipMessage = computed(() => {
  return allChoosed ? '' : 'Введите все параметры'
})
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-evenly pr-16 pl-16"
  >
    <div class="flex flex-col items-center rounded-2xl">
      <div class="text-[3rem] font-bold">Давайте начнём!</div>
      <div class="text-[1.5rem]">С чего начинаете и чего хотите достичь?</div>
    </div>

    <div class="flex w-full flex-row gap-8">
      <div
        class="flex w-[450px] flex-col items-center gap-4 rounded-2xl border-[1px] border-solid border-[#D1D1D1] bg-[#F0F0F0] p-[32px]"
      >
        <div class="text-[32px] font-medium">Параметры</div>
        <div class="flex w-full flex-col gap-4">
          <div class="text-[20px] font-medium">Пол</div>
          <div class="flex flex-row items-center gap-2 text-[20px]">
            <label class="fieldset-label text-black">
              <input
                type="radio"
                name="radio-1"
                class="radio bg-[#422AD5] p-[6px] checked:bg-[#422AD5] checked:text-[#DBD6FC]"
                :checked="userDataStore.sex === 'male'"
                @click="userDataStore.sex = 'male'"
              />
              Мужской
            </label>

            <label class="fieldset-label text-black">
              <input
                type="radio"
                name="radio-1"
                class="radio bg-[#422AD5] p-[6px] checked:bg-[#422AD5] checked:text-[#DBD6FC]"
                @click="userDataStore.sex = 'female'"
                :checked="userDataStore.sex === 'female'"
              />
              Женский
            </label>
          </div>
        </div>
        <div class="flex w-full flex-col items-center text-[20px] font-medium">
          Возраст
        </div>
        <PlusMinusInput v-model="userDataStore.age"></PlusMinusInput>
        <div class="flex w-full flex-col items-center text-[20px] font-medium">
          Рост
        </div>
        <PlusMinusInput v-model="userDataStore.height"></PlusMinusInput>
        <div class="flex w-full flex-col items-center text-[20px] font-medium">
          Вес
        </div>
        <PlusMinusInput v-model="userDataStore.weight"></PlusMinusInput>
      </div>

      <div
        class="tems-center flex grow flex-col gap-4 rounded-2xl border-[1px] border-solid border-[#D1D1D1] bg-[#F0F0F0] p-[32px]"
      >
        <div class="flex flex-col items-center">
          <div class="text-[32px] font-medium">Цель</div>
        </div>
        <div class="flex flex-row justify-around gap-2">
          <TargetCard
            @click="userDataStore.type = 'strength'"
            :selected="userDataStore.type === 'strength'"
            header="Стать сильнее"
          >
            <img
              class="relative bottom-0 z-0"
              src="../assets/strength.png"
              alt=""
            />
          </TargetCard>
          <TargetCard
            @click="userDataStore.type = 'fit'"
            :selected="userDataStore.type === 'fit'"
            header="Поддержать форму"
          >
            <img class="relative bottom-0 z-0" src="../assets/fit.png" alt="" />
          </TargetCard>
          <TargetCard
            @click="userDataStore.type = 'thick'"
            :selected="userDataStore.type === 'thick'"
            header="Стать стройнее"
          >
            <img
              class="relative bottom-0 z-0"
              src="../assets/thick.png"
              alt=""
            />
          </TargetCard>
        </div>

        <div class="flex flex-row items-center justify-center gap-2">
          <div class="text-[20px] font-medium">Я хочу весить...</div>
          <Input v-model="userDataStore.targetWeight"></Input>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-row">
      <button
        class="btn btn-primary btn-outline rounded-2xl border-[2px] p-6 text-2xl"
      >
        <LogOut color="#422AD5"></LogOut>
        Выход
      </button>
      <div
        :class="[allChoosed ? '' : 'tooltip', 'mr-auto', 'ml-auto']"
        :data-tip="'Введите все параметры'"
      >
        <button
          @click="router.push('/start-second')"
          :disabled="!allChoosed"
          class="btn btn-primary rounded-2xl p-6 text-2xl"
        >
          Идем дальше
          <MoveRight></MoveRight>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
