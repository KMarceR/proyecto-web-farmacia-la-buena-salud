import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'

// Configuración base de axios
axios.defaults.baseURL = 'http://127.0.0.1:8000'

// Interceptor para requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Interceptor para responses
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    router.push('/login')
  }
  return Promise.reject(error)
})

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
