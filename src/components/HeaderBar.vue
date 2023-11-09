<script lang="ts">
import { usePatientDiagStateStore } from "@/stores/patientDiagState"
import { useUserInformationStore } from "@/stores/userInformation"
import router from "@/router"

export default {
  data() {
    return {
      userGroup: useUserInformationStore().user.group,
    }
  },
  computed: {
    diagStep: () => usePatientDiagStateStore().step
  },
  methods: {
    goTo(viewName: string) {
      if (this.$route.name !== viewName) {
        router.push({ name: viewName })
      }
    },
    logout() {
      const userInfo = useUserInformationStore()
      const diagStore = usePatientDiagStateStore()
      userInfo.logoutAction()
      diagStore.setStep(0)
      router.replace({ name: 'login' })
    }
  }
}
</script>

<template>
  <div class="mainContainer">
    <div v-if="userGroup === 'Administrador'" class="leftSideContainer">
      <div v-bind:class="$route.name === 'adminWelcome' ? 'headerButtonActive' : 'headerButton'"
           @click="goTo('adminWelcome')">
        Inicio
      </div>

      <div v-bind:class="$route.name === 'questions' ? 'headerButtonActive' : 'headerButton'"
           @click="goTo('questions')">
        Preguntas
      </div>

      <div v-bind:class="$route.name === 'professionals' ? 'headerButtonActive' : 'headerButton'"
           @click="goTo('professionals')">
        Profesionales
      </div>

      <div v-bind:class="$route.name === 'associations' ? 'headerButtonActive' : 'headerButton'"
           @click="goTo('associations')">
        Resultados de Diagnóstico
      </div>
    </div>

    <div v-if="userGroup === 'Paciente'" class="leftSideContainer">
      <div v-if="diagStep === 0 || diagStep === 1" class="headerButtonActive">
        Proceso Diagnóstico
      </div>

      <div v-if="diagStep === 2" class="headerButtonActive">
        Resultado
      </div>
    </div>

    <div class="headerButton" @click="logout">
      Salir
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 25px;
  padding: 10px 30px;
  min-height: 50px;
  width: 100vw;

  background-color: #0f312e;
}

.leftSideContainer {
  display: flex;
  align-items: center;
  gap: 25px;
}

.headerButton {
  cursor: pointer;
  border-radius: 10px;
  padding: 5px 10px;
  user-select: none;
}
.headerButton:hover {
  background-color: #174f4a;
}
.headerButtonActive {
  border-radius: 10px;
  padding: 5px 10px;
  font-weight: bold;
  user-select: none;
  background-color: #174f4a;
}
</style>