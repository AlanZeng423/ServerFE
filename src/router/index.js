import {createRouter, createWebHistory} from 'vue-router'
import Index from '../views/IndexView.vue'
import LoginView from '@/views/LoginView.vue';


// Vue.use(VueRouter)
const routes = [{
        path: '/home',
        name: 'Home',
        component: Index
    }, {
        path: '/',
        name: 'Index',
        component: Index
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;