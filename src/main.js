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
import Menu from 'primevue/menu';
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FullCalendar from 'primevue/fullcalendar';
import InputSwitch from 'primevue/inputswitch';
import FileUpload from 'primevue/fileupload';
import Calendar from 'primevue/calendar';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';



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
app.component('Menu', Menu);
app.component('Dropdown', Dropdown);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('FullCalendar', FullCalendar);
app.component('InputSwitch', InputSwitch);
app.component('FileUpload', FileUpload);
app.component('Calendar', Calendar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Message', Message);
app.component('AutoComplete', AutoComplete);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);

router.isReady().then(() => {
  app.mount('#app');
});

Axios.interceptors.request.use(function (config) {	

  if (config.method !== 'options' && store.getters['auth/access_token']) {
		config.headers.Authorization = `Bearer ${store.getters['auth/access_token']}`;
		//config.headers.uuid = window.device.uuid;
		config.headers.employee = store.getters['auth/user'];
  }
  return config
}, function (error) {
  console(error.reponse.data);
});



