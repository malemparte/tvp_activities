import { createApp } from 'vue'
import Appp from './App.vue';
import router from './router';
import store from './store/index';
import Axios from 'axios';

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';
import PrimeVue from 'primevue/config';
import Sidebar from 'primevue/sidebar';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

import "primevue/resources/themes/bootstrap4-dark-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(Appp).use(router);
app.use(PrimeVue);
app.use(store);

app.component('Toolbar', Toolbar);
app.component('Buttonp', Button);
app.component('SplitButtonp', SplitButton);
app.component('Sidebarp', Sidebar);
app.component('InputText', InputText);
app.component('Password', Password);

router.isReady().then(() => {
  app.mount('#app');
});

Axios.interceptors.request.use(function (config) {	
  if (config.method !== 'options' && store.getters['auth2/access_token']) {
		config.headers.Authorization = `Bearer ${store.getters['auth2/access_token']}`;
		config.headers.uuid = window.device.uuid;
		config.headers.employee = store.getters['auth/user'];
  }
  return config
}, function (error) {
  console(error.reponse.data);
});



