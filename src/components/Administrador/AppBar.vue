<template>
    <v-app-bar scroll-behavior="hide" color="teal-darken-2" :elevation="1">
      <template v-slot:prepend>
        <!-- Aquí puedes agregar un icono o logo si lo deseas -->
      </template>
      
      <v-app-bar-title>Farmacia La Buena</v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <!-- Nombre del usuario logueado (opcional) -->
      <span class="mr-4" v-if="username">{{ username }}</span>
      
      <!-- Botón de logout -->
      <v-btn 
        icon="mdi-logout" 
        @click="logout"
        title="Cerrar Sesión"
      ></v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'AppBar',
    data() {
      return {
        username: ''
      }
    },
    created() {
      // Obtener nombre del usuario del localStorage si existe
      const user = localStorage.getItem('user')
      if (user) {
        this.username = JSON.parse(user).name || ''
      }
    },
    methods: {
      logout() {
        // Eliminar datos de sesión
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // Redireccionar al login
        this.$router.push('/')
      }
    }
  }
  </script>