<template>
    <v-container :fluid="true">
        <!-- Header -->
        <v-row>
            <v-col class="text-indigo">
                <h1>Medicamentos</h1>
            </v-col>
        </v-row>

        <!-- Búsqueda y Filtros -->
        <v-row class="mb-1">
            <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="busqueda" label="Buscar Medicamento" prepend-inner-icon="mdi-magnify" clearable
                    hide-details></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-select v-model="categoriaSeleccionada" :items="categorias" item-title="nombre_categoria"
                    item-value="id" label="Filtrar por categoría" clearable hide-details></v-select>
            </v-col>
        </v-row>

        <!-- Tabla de productos -->
        <v-row>
            <v-col cols="12">
                <v-data-table class="border rounded-md" :headers="headers" :items="productosFiltrados"
                    :items-per-page="5" :loading="loading" :header-props="{
                        class: 'bg-teal-lighten-2'
                    }" no-data-text="No se encontraron productos">
                    <template v-slot:top>
                        <v-toolbar flat class="bg-grey-lighten-5">
                            <v-toolbar-title>Administrar Medicamentos</v-toolbar-title>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="light-blue-darken-2" variant="flat" dark v-bind="props">
                                        <v-icon left>mdi-plus</v-icon>
                                        Agregar Medicamento
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="pa-4 bg-teal-lighten-2">
                                        <span class="text-h5 text-white">{{ formTitle }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container class="px-0">
                                            <v-form ref="formRef" v-model="valid">
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="producto.nombre_producto"
                                                            :rules="[rules.required]" label="Nombre del producto"
                                                            required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-select v-model="producto.categoria_id" :items="categorias"
                                                            item-value="id" item-title="nombre_categoria"
                                                            label="Categoría" :rules="[rules.required]"
                                                            required></v-select>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <v-text-field v-model="producto.precio"
                                                            :rules="[rules.required, rules.positive]" label="Precio"
                                                            type="number" required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <v-text-field v-model="producto.stock"
                                                            :rules="[rules.required, rules.integer]" label="Stock"
                                                            type="number" required></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-form>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" variant="flat" @click="cerrarDialogo">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="success" variant="flat" :disabled="!valid"
                                            @click="producto.id ? actualizarProducto() : crearProducto()">
                                            Guardar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template #[`item.categoria_nombre`]="{ item }">
                        {{ item.categoria_nombre }}
                    </template>
                    <template #[`item.opciones`]="{ item }">
                        <v-icon color="info" size="small" class="me-2" @click="editarProducto(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon color="error" size="small" @click="eliminarProducto(item.id)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            dialog: false,
            busqueda: '',
            categoriaSeleccionada: null,
            producto: {
                id: null,
                nombre_producto: '',
                precio: '',
                stock: '',
                categoria_id: '',
            },
            productos: [],
            categorias: [],
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Nombre', key: 'nombre_producto' },
                { title: 'Precio', key: 'precio' },
                { title: 'Stock', key: 'stock' },
                { title: 'Categoría', key: 'categoria_nombre' },
                { title: 'Opciones', key: 'opciones', sortable: false },
            ],
            valid: false,
            loading: false,
            rules: {
                required: (value) => !!value || 'Campo requerido.',
                positive: (value) => value > 0 || 'Debe ser un valor positivo.',
                integer: (value) => Number.isInteger(+value) || 'Debe ser un número entero.',
            },
        };
    },
    computed: {
        formTitle() {
            return this.producto.id ? 'Editar Producto' : 'Nuevo Producto';
        },
        productosFiltrados() {
            if (!this.productos) return [];

            return this.productos
                .filter(producto => {
                    const nombreProducto = (producto.nombre_producto || '').toLowerCase();
                    const busqueda = (this.busqueda || '').toLowerCase();
                    const coincideCategoria = !this.categoriaSeleccionada ||
                        producto.categoria_id === this.categoriaSeleccionada;
                    const coincideNombre = nombreProducto.includes(busqueda);

                    return coincideNombre && coincideCategoria;
                })
                .map(producto => {
                    const categoria = this.categorias.find(c => c.id === producto.categoria_id);
                    return {
                        ...producto,
                        categoria_nombre: categoria ? categoria.nombre_categoria : 'Sin categoría',
                    };
                });
        },
    },
    methods: {
        mostrarMensaje(mensaje, tipo = 'success') {
            Swal.fire({
                position: 'top-end',
                icon: tipo,
                title: mensaje,
                showConfirmButton: false,
                timer: 2000,
            });
        },
        async obtenerProductos() {
            this.loading = true;
            try {
                const { data } = await axios.get('/api/productos/select',);
                if (data.code === 200) {
                    this.productos = data.data;
                }
            } catch (error) {
                this.mostrarMensaje('Error al obtener los productos', 'error');
            } finally {
                this.loading = false;
            }
        },
        async obtenerCategorias() {
            try {
                const { data } = await axios.get('/api/categorias/select');
                if (data.code === 200) {
                    this.categorias = data.data;
                }
            } catch (error) {
                this.mostrarMensaje('Error al obtener las categorías', 'error');
            }
        },
        async crearProducto() {
            try {
                const { data } = await axios.post('/api/productos/store', this.producto);
                if (data.code === 200) {
                    this.mostrarMensaje('Producto agregado correctamente');
                    this.obtenerProductos();
                }
            } catch (error) {
                this.mostrarMensaje('Error al agregar el producto', 'error');
            } finally {
                this.cerrarDialogo();
            }
        },
        async actualizarProducto() {
            try {
                const { data } = await axios.put(
                    `/api/productos/update/${this.producto.id}`,
                    this.producto
                );
                if (data.code === 200) {
                    this.mostrarMensaje('Producto actualizado correctamente');
                    this.obtenerProductos();
                }
            } catch (error) {
                this.mostrarMensaje('Error al actualizar el producto', 'error');
            } finally {
                this.cerrarDialogo();
            }
        },
        editarProducto(producto) {
            this.producto = { ...producto };
            this.dialog = true;
        },
        async eliminarProducto(id) {
            const confirm = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esto.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
            });

            if (confirm.isConfirmed) {
                try {
                    const { data } = await axios.delete(`/api/productos/delete/${id}`);
                    if (data.code === 200) {
                        this.mostrarMensaje('Producto eliminado correctamente');
                        this.obtenerProductos();
                    }
                } catch (error) {
                    this.mostrarMensaje('Error al eliminar el producto', 'error');
                }
            }
        },
        cerrarDialogo() {
            this.dialog = false;
            this.producto = {
                id: null,
                nombre_producto: '',
                precio: '',
                stock: '',
                categoria_id: '',
            };
        },
    },
    created() {
        this.obtenerProductos();
        this.obtenerCategorias();
    },
};
</script>