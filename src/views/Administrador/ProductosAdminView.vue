<template>
    <v-container :fluid=true>
        <v-row>
            <v-col class="text-indigo">
                <h1>Productos</h1>
            </v-col>
        </v-row>

        <!-- Formulario de ingreso de datos de medicamentos -->
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field label="Nombre del medicamento"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field label="Categoría"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field label="Precio" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field label="Cantidad" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn color="primary">Agregar Medicamento</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                :items-length="totalItems" :loading="loading" item-value="name"
                @update:options="loadItems"></v-data-table-server>
        </v-row>

    </v-container>
</template>

<script>
export default {
    name: 'ProductosAdminView'
}
</script>