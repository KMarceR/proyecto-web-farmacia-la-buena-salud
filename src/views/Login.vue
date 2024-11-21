<template>
    <v-app>
      <v-app-bar app color="teal-darken-2" dark>
        <v-toolbar-title>Farmacia La Buena</v-toolbar-title>
      </v-app-bar>
  
      <v-container class="fill-height d-flex justify-center align-center">
        <v-card class="d-flex justify-center align-center flex-row pa-3" max-width="1000" elevation="5">
          <!-- Logo Section -->
          <v-col cols="7" class="d-flex align-center justify-center">
            <img :src="logo" alt="Farmacia La Buena" style="max-width: 80%; height: auto;" />
          </v-col>
  
          <!-- Form Section -->
          <v-col cols="5">
            <v-form ref="loginForm" v-model="isFormValid" @submit.prevent="login">
              <v-row>
                <!-- Email Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    label="Correo"
                    variant="outlined"
                    type="email"
                    density="comfortable"
                    required
                    :rules="[rules.required, rules.email]"
                    @keyup.enter="login"
                  ></v-text-field>
                </v-col>
  
                <!-- Password Field -->
                <v-col cols="12">
                  <v-text-field
                    v-model="form.password"
                    label="Contraseña"
                    variant="outlined"
                    :type="showPassword ? 'text' : 'password'"
                    density="comfortable"
                    required
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="togglePassword"
                    :rules="[rules.required, rules.password]"
                    @keyup.enter="login"
                  ></v-text-field>
                </v-col>
  
                <!-- Login Button -->
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn 
                    color="teal-darken-2" 
                    block 
                    size="large" 
                    type="submit"
                    :loading="loading"
                    :disabled="!isFormValid"
                  >
                    Iniciar Sesión
                  </v-btn>
                </v-col>
  
                <!-- Error Alert -->
                <v-col cols="12">
                  <v-alert
                    v-if="errorVisible"
                    type="error"
                    closable
                    variant="tonal"
                    @click:close="closeError"
                  >
                    {{ errorMessage }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from 'vue-router';
  import axios from "axios";
  import logo from "@/assets/logofar.png";
  
  export default {
    name: "LoginView",
    setup() {
      const router = useRouter();
      const loginForm = ref(null);
      const isFormValid = ref(false);
      const form = ref({
        email: "",
        password: "",
      });
  
      const showPassword = ref(false);
      const loading = ref(false);
      const errorMessage = ref("");
      const errorVisible = ref(false);
  
      const rules = {
        required: (value) => !!value || "Este campo es obligatorio",
        email: (value) => {
          const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
          return pattern.test(value) || "El correo no es válido";
        },
        password: (value) => {
          if (!value) return "La contraseña es obligatoria";
          if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres";
          return true;
        }
      };
  
      const togglePassword = () => {
        showPassword.value = !showPassword.value;
      };
  
      const closeError = () => {
        errorVisible.value = false;
        errorMessage.value = "";
      };
  
      const login = async () => {
        try {
          const isValid = await loginForm.value?.validate();
          if (!isValid) return;
  
          loading.value = true;
          errorVisible.value = false;
  
          const response = await axios.post("http://127.0.0.1:8000/api/usuario/login", form.value);
          console.log('Respuesta del servidor:', response.data);
  
          // Guardar token
          localStorage.setItem("token", response.data.token);
  
          // Procesar datos del usuario
          const userData = response.data.data;
          if (userData) {
            const userToStore = {
              name: userData.name,
              email: userData.email,
              rol_id: userData.rol_id
            };
  
            console.log('Datos de usuario a guardar:', userToStore);
            localStorage.setItem("user", JSON.stringify(userToStore));
          }
  
          router.push({ name: 'InicioAV' });
        } catch (error) {
          console.error('Error durante el login:', error);
          
          if (error.response?.status === 401) {
            errorMessage.value = "Correo o contraseña incorrectos";
          } else if (error.response?.data?.message) {
            errorMessage.value = error.response.data.message;
          } else {
            errorMessage.value = "Error al iniciar sesión. Intente nuevamente.";
          }
          errorVisible.value = true;
        } finally {
          loading.value = false;
        }
      };
  
      return {
        form,
        showPassword,
        togglePassword,
        login,
        loading,
        errorMessage,
        errorVisible,
        rules,
        logo,
        closeError,
        loginForm,
        isFormValid
      };
    },
  };
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
  }
  
  .v-card {
    transition: transform 0.2s;
  }
  
  .v-card:hover {
    transform: translateY(-5px);
  }
  
  .v-btn {
    text-transform: none;
  }
  </style>