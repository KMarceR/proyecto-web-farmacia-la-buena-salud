<template>
  <v-app>
    <!-- Menú lateral -->
    <v-navigation-drawer class="bg-blue-lighten-4" theme="dark" permanent>
      <v-list-item link to="/" title="Inicio" prepend-icon="mdi-home-outline"></v-list-item>
      <v-list-item link to="/ventas" title="Ventas" prepend-icon="mdi-cart-outline"></v-list-item>
        <v-list-item link to="/productos" title="Productos" prepend-icon="mdi-medication-outline"></v-list-item>
        <v-list-item link to="/inventario" title="Inventario" prepend-icon="mdi-clipboard-edit-outline"></v-list-item>
        <v-list-item link to="/usuarios" title="Usuarios" prepend-icon="mdi-account-group-outline"></v-list-item>
        <v-list-item link to="/reportes" title="Reportes" prepend-icon="mdi-file-chart-outline"></v-list-item>
    </v-navigation-drawer>
    <!-- Carga de componentes -->
    <v-main>
      <AppBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/Administrador/AppBar.vue'

export default {
  name: 'App',
  components: {
    AppBar
  },
} 
</script>