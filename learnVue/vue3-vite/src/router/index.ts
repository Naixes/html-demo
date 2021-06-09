import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const Chart = () => import('../components/Chart.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/chart',
        component: Chart,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router