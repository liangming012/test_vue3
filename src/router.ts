import { createWebHistory, createRouter } from 'vue-router'
const  routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "start" */ './views/main/Start.vue'),
  },

];


const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes, //same --- > routes:routes
})

export default router