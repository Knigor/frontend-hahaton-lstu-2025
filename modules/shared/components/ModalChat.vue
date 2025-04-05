<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="max-w-[650px]transform relative h-[800px] w-[650px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex items-center justify-between">
                <DialogTitle
                  as="h3"
                  class="text-center text-lg leading-6 font-medium text-gray-900"
                >
                  Фитнесс-ассистент
                </DialogTitle>
                <X
                  class="btn-circle cursor-pointer p-3 hover:bg-gray-200"
                  size="32"
                  @click="closeModal"
                />
              </div>
              <!-- Юзер пишет сообщение -->
              <div
                ref="chatContainer"
                class="flex max-h-[600px] flex-col-reverse gap-4 overflow-y-auto pr-2"
              >
                <div
                  v-for="(msg, index) in [...chat].reverse()"
                  :key="index"
                  role="alert"
                  :class="[
                    'alert',
                    msg.from === 'user'
                      ? 'bg-[#422AD5] text-[#DBD6FC]'
                      : 'bg-gray-200'
                  ]"
                >
                  <span>{{ msg.text }}</span>
                </div>
              </div>

              <div class="absolute bottom-4 flex gap-2">
                <textarea
                  v-model="message"
                  class="textarea w-[500px] resize-none border border-[#422AD5]"
                  placeholder="Введите сообщение..."
                  @keydown.enter.prevent="sendMessage"
                ></textarea>

                <div
                  class="mb-auto flex cursor-pointer flex-row rounded-2xl bg-[#422AD5] p-2 transition duration-300 hover:rounded-2xl hover:bg-blue-600"
                  @click="sendMessage"
                >
                  <SendHorizontal
                    stroke-width="1.5"
                    color="#fff"
                    class="h-8 w-8"
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { X, SendHorizontal } from 'lucide-vue-next'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const isOpen = defineModel()

const message = ref('')
const chat = ref([
  { text: 'Слышь, братан, а ты мне картофан то убери...', from: 'user' },
  { text: 'Брат, да не вопрос, запоминай: сковорода...', from: 'gpt' }
])

function closeModal() {
  isOpen.value = false
}

function sendMessage() {
  if (!message.value.trim()) return
  chat.value.push({ text: message.value, from: 'user' })

  // Симуляция ответа от GPT (можно позже заменить на реальный запрос)
  setTimeout(() => {
    chat.value.push({
      text: 'Принято, брат! Без картофана всё будет чётко.',
      from: 'gpt'
    })
  }, 1500)

  message.value = ''
}
</script>

<style scoped>
input {
  width: 100%;
}
select {
  width: 100%;
}
</style>
