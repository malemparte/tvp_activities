import { createWebHistory, createRouter } from "vue-router";
import Login from '../views/LoginPage';
import Home from '../views/HomePage';
import SelectContract from '../views/SelectContract';
import AddActivityType from '../views/AddActivityType';
import AddActivity from '../views/AddActivity';
import DoActivity from '../views/DoActivity';
import CalendarActivity from '../views/CalendarActivity';
import ComplianceActivity from '../views/ComplianceActivity';
import MyResult from '../views/MyResult';

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
        path: '/add-activity',
        alias: ['/add-activity'],
        name: 'add-activity',
        component: AddActivity,
        meta: {
            module: 'activity'
        }
    },
    {
        path: '/add-activitytype',
        alias: ['/add-activitytype'],
        name: 'add-activitytype',
        component: AddActivityType,
        meta: {
            module: 'activity-type'
        }
    },
    {
        path: '/do-activity',
        alias: ['/do-activity'],
        name: 'do-activity',
        component: DoActivity,
        meta: {
            module: 'do-activity'
        }
    },
    {
        path: '/compliance-activity',
        alias: ['/compliance-activity'],
        name: 'compliance-activity',
        component: ComplianceActivity,
        meta: {
            module: 'compliance-activity'
        }
    },
    {
        path: '/calendar-activity',
        alias: ['/calendar-activity'],
        name: 'calendar-activity',
        component: CalendarActivity,
        meta: {
            module: 'activity'
        }
    },
    {
        path: '/my-result',
        alias: ['/my-result'],
        name: 'my-result',
        component: MyResult,
        meta: {
            module: 'activity'
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
