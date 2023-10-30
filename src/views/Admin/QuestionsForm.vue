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
  return isEdit.value ? 'Actualizar pregunta' : 'Crear nueva pregunta'
})

const statement = ref<string>('')
const alternativeSentenceWeight1 = ref<string>('')
const alternativeSentenceWeight2 = ref<string>('')
const alternativeSentenceWeight3 = ref<string>('')

const errors = ref({})

const disabledButton = computed(() => {
  return statement.value === '' || alternativeSentenceWeight1.value === '' ||
      alternativeSentenceWeight2.value === '' || alternativeSentenceWeight3.value === ''
})

const axiosHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${userInfo.user.token}`
}

if (isEdit.value) {
  getQuestion()
}

function getQuestion() {
  axios.get(`http://localhost:9000/api/questions/${route.params.id}`, { headers: axiosHeaders })
      .then(resp => {
        const r: ElementResponse = resp.data

        if (r.success) {
          statement.value = r.element.statement

          r.element.alternatives.forEach(alternative => {
            if (alternative.answerWeight === 1) {
              alternativeSentenceWeight1.value = alternative.sentence
            }
            else if (alternative.answerWeight === 2) {
              alternativeSentenceWeight2.value = alternative.sentence
            }
            else if (alternative.answerWeight === 3) {
              alternativeSentenceWeight3.value = alternative.sentence
            }
          })
        }
      })
}

function sendCreateForm() {
  const sendData = {
    statement: statement.value,
    alternatives: [
      {
        sentence: alternativeSentenceWeight1.value,
        weight: 1
      },
      {
        sentence: alternativeSentenceWeight2.value,
        weight: 2
      },
      {
        sentence: alternativeSentenceWeight3.value,
        weight: 3
      },
    ]
  }

  axios.post('http://localhost:9000/api/questions', sendData, { headers: axiosHeaders })
      .then(resp => {
        if (resp.data.success) {
          router.push({ name: 'questions' })
        }
        else {
          errors.value = resp.data.errors
        }
      })
}

function sendUpdateForm() {
  const sendData = {
    statement: statement.value,
    alternatives: [
      {
        sentence: alternativeSentenceWeight1.value,
        weight: 1
      },
      {
        sentence: alternativeSentenceWeight2.value,
        weight: 2
      },
      {
        sentence: alternativeSentenceWeight3.value,
        weight: 3
      },
    ]
  }

  axios.put(`http://localhost:9000/api/questions/${route.params.id}`, sendData, { headers: axiosHeaders })
      .then(resp => {
        if (resp.data.success) {
          router.push({ name: 'questions' })
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
        <label for="statement">Enunciado</label>
        <input v-model="statement" name="statement" type="text" placeholder="Escriba el enunciado">
        <div v-if="errors['statement']">
          <div v-for="error in errors['statement']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="inputContainer">
        <label for="alternative-1">Alternativa con Peso 1</label>
        <input v-model="alternativeSentenceWeight1" type="text" placeholder="Escriba la aseveración">
        <div v-if="errors['alternative-1']">
          <div v-for="error in errors['alternative-1']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="inputContainer">
        <label for="alternative-2">Alternativa con Peso 2</label>
        <input v-model="alternativeSentenceWeight2" type="text" placeholder="Escriba la aseveración">
        <div v-if="errors['alternative-2']">
          <div v-for="error in errors['alternative-2']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="inputContainer">
        <label for="alternative-3">Alternativa con Peso 3</label>
        <input v-model="alternativeSentenceWeight3" type="text" placeholder="Escriba la aseveración">
        <div v-if="errors['alternative-3']">
          <div v-for="error in errors['alternative-3']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div v-if="errors['alternativesSentences']">
        <div v-for="error in errors['alternativesSentences']">
          <p class="p_error">{{ error }}</p>
        </div>
      </div>

      <div v-if="errors['alternativesNumber']">
        <div v-for="error in errors['alternativesNumber']">
          <p class="p_error">{{ error }}</p>
        </div>
      </div>

      <div v-if="errors['alternativesWeights']">
        <div v-for="error in errors['alternativesWeights']">
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
