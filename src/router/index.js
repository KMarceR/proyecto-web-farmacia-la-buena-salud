import { createRouter, createWebHistory } from 'vue-router'
import GridView from '../views/GridView.vue'
import FormView from '../views/FormView.vue'
import CardView from '../views/CardView.vue'
import AlertView from '../views/AlertView.vue'
import TabsView from '../views/TabsView.vue'
import TableView from '../views/TableView.vue'

const routes = [
  {
    path: '/',
    name: 'Grid',
    component: GridView
  },
  {
    path: '/form',
    name: 'Form',
    component: FormView
  },
  {
    path: '/card',
    name: 'Card',
    component: CardView
  },
  {
    path: '/alert',
    name: 'Alert',
    component: AlertView
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: TabsView
  },
  {
    path: '/table',
    name: 'Table',
    component: TableView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
