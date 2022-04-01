<template id="select-contract">
    <div class="card p-fluid m-5">
        <h5>Seleccione Contrato</h5>
        <buttonp class="w-4 mt-5 p-button-warning" icon="pi pi-users" label="Ingresar" @click.prevent="logIn()"/>
    </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import ContractService from '@/service/ContractService'

    let SelectContract = {};
    (function () {
        this.name = 'selectcontract-page';

        this.created = function () {
            this.getAllContracts();
        };

        this.mounted  = function () {
         
        };

        this.data = function () {
            return {
               contracts: [],
            }
        };
        this.methods = {
             goTo: function (route, param) {
                if(param === null)
                    this.$router.push({name: route});
                else{
                    this.$store.dispatch('contract/set-contract', param.contract_id);
                    this.$store.dispatch('contract/set-contract-name', param.name);
                    this.$router.push({
                        name: route,
                        params: {
                            contract_id: param.contract_id
                        }
                    });
                }    
            },
            getAllContracts(){
                this.$store.dispatch('form/submit', true);
                console.log(this.username)
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
                contract: 'contract/contract'
            }),
        };
        this.watch = {

        };
        this.props = [];
    }).apply(SelectContract);

    export default SelectContract
</script>
