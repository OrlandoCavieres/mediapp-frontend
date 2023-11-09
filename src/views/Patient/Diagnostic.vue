<script setup lang="ts">
import { useUserInformationStore } from "@/stores/userInformation"
import { usePatientDiagStateStore } from "@/stores/patientDiagState"
import router from "@/router"
import axios from "axios";
import type { AssignProfResponse, ListResponse } from "@/types/BackendResponseTypes"
import type { Question } from "@/types/Objects"
import { computed, ref } from "vue"
import { BACKEND_URL } from "@/constants"

const questions = ref<Question[]>([])
const questionPoints = ref<number[]>([])

const userInfo = useUserInformationStore()
const diagStep = usePatientDiagStateStore()

const axiosHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${userInfo.user.token}`
}

if (userInfo.user.professional) {
  diagStep.setStep(2)
  router.replace({ name: 'associationResult' })
}

const finalScore = computed(() => {
  return questionPoints.value.reduce((total, actual) => total + actual, 0)
})

const isAllAnswered = computed(() => {
  const filterZeros = questionPoints.value.filter(value => value !== 0)
  return filterZeros.length === questions.value.length
})

function getQuestions() {

  axios.get(`${BACKEND_URL}/api/questions`, { headers: axiosHeaders })
      .then(resp => {
        const r: ListResponse = resp.data

        if (r.success) {
          questions.value = r.list
          questionPoints.value = [...Array(questions.value.length)].map(val => 0)
        }
      })
}

function sendScoreResult() {
  console.log(finalScore.value)

  axios.post(`${BACKEND_URL}/api/result-diagnostic`, { total: finalScore.value }, { headers: axiosHeaders })
      .then(resp => {
        const r: AssignProfResponse = resp.data

        if (r.success) {
          userInfo.updateUserField('professional', r.assignedProfessional)
          diagStep.setStep(2)
          router.replace({ name: 'associationResult' })
        }
      })
}

getQuestions()
</script>

<template>
  <div class="mainContainer">
    <div class="mainCard">
      <h2>Diagnóstico</h2>

      <div v-for="(question, index) in questions">
        <div>{{ question.statement }}</div>

        <div v-for="alternative in question.alternatives">
          <input type="radio" :name="`${question.id}-${alternative.id}`"
                 v-model="questionPoints[index]" :value="alternative.answerWeight" />
          <label :for="`${question.id}-${alternative.id}`">{{ alternative.sentence }}</label>
        </div>
      </div>

      <button :class="!isAllAnswered ? 'buttonDisable' : ''" :disabled="!isAllAnswered" @click="sendScoreResult">
        Terminar
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