import Router from "vue-router";
import SystemCustomList from "../pages/SystemCustomList/index.vue";
import SystemCustomPermission from "../pages/SystemCustomPermission/index.vue";

export default new Router({
    mode: 'hash',
    routes: [
        { path: '/system/customList', name: 'CustomList', component: SystemCustomList },
        { path: '/system/customPermission', name: 'CustomPermission', component: SystemCustomPermission }
    ]
})