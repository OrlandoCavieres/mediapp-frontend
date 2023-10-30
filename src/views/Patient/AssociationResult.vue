<script lang="ts">

import { useUserInformationStore } from "@/stores/userInformation"

export default {
  data() {
    return {
      user: useUserInformationStore().user
    }
  }
}

</script>

<template>
  <div class="mainContainer">
    <div><span class="userName">{{ user.name?.toUpperCase() }}</span>, has sido asignada/o mediante el diagnóstico a:</div>

    <div class="resultBox">
      <div>Nombre</div>
      <div class="resultBox_fieldValue">{{ user.professional?.name }}</div>

      <div>Especialidad</div>
      <div class="resultBox_fieldValue">{{ user.professional?.specialty }}</div>
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  color: #030819;
}

.userName {
  color: #13434c;
  font-weight: bold;
}

.resultBox {
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: #b9d0cd;
}

.resultBox_fieldValue {
  font-weight: bold;
}
</style>
