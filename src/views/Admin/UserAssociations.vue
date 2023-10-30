<script setup lang="ts">
import { ref } from "vue"
import type { User } from "@/types/Objects"
import { useUserInformationStore } from "@/stores/userInformation";
import axios from "axios";
import type { ListResponse } from "@/types/BackendResponseTypes";

const userInfo = useUserInformationStore()

const usersProfResults = ref<User[]>([])

const axiosHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${userInfo.user.token}`
}

function getAssociationResults() {
  axios.get('http://localhost:9000/api/patient-assigns', { headers: axiosHeaders })
      .then(resp => {
        const r: ListResponse = resp.data

        if (r.success) {
          usersProfResults.value = r.list
        }
      })
}

getAssociationResults()
</script>

<template>
  <div class="mainContainer">
    <div class="mainCard">
      <h2>Resultado asociación Paciente-Profesional</h2>

      <div class="cardContainer" v-for="userResult in usersProfResults">
        <div class="resultCard">
          <div class="resultCard_userInfo">
            <div class="fieldName">
              Paciente
            </div>

            <div>
              <div>
                <span class="fieldName">Correo: </span>{{ userResult.email }}
              </div>

              <div v-if="userResult.name">
                <span class="fieldName">Nombre: </span>{{ userResult.name }}
              </div>
              <div v-else>Sin Nombre</div>
            </div>
          </div>

          <div :class="`resultCard_stateInfo ${userResult.assignedProfessional !== null ? '' : 'pendingColor'}`">
            <div v-if="userResult.name === null">
              Paciente en onboarding inicial
            </div>

            <div v-else-if="userResult.assignedProfessional === null">
              Paciente en proceso de completar cuestionario
            </div>

            <div v-else>
              <span class="fieldName">Profesional:</span>
              {{ userResult.assignedProfessional?.name }} con especialidad {{ userResult.assignedProfessional?.specialty }}
            </div>
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
  display: flex;
  width: 700px;
  justify-content: space-between;
  border-radius: 5px;
  background-color: #a3b4c1;
  position: relative;
  overflow: clip;
}

.resultCard_userInfo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.resultCard_stateInfo {
  background-color: #739d73;
  padding: 10px;
  width: 30%;
}

.pendingColor {
  background-color: #919491;
}
</style>