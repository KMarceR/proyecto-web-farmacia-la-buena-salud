<template>
  <v-app>
    <!-- Menú lateral -->
    <v-navigation-drawer class="bg-blue-lighten-4" theme="dark" permanent>
      <v-list-item link to="/" title="Grid" prepend-icon="mdi-home-outline"></v-list-item>
      <v-list-item link to="/form" title="Form" prepend-icon="mdi-cart-outline"></v-list-item>
        <v-list-item link to="/card" title="Cards" prepend-icon="mdi-medication-outline"></v-list-item>
        <v-list-item link to="/alert" title="Alerts" prepend-icon="mdi-clipboard-edit-outline"></v-list-item>
        <v-list-item link to="/tabs" title="Tabs" prepend-icon="mdi-account-group-outline"></v-list-item>
        <v-list-item link to="/table" title="Tables" prepend-icon="mdi-file-chart-outline"></v-list-item>
    </v-navigation-drawer>
    <!-- Carga de componentes -->
    <v-main>
      <AppBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'

export default {
  name: 'App',
  components: {
    AppBar
  },
} 
</script>