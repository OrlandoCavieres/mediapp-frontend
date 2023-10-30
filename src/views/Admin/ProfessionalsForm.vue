<script setup lang="ts">
import { useUserInformationStore } from "@/stores/userInformation"
import { useRoute } from "vue-router"
import { computed, ref } from "vue"
import axios from "axios"
import { ElementResponse } from "@/types/BackendResponseTypes"
import router from "@/router";


const userInfo = useUserInformationStore()
const route = useRoute()

const isEdit = computed(() => {
  return route.name?.toString().includes('Update')
})

const title = computed(() => {
  return isEdit.value ? 'Actualizar profesional' : 'Crear nuevo profesional'
})

const name = ref<string>('')
const specialty = ref<string>('')
const errors = ref({})

const disabledButton = computed(() => {
  return name.value === '' || specialty.value === ''
})

const axiosHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${userInfo.user.token}`
}

if (isEdit.value) {
  getProfessional()
}

function getProfessional() {
  axios.get(`http://localhost:9000/api/professionals/${route.params.id}`, { headers: axiosHeaders })
      .then(resp => {
        const r: ElementResponse = resp.data

        if (r.success) {
          name.value = r.element.name
          specialty.value = r.element.specialty
        }
      })
}

function sendCreateForm() {
  const sendData = {
    name: name.value,
    specialty: specialty.value
  }

  axios.post('http://localhost:9000/api/professionals', sendData, { headers: axiosHeaders })
      .then(resp => {
        if (resp.data.success) {
          router.push({ name: 'professionals' })
        }
        else {
          errors.value = resp.data.errors
        }
      })
}

function sendUpdateForm() {
  const sendData = {
    name: name.value,
    specialty: specialty.value
  }

  axios.put(`http://localhost:9000/api/professionals/${route.params.id}`, sendData, { headers: axiosHeaders })
      .then(resp => {
        if (resp.data.success) {
          router.push({ name: 'professionals' })
        }
        else {
          errors.value = resp.data.errors
        }
      })
}

</script>

<template>
  <div class="mainContainer">
    <div class="mainCard">
      <h2>{{ title }}</h2>

      <div class="inputContainer">
        <label for="name">Nombre</label>
        <input v-model="name" name="name" type="text" placeholder="Escriba nombre profesional">
        <div v-if="errors['name']">
          <div v-for="error in errors['name']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="inputContainer">
        <label for="specialty">Especialidad</label>
        <input v-model="specialty" type="text" placeholder="Escriba especialidad">
        <div v-if="errors['specialty']">
          <div v-for="error in errors['specialty']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div v-if="errors['general']">
        <div v-for="error in errors['general']">
          <p class="p_error">{{ error }}</p>
        </div>
      </div>

      <button v-if="isEdit" :class="disabledButton ? 'buttonDisable' : ''" :disabled="disabledButton" @click="sendUpdateForm">
        Actualizar
      </button>

      <button v-else :class="disabledButton ? 'buttonDisable' : ''" :disabled="disabledButton" @click="sendCreateForm">
        Crear
      </button>
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  color: #030819;
}

.mainCard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  border-radius: 5px;
  background-color: #b9d0cd;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;
}

input {
  padding: 7px 15px;
  border-radius: 5px;
  border: 0;
  font-size: 16px;
}

input:focus {
  outline: 2px solid #072328;
}

button {
  background-color: #072328;
  color: #daf1f4;
  border: 0;
  border-radius: 5px;
  padding: 10px 25px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  width: 250px;
  margin-top: 20px;
}

button:hover {
  background-color: #145864;
}

.buttonDisable {
  background-color: #50595b;
  cursor: default;
}

.buttonDisable:hover {
  background-color: #50595b;
}

.p_error {
  color: #840f0f;
}
</style>
