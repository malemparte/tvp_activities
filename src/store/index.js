import auth from './auth';
import form from './form';
import contract from './contract';
import {createStore} from 'vuex';
 
const store = createStore({
    modules:{
        auth: auth,
        form: form,
        contract:contract
    }
});
 
export default store;