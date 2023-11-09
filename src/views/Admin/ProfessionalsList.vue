<script setup lang="ts">
import axios from "axios"
import { useUserInformationStore } from "@/stores/userInformation"
import type { ListResponse } from "@/types/BackendResponseTypes"
import { ref } from "vue"
import type { Professional } from "@/types/Objects"
import router from "@/router";
import { BACKEND_URL } from "@/constants";

const userInfo = useUserInformationStore()

const axiosHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${userInfo.user.token}`
}

const professionals = ref<Professional[]>([])

function getProfessionals() {
  axios.get(`${BACKEND_URL}/api/professionals`, { headers: axiosHeaders })
      .then(resp => {
        const r: ListResponse = resp.data

        if (r.success) {
          professionals.value = r.list
        }
      })
}

function goCreateProf() {
  router.push({ name: 'professionalsCreate' })
}

function goEditProf(idToEdit) {
  router.push({ name: 'professionalsUpdate', params: { id: idToEdit } })
}

function deleteProf(idToDelete) {
  console.log(`eliminar id ${idToDelete}`)

  axios.delete(`${BACKEND_URL}/api/professionals/${idToDelete}`, { headers: axiosHeaders })
      .then(resp => {
        if (resp.data.success) {
          getProfessionals()
        }
      })
}

getProfessionals()

</script>

<template>
  <div class="mainContainer">
    <div class="mainCard">
      <h2>Profesionales</h2>

      <button @click="goCreateProf">Crear</button>

      <div class="cardContainer" v-for="prof in professionals">
        <div class="resultCard">
          <div>
            <div class="fieldName">Nombre</div>
            <div>{{ prof.name }}</div>
          </div>

          <div>
            <div class="fieldName">Especialidad</div>
            <div>{{ prof.specialty }}</div>
          </div>

          <div class="actionIconsContainer">
            <v-icon name="md-modeeditoutline-round" class="editIcon" @click="goEditProf(prof.id)" />
            <v-icon name="md-delete" class="deleteIcon" @click="deleteProf(prof.id)" />
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
  grid-template-columns: 1fr 1fr 50px;
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