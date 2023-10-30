<script setup lang="ts">
import axios from "axios"
import { useUserInformationStore } from "@/stores/userInformation"
import type { ListResponse } from "@/types/BackendResponseTypes"
import { ref } from "vue"
import type { Question } from "@/types/Objects"
import router from "@/router"

const userInfo = useUserInformationStore()

const axiosHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${userInfo.user.token}`
}

const questions = ref<Question[]>([])

function getQuestions() {
  axios.get('http://localhost:9000/api/questions', { headers: axiosHeaders })
      .then(resp => {
        const r: ListResponse = resp.data

        if (r.success) {
          questions.value = r.list
        }
      })
}

function goCreateQuestion() {
  router.push({ name: 'questionsCreate' })
}

function goEditQuestion(idToEdit) {
  router.push({ name: 'questionsUpdate', params: { id: idToEdit } })
}

function deleteQuestion(idToDelete) {
  axios.delete(`http://localhost:9000/api/questions/${idToDelete}`, { headers: axiosHeaders })
      .then(resp => {
        if (resp.data.success) {
          getQuestions()
        }
      })
}

getQuestions()

</script>

<template>
  <div class="mainContainer">
    <div class="mainCard">
      <h2>Preguntas</h2>

      <button @click="goCreateQuestion">Crear</button>

      <div class="cardContainer" v-for="question in questions">
        <div class="resultCard">
          <div>
            <div class="fieldName">Enunciado</div>
            <div>{{ question.statement }}</div>
          </div>

          <div>
            <div class="fieldName">Alternativas</div>
            <ul v-for="alternative in question.alternatives">
              <li>(Peso: {{ alternative.answerWeight }}) - {{ alternative.sentence }}</li>
            </ul>
          </div>

          <div class="actionIconsContainer">
            <v-icon name="md-modeeditoutline-round" class="editIcon" @click="goEditQuestion(question.id)" />
            <v-icon name="md-delete" class="deleteIcon" @click="deleteQuestion(question.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  color: #030819;
}

.fieldName {
  font-weight: bold;
}

.mainCard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  border-radius: 5px;
  background-color: #b9d0cd;
}

.cardContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.resultCard {
  display: grid;
  width: 700px;
  grid-template-columns: 200px 1fr 50px;
  border-radius: 5px;
  padding: 10px;
  background-color: #a3b4c1;
  position: relative;
}

.actionIconsContainer {
  display: flex;
  gap: 10px;
  align-items: center;
}

.editIcon {
  cursor: pointer;
  color: #0a0a76;
  scale: 1.4;
  transition: 0.2s;
}
.editIcon:hover {
  color: #3d3dba;
}

.deleteIcon {
  cursor: pointer;
  color: darkred;
  scale: 1.4;
  transition: 0.2s;
}
.deleteIcon:hover {
  color: #ba4343;
}

button {
  background-color: #072328;
  width: 250px;
  color: #daf1f4;
  border: 0;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #145864;
}
</style>
