import ClientView from '@/views/client/ClientView.vue';
import HomeView from '@/views/HomeView.vue';
import ClientVisitsView from '@/views/visit/ClientVisitsView.vue';
import VisitView from '@/views/visit/VisitView.vue';
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/client',
        name: 'client',
        component: ClientView
    },
    {
        path: '/visit',
        name: 'visit',
        component: VisitView
    },
    {
        path: '/client/:id/visits',
        name: 'client-isit',
        component: ClientVisitsView
      }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
export default router;