import { defineStore } from 'pinia'

export const useUserData = defineStore('userdata', () => {
  const type = ref('')
  const sex = ref('male')
  const age = ref(null)
  const height = ref(null)
  const weight = ref(null)
  const targetWeight = ref(null)
  const equipment = ref('')
  const other = ref('')
  const form = ref('nothing')

  return {
    type,
    sex,
    age,
    height,
    weight,
    targetWeight,
    equipment,
    other,
    form
  }
})
