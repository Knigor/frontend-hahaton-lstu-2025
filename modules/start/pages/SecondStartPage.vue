<script setup lang="ts">
import PlusMinusInput from '../components/PlusMinusInput.vue'
import TargetCard from '../components/TargetCard.vue'
import Input from '../components/Input.vue'
import { LogOut } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import { BicepsFlexed } from 'lucide-vue-next'
import { useUserData } from '../store/user'
import { useUserDataFunc } from '../composables/useUserData'
import { useStorage } from '@vueuse/core'

const { sendData } = useUserDataFunc()

const firstLogin = useStorage<boolean | null>('firstLogin', false)

async function handleSendData() {
  await sendData()

  firstLogin.value = true
  navigateTo('/wait')
}
const userDataStore = useUserData()
const router = useRouter()

const allChoosed = computed(() => {
  if (userDataStore.equipment && userDataStore.other && userDataStore.form) {
    return true
  } else {
    return false
  }
})
const equipment = ref('')
const other = ref('')
const form = ref('nothing')

const tooltipMessage = computed(() => {
  return allChoosed ? '' : 'Введите все параметры'
})
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-evenly pr-16 pl-16"
  >
    <div class="flex flex-col items-center rounded-2xl">
      <div class="text-[3rem] font-bold">Еще немного...</div>
      <div class="text-[1.5rem]">
        Нужно уточнить пару деталей для наилучшего результата
      </div>
    </div>

    <div class="flex w-full flex-row gap-8">
      <div
        class="tems-center flex grow flex-col gap-4 rounded-2xl border-[1px] border-solid border-[#D1D1D1] bg-[#F0F0F0] p-[32px]"
      >
        <div class="flex flex-col items-center">
          <div class="text-[32px] font-medium">
            Сколько у вас спортснаряжения?
          </div>
        </div>
        <div class="flex flex-row justify-around gap-2">
          <TargetCard
            @click="userDataStore.equipment = 'minimum'"
            :selected="userDataStore.equipment === 'minimum'"
            header="Минимум"
          >
            <img
              class="relative bottom-0 z-0"
              src="../assets/minimum.png"
              alt=""
            />
          </TargetCard>
          <TargetCard
            @click="userDataStore.equipment = 'home'"
            :selected="userDataStore.equipment === 'home'"
            header="Домашний зал"
          >
            <img
              class="relative bottom-0 z-0"
              src="../assets/home.png"
              alt=""
            />
          </TargetCard>
          <TargetCard
            @click="userDataStore.equipment = 'gym'"
            :selected="userDataStore.equipment === 'gym'"
            header="Тренажёрный зал"
          >
            <img class="relative bottom-0 z-0" src="../assets/gym.png" alt="" />
          </TargetCard>
        </div>
      </div>
      <div
        class="flex w-[450px] flex-col items-center gap-4 rounded-2xl border-[1px] border-solid border-[#D1D1D1] bg-[#F0F0F0] p-[32px]"
      >
        <div class="text-[32px] font-medium">Детали</div>
        <div class="flex w-full flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="text-[20px] font-medium">Что нам нужно учесть</div>
            <textarea
              type="text"
              v-model="userDataStore.other"
              placeholder="Укажите, что нам нужно учитывать при составлении плана: болезни, физические ограничения, аллергии на продукты..."
              class="textarea textarea-primary h-[60px] max-h-[70px] rounded-2xl border-[2px]"
            ></textarea>
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-[20px] font-medium">Опыт тренировок</div>
            <div class="text-[12px] font-medium">
              Как можно описать вашу физическую активность за последний месяц?
            </div>
          </div>

          <div class="flex flex-col gap-2 text-[20px]">
            <label class="fieldset-label text-black">
              <input
                type="radio"
                name="radio-5"
                class="radio bg-[#422AD5] p-[6px] checked:bg-[#422AD5] checked:text-[#DBD6FC]"
                :checked="userDataStore.form === 'nothing'"
                @click="userDataStore.form = 'nothing'"
              />
              Ничего не делал
            </label>

            <label class="fieldset-label text-black">
              <input
                type="radio"
                name="radio-5"
                class="radio bg-[#422AD5] p-[6px] checked:bg-[#422AD5] checked:text-[#DBD6FC]"
                :checked="userDataStore.form === 'walk'"
                @click="userDataStore.form = 'walk'"
              />
              Ходил под стол
            </label>
            <label class="fieldset-label text-black">
              <input
                type="radio"
                name="radio-5"
                class="radio bg-[#422AD5] p-[6px] checked:bg-[#422AD5] checked:text-[#DBD6FC]"
                :checked="userDataStore.form === 'fit'"
                @click="userDataStore.form = 'fit'"
              />
              Поддерживал форму
            </label>
            <label class="fieldset-label text-black">
              <input
                type="radio"
                name="radio-5"
                class="radio bg-[#422AD5] p-[6px] checked:bg-[#422AD5] checked:text-[#DBD6FC]"
                :checked="userDataStore.form === 'active'"
                @click="userDataStore.form = 'active'"
              />
              Активно упражнялся
            </label>
          </div>
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
      <div :class="['mr-auto', 'ml-auto', 'flex', 'gap-4']">
        <button
          @click="router.push('/start')"
          class="btn btn-primary btn-outline rounded-2xl border-[2px] p-6 text-2xl"
        >
          Назад
        </button>
        <div
          :class="[allChoosed ? '' : 'tooltip']"
          :data-tip="'Введите все параметры'"
        >
          <button
            :disabled="!allChoosed"
            @click="handleSendData()"
            class="btn btn-primary rounded-2xl p-6 text-2xl"
          >
            Получить план
            <BicepsFlexed></BicepsFlexed>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
