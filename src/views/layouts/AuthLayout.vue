<!-- src/views/layouts/AuthLayout.vue -->
<template>
    <v-layout>
      <v-main>
        <app-bar />
        <v-container fluid class="pa-4">
          <router-view />
        </v-container>
      </v-main>
      <v-navigation-drawer 
        v-model="drawer" 
        :rail="rail" 
        permanent 
        @click="rail = false" 
        class="bg-grey-lighten-2"
        theme="dark"
      >
        <v-list-item
          prepend-avatar="https://img.freepik.com/premium-photo/historian-digital-avatar-generative-ai_934475-9000.jpg"
          :title="userName"
          nav
        >
          <template v-slot:append>
            <v-btn 
              icon="mdi-chevron-left" 
              variant="text" 
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item link to="/inicio" title="Inicio" prepend-icon="mdi-home-outline"></v-list-item>
          <v-list-item link to="/ventas" title="Ventas" prepend-icon="mdi-cart-outline"></v-list-item>
          <v-list-item link to="/medicamentos" title="Medicamentos" prepend-icon="mdi-pill"></v-list-item>
          <v-list-item link to="/categorias" title="Categorias" prepend-icon="mdi-tag-multiple"></v-list-item>
          <v-list-item link to="/inventario" title="Inventario" prepend-icon="mdi-clipboard-edit-outline"></v-list-item>
          <v-list-item link to="/usuarios" title="Usuarios" prepend-icon="mdi-account-group-outline"></v-list-item>
          <v-list-item link to="/reportes" title="Reportes" prepend-icon="mdi-file-chart-outline"></v-list-item>
          <v-list-item link to="/proveedores" title="Proveedores" prepend-icon="mdi-file-chart-outline"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
</template>

<script>
import AppBar from '@/components/Administrador/AppBar.vue'

export default {
  name: 'AuthLayout',
  components: {
    AppBar
  },
  data() {
    return {
      drawer: true,
      rail: true,
      userName: 'Usuario'
    }
  },
  created() {
    try {
      // Verificar autenticación
      if (!localStorage.getItem('token')) {
        this.$router.push('/')
        return
      }

      // Obtener datos del usuario
      const userStr = localStorage.getItem('user')
      console.log('Datos raw del localStorage:', userStr)

      if (userStr) {
        const userData = JSON.parse(userStr)
        console.log('Datos del usuario:', userData)

        // Enfocarnos específicamente en name
        if (userData && userData.name) {
          this.userName = userData.name
          console.log('Nombre de usuario encontrado:', this.userName)
        } else {
          console.log('No se encontró la propiedad name')
          this.userName = 'Usuario'
        }
      }
    } catch (error) {
      console.error('Error al obtener el nombre:', error)
      this.userName = 'Usuario'
    }
  },
  methods: {
    toggleRail() {
      this.rail = !this.rail
    }
  },
  watch: {
    '$route'() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.v-main {
  background-color: #f5f5f5;
}

.v-container {
  max-width: 1400px;
}

.v-navigation-drawer {
  transition: width 0.3s ease;
}
</style>