import { createWebHistory, createRouter } from "vue-router";
import Login from '../views/LoginPage';
import Home from '../views/HomePage';
import SelectContract from '../views/SelectContract';


const routes = [
  {
        path: '/',
        alias: ['/'],
        name: 'login',
        component: Login,
        meta: {
            module: 'authentication'
        }
    },
    {
        path: '/home',
        alias: ['/home'],
        name: 'home',
        component: Home,
        meta: {
            module: 'home'
        }
    },
    {
        path: '/select-contract',
        alias: ['/select-contract'],
        name: 'select-contract',
        component: SelectContract,
        meta: {
            module: 'contract'
        }
    },
    {
        name: 'logout',
        path: '/logout',
        redirect: to => {
            console.log(to);
            return {name: 'login'};
        },
        meta: {
            module: 'authentication'
        }
    },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
