import { createRouter, createWebHistory } from 'vue-router'
import InicioAdminView from '../views/Administrador/InicioAdminView.vue'
import VentasAdminView from '../views/Administrador/VentasAdminView.vue'
import MedicamentosAdminView from '../views/Administrador/MedicamentosAdminView.vue'
import InventarioAdminView from '../views/Administrador/InventarioAdminView.vue'
import UsuariosAdminView from '../views/Administrador/UsuariosAdminView.vue'
import ReportesAdminView from '../views/Administrador/ReportesAdminView.vue'
import ProveedoresView from '@/views/Administrador/ProveedoresView.vue'

const routes = [
  {
    path: '/',
    name: 'InicioAV',
    component: InicioAdminView
  },
  {
    path: '/ventas',
    name: 'VentasAV',
    component: VentasAdminView
  },
  {
    path: '/medicamentos',
    name: 'MedicamentosAV',
    component: MedicamentosAdminView
  },
  {
    path: '/inventario',
    name: 'InventarioAV',
    component: InventarioAdminView
  },
  {
    path: '/usuarios',
    name: 'UsuariosAV',
    component: UsuariosAdminView
  },
  {
    path: '/reportes',
    name: 'ReportesAV',
    component: ReportesAdminView
  },
  {
    path: '/proveedores',
    name: 'ProveedoresAV',
    component: ProveedoresView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
