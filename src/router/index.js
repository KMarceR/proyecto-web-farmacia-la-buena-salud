import { createRouter, createWebHistory } from 'vue-router'
import InicioAdminView from '../views/Administrador/InicioAdminView.vue'
import VentasAdminView from '../views/Administrador/VentasAdminView.vue'
import ProductosAdminView from '../views/Administrador/ProductosAdminView.vue'
import InventarioAdminView from '../views/Administrador/InventarioAdminView.vue'
import UsuariosAdminView from '../views/Administrador/UsuariosAdminView.vue'
import ReportesAdminView from '../views/Administrador/ReportesAdminView.vue'

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
    path: '/productos',
    name: 'ProductosAV',
    component: ProductosAdminView
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
