<script lang="ts">
import { useUserInformationStore } from "@/stores/userInformation"
import { usePatientDiagStateStore } from "@/stores/patientDiagState"
import router from "@/router"
import axios from "axios"

export default {
  beforeCreate() {
    const userInfo = useUserInformationStore()
    const diagStep = usePatientDiagStateStore()

    if (userInfo.user.city !== null && userInfo.user.name !== null) {
      diagStep.setStep(1)
      router.replace({ name: 'diagnostic' })
    }
  },
  data() {
    return {
      city: '',
      name: '',
      errors: {}
    }
  },
  computed: {
    disabledButton: function() {
      return this.city === '' || this.name === ''
    }
  },
  methods: {
    nextStep() {
      const processState = usePatientDiagStateStore()
      const userInfo = useUserInformationStore()

      const toSend = {
        name: this.name,
        city: this.city
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.user.token}`
      }

      axios.post('http://localhost:9000/api/auth/patient/onboard', toSend, { headers })
          .then(resp => {
            if (resp.data.success) {
              processState.setStep(1)
              userInfo.updateUserField('name', this.name)
              userInfo.updateUserField('city', this.city)
              router.replace({ name: 'diagnostic' })
            }
            else {
              this.errors = resp.data.errors
            }
          })
    }
  }
}
</script>

<template>
  <div class="mainContainer">
    <div class="mainCard">
      <div class="inputContainer">
        <label for="name">Nombre completo</label>
        <input v-model="name" name="name" type="text" placeholder="Escriba su nombre">
        <div v-if="errors['name']">
          <div v-for="error in errors['name']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="inputContainer">
        <label for="city">Ciudad</label>
        <input v-model="city" type="text" placeholder="Escriba su ciudad">
        <div v-if="errors['city']">
          <div v-for="error in errors['city']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <button :class="disabledButton ? 'buttonDisable' : ''" :disabled="disabledButton" @click="nextStep">
        Siguiente
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