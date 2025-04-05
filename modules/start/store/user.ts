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

  const clearData = () => {
    type.value = ''
    sex.value = 'male'
    age.value = null
    height.value = null
    weight.value = null
    targetWeight.value = null
    equipment.value = ''
    other.value = ''
    form.value = 'nothing'
  }

  return {
    type,
    sex,
    age,
    height,
    weight,
    targetWeight,
    equipment,
    other,
    form,
    clearData
  }
})
