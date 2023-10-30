import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoStore } from "@/types/StoreTypes"


export const useUserInformationStore = defineStore('userInformation', () => {
    const user = ref<UserInfoStore>({
      id: 0,
      email: null,
      name: null,
      city: null,
      token: null,
      group: null,
      professional: null
    })

    function loginAction(newData) {
      user.value.id = newData.id
      user.value.email = newData.email
      user.value.name = newData.name
      user.value.city = newData.city
      user.value.token = newData.token
      user.value.group = newData.group
      user.value.professional = newData.professional
    }

    function logoutAction() {
      user.value.id = 0
      user.value.email = null
      user.value.name = null
      user.value.city = null
      user.value.token = null
      user.value.group = null
      user.value.professional = null
    }

    function updateUserField(name, value) {
      user.value[name] = value
    }

    return { user, loginAction, logoutAction, updateUserField }
  },
  {
    persist: true
  }
)
