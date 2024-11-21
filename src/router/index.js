// index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AuthLayout from '@/views/layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: AuthLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/inicio',
        name: 'InicioAV',
        component: () => import('../views/Administrador/InicioAdminView.vue')
      },
      {
        path: '/ventas',
        name: 'VentasAV',
        component: () => import('../views/Administrador/VentasAdminView.vue')
      },
      {
        path: '/medicamentos',
        name: 'MedicamentosAV',
        component: () => import('../views/Administrador/MedicamentosAdminView.vue')
      },
      {
        path: '/inventario',
        name: 'InventarioAV',
        component: () => import('../views/Administrador/InventarioAdminView.vue')
      },
      {
        path: '/usuarios',
        name: 'UsuariosAV',
        component: () => import('../views/Administrador/UsuariosAdminView.vue')
      },
      {
        path: '/reportes',
        name: 'ReportesAV',
        component: () => import('../views/Administrador/ReportesAdminView.vue')
      },
      {
        path: '/proveedores',
        name: 'ProveedoresAV',
        component: () => import('@/views/Administrador/ProveedoresView.vue')
      },
      {
        path: '/categorias',
        name: 'CategoriasAV',
        component: () => import('@/views/Administrador/CategoriasView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else if (token && to.name === 'Login') {
    next({ name: 'InicioAV' })
  } else {
    next()
  }
})

export default router
