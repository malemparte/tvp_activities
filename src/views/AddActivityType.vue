<template id="login">
        <div class="md-min-width card m-5">
                <h5>Ingreso Tipo Actividad</h5>

                <div class="field mt-3">
                    <!--h5 for="name1">Nombre</h5-->
                    <InputText id="name1" type="name" :class="{'p-invalid' : error.name}" v-model="name" placeholder="Nombre tipo"/>
                    <h6 v-if="error.name" id="name1-help" class="p-error">Nombre es obligatorio.</h6>
                </div>

                <buttonp class="w-8rem mt-5 p-button-warning" icon="pi pi-save" label="Guardar" @click.prevent="add()"/>
        </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import ActivityService from '@/service/ActivityService';
    import ContractService from '@/service/ContractService';


    let AddActivityType = {};
    (function () {
        this.name = 'add-activitytype';
        // let _self = null;

        this.created = function () {
            //this.getAllContracts();
        };

        this.mounted  = function () {

        };

        this.data = function () {
            return {
                name: '',
                activity: {name:null, contract_id: null},
                contracts: [],
                selectedContract: null,

            }
        };
        this.methods = {
            add() {
                this.$store.dispatch('form/reset');
                this.$store.dispatch('form/submit', true)
                this.$store.dispatch('form/error', {
                    name: false
                });
                
                if (this.name === null || this.name.trim() === '') {
                    this.$store.dispatch('form/error', {name: true});
                }
            
                if (this.$store.getters['form/invalid-fields'].length > 0) {
                    this.$store.dispatch('form/submit', false)
                    return
                }
                
                var contract_id = null; 
                if (this.selectedContract !== null) {
                        contract_id = this.selectedContract.contract_id;
                }

                this.activity.name = this.name;
                this.activity.contract_id = contract_id;
                ActivityService.addActivityType(this.activity)
                    .then(response => {
                        var isError =  false;
                        if(response.data.status === 'ERROR'){
                            isError = true;
                        }else{
                            this.$router.push({name: 'home'});
                        }
                        this.$store.dispatch('form/result', {isError: isError, message: response.data.message});
                        this.$store.dispatch('form/submit', false)
                    })
                    .catch(err => {
                      console.log(err);
                      this.$store.dispatch('form/submit', false)
                    });
                    
            },
            getAllContracts(){
                this.$store.dispatch('form/submit', true);
                ContractService.getByEmployee(this.username).then((response) => {
                    this.contracts = response.data;
                    this.$store.dispatch('form/submit', false);
                }).catch((error) => {
                    console.log(error);
                    this.$store.dispatch('form/submit', false);
                });
            },
        };
        this.computed = {
            ...mapGetters({
                username: 'auth/user',
                error: 'form/error-states'
            }),
        };
        this.watch = {

        };
        this.props = [];
    }).apply(AddActivityType);

    export default AddActivityType
</script>
