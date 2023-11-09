<script lang="ts">
import router from "@/router"
import { useUserInformationStore } from "@/stores/userInformation"
import axios from "axios"
import type { LoginSuccessResponse } from "@/types/BackendResponseTypes"
import { BACKEND_URL } from "@/constants"


export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    sendLogin() {
      const userInfo = useUserInformationStore()

      axios.post(`${BACKEND_URL}/api/auth/login`, {
        email: this.email,
        password: this.password
      })
          .then(resp => {
            if (resp.data.success) {
              const r: LoginSuccessResponse = resp.data

              if (r.user.user_type) {
                userInfo.loginAction({
                  id: r.user.id,
                  email: r.user.email,
                  name: r.user.name,
                  city: r.user.city,
                  token: r.token,
                  group: r.user.user_type.name,
                  professional: r.user.assignedProfessional
                })

                if (r.user.user_type.name === 'Administrador') {
                  router.push({ name: 'adminWelcome' })
                }
                else if (r.user.user_type.name === 'Paciente') {
                  router.push({ name: 'onboard' })
                }
              }
            }
            else {
              this.errors = resp.data.errors
            }
          })
          .catch(error => {
            console.log(error)
          })
    },
  }
}
</script>

<template>
  <div class="loginContainer">
    <h1>Login</h1>

    <div class="inputsBox">
      <div class="inputContainer">
        <label for="email">Correo electrónico</label>
        <input v-model="email" name="email" type="email" placeholder="correo@host.com">
        <div v-if="errors['email']">
          <div v-for="error in errors['email']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="inputContainer">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" placeholder="●●●●●●">
        <div v-if="errors['password']">
          <div v-for="error in errors['password']">
            <p class="p_error">{{ error }}</p>
          </div>
        </div>
      </div>

      <p>No tienes una cuenta, registrate<a href="/register">aquí</a></p>
    </div>

    <button @click="sendLogin">INGRESAR</button>
  </div>
</template>

<style scoped>
.loginContainer {
  display: flex;
  padding: 25px;
  justify-content: space-between;
  flex-direction: column;
  background-color: #93aabe;
  border-radius: 10px;
  width: 380px;
  height: 400px;
  color: #030819;
}

h1 {
  font-weight: bold;
  text-align: center;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 5px
}

.inputsBox {
  display: flex;
  flex-direction: column;
  gap: 15px
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
  padding: 15px 25px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #145864;
}

.p_error {
  color: #840f0f;
}
</style>
