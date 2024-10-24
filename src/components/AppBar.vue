<template>
    <!-- Este componente mostrará una barra de aplicación -->
    <v-app-bar scroll-behavior="hide" color="blue-lighten-4">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>Farmacia La Buena</v-app-bar-title>
        <!-- Esto agregará un botón para navegar a la ruta / -->
        <v-btn icon="mdi-home" to="/"></v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar'
} 
</script>
