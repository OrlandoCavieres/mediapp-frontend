import { ref } from 'vue'
import { defineStore } from 'pinia'


export const usePatientDiagStateStore = defineStore('patiendDiagState', () => {
    const step = ref<number>(0)

    function setStep(newValue: number) {
      step.value = newValue
    }

    return { step, setStep }
  },
  {
    persist: true
  }
)
