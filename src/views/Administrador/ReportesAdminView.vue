<template>
    <v-container :fluid="true">

        <v-row class="mb-5 justify-center">
            <p>SELECCIONA UN REPORTE A VER:</p>
            <v-col v-for="(button, index) in buttons" :key="index" cols="auto">
                <v-btn @click="elegirReporte(button.reportType)" color="indigo darken-2" class="ma-2" dark large
                    elevation="5">
                    <v-icon left>{{ button.icon }}</v-icon>
                    {{ button.label }}
                </v-btn>
            </v-col>
        </v-row>

        <v-row style="height: 1000px;">
            <v-col class="pa-0 d-flex justify-center align-center" cols="12">

                <v-progress-circular v-if="loading" indeterminate color="indigo" size="70"
                    :width="12"></v-progress-circular>

                <iframe v-if="infoProv && !loading" :src="infoProv" height="1000px" width="100%" frameborder="0"
                    @load="onIframeLoad" />
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
.v-btn {
    font-weight: bold;
    text-transform: none;
    padding: 12px 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn:hover {
    background-color: #1E2A47;
}

.v-icon {
    font-size: 22px;
    margin-right: 10px;
}

.v-row {
    margin-top: 50px;
}

iframe {
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
export default {
    name: 'ReportesAdminView',
    data() {
        return {
            infoProv: null,
            loading: false,
            buttons: [
                { label: "Reporte Proveedores", icon: "mdi-account-group", reportType: "proveedores" },
                { label: "Reporte Empleados", icon: "mdi-account-circle", reportType: "empleados" },
                { label: "Producto más vendido", icon: "mdi-cash-multiple", reportType: "productos" },
            ]
        }
    },
    methods: {
        async elegirReporte(reportType) {
            this.loading = true;
            if (reportType === 'proveedores') {
                await this.getReporteProveedor()
            } else if (reportType === 'empleados') {
                await this.getReporteEmpleado()
            } else if (reportType === 'productos') {
                await this.getProductoMasVendido()
            }
            this.loading = false;
        },
        mostrarMensaje(mensaje, tipo = 'success') {
            Swal.fire({
                position: 'top-end',
                icon: tipo,
                title: mensaje,
                showConfirmButton: false,
                timer: 2000,
            });
        },
        onIframeLoad() {
            this.loading = false;
        },
        async getReporteProveedor() {
            try {
                const { data, status } = await axios.get('/api/reporte_proveedores');
                if (status === 200) {
                    const base64Pdf = data.pdf_base64;
                    const pdfData = `data:application/pdf;base64,${base64Pdf}`;
                    this.infoProv = pdfData;
                }
            } catch (e) {
                this.mostrarMensaje('Error al obtener los datos', 'error');
            }
        },
        async getReporteEmpleado() {
            try {
                const { data, status } = await axios.get('/api/reporte_empleados');
                if (status === 200) {
                    const base64Pdf = data.pdf_base64;
                    const pdfData = `data:application/pdf;base64,${base64Pdf}`;
                    this.infoProv = pdfData;
                }
            } catch (e) {
                this.mostrarMensaje('Error al obtener los datos', 'error');
            }
        },
        async getProductoMasVendido() {
            try {
                const { data, status } = await axios.get('/api/reporte_producto_mas_vendido');
                if (status === 200) {
                    const base64Pdf = data.pdf_base64;
                    const pdfData = `data:application/pdf;base64,${base64Pdf}`;
                    this.infoProv = pdfData;
                }
            } catch (e) {
                this.mostrarMensaje('Error al obtener los datos', 'error');
            }

        }
    },
    async created() {

    },
} 
</script>