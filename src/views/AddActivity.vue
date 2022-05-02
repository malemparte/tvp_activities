<template id="login">
        <div class="md-min-width card m-5">
                <h5 class="text-white m-3">Definicion Actividad</h5>

                <div class="field mt-3">
                    <InputText id="name1" type="name" :class="{'p-invalid' : error.name}" v-model="name" placeholder="Nombre tipo"/>
                    <h6 v-if="error.name" id="name1-help" class="p-error">Nombre es obligatorio.</h6>
                </div>

                <div class="field mt-4">
                    <FileUpload mode="basic" name="demo[]" url="./upload" chooseLabel="Ingrese Pauta" :customUpload="true" @uploader="myUploader"/>
                    <h6 v-if="error.url_file_oblig" class="p-error">Pauta es obligatorio.</h6>
                </div>

                <div class="field mt-3">
                    <h5 class="text-white">Habilitada/Deshabilitada</h5>
                    <InputSwitch v-model="activity.is_enable" />
                </div>

                <div class="field">
                    <Dropdown v-model="selectedActivityType" :options="activitiesType" optionLabel="Nombre" :filter="false" placeholder="Seleccione tipo actividad" :showClear="true">
                      <template #value="slotProps">
                          <div class="p-dropdown-supervisors-value" v-if="slotProps.value">
                              <span>
                                {{slotProps.value.name}}
                              </span>
                          </div>
                          <span v-else>
                              {{slotProps.placeholder}}
                          </span>
                      </template>
                      <template #option="slotProps">
                      <div class="p-dropdown-supervisors-option">
                        <span>
                              {{slotProps.option.name}}</span>
                      </div>
                    </template>
                    </Dropdown>
                    <h6 v-if="error.act_oblig" class="p-error">Seleccion tipo obligatoria.</h6>
                </div>


                <div class="field">
                    <Dropdown v-model="selectedContract" :options="contracts" optionLabel="Nombre" :filter="false" placeholder="Seleccione contrato (opcional)" :showClear="true">
                      <template #value="slotProps">
                          <div class="p-dropdown-supervisors-value" v-if="slotProps.value">
                              <span>
                                {{slotProps.value.name}}
                              </span>
                          </div>
                          <span v-else>
                              {{slotProps.placeholder}}
                          </span>
                      </template>
                      <template #option="slotProps">
                      <div class="p-dropdown-supervisors-option">
                        <span>
                              {{slotProps.option.name}}</span>
                      </div>
                    </template>
                    </Dropdown>
                </div>
                <span v-if="activity.url_file !== null">
                    <buttonp class="w-8rem mt-5 p-button-warning" icon="pi pi-save" label="Guardar" @click.prevent="add()"/>
                </span>
                <span v-else>
                    <buttonp class="w-8rem mt-5 p-button-warning" icon="pi pi-save" label="Guardar" @click.prevent="add()"/>
                    <h6 class="p-error">ATENCION!! Suba Pauta para poder Guardar.</h6>
                </span>
                
        </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import ActivityService from '@/service/ActivityService';
    import ContractService from '@/service/ContractService';
    import UploadFileService from '@/service/UploadFileService';


    let AddActivity = {};
    (function () {
        this.name = 'add-activity';
        // let _self = null;

        this.created = function () {
            this.getAllContracts();
            this.getAllActivitiesType();
        };

        this.mounted  = function () {

        };

        this.data = function () {
            return {
                name: '',
                activity: {name:null, contract_id: null, is_enable: true, url_file: null, activity_type_id: null},
                contracts: [],
                activitiesType: [],
                selectedActivityType: null,
                selectedContract: null,
                upload_data_file: null,

            }
        };
        this.methods = {
            myUploader(event){
                console.log("ejecucion subida temp...");
                 this.$store.dispatch('form/submit', true);
                // upload data to the server
                 let result = {isError: false, message: null}
                 var fileList = event.files;
                const formData = new FormData();
                formData.append ('docs', fileList[0]);
                formData.append ('destination', "temp/");

                UploadFileService.uploadfile(formData).then((response) => {
                    console.log(response)
                    this.upload_data_file = response.data;
                    this.activity.url_file = response.data.full_path;
                    result.message =  response.data.message;
                    if(response.data.status === 'ERROR')
                        result.isError = true;
                    this.$store.dispatch('form/result', result);
                    this.$store.dispatch('form/submit', false);
                }).catch((error) => {
                    result.isError = true;
                    if (error.data) {
                        result.message = error.data.message;
                    } else {
                        result.message =  'Ha ocurrido un error interno(uploadfile temp)'
                    }
                    this.$store.dispatch('form/result', result);
                    this.$store.dispatch('form/submit', false);
                })
            },
            add() {
                this.$store.dispatch('form/reset');
                this.$store.dispatch('form/submit', true)
                this.$store.dispatch('form/error', {
                    name: false,
                    act_oblig: false,
                    act_url_file: false,
                });
                
                if (this.name === null || this.name.trim() === '') {
                    this.$store.dispatch('form/error', {name: true});
                }
                if (this.selectedActivityType === null) {
                    this.$store.dispatch('form/error', {act_oblig: true});
                }
                if (this.activity.url_file === null) {
                    this.$store.dispatch('form/error', {url_file_oblig: true});
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
                this.activity.activity_type_id = this.selectedActivityType.activity_type_id;
                ActivityService.addActivity(this.activity, this.upload_data_file)
                    .then(response => {
                        var isError =  false;
                        if(response.data.status === 'ERROR'){
                            isError = true;
                        }else{
                            this.$router.push({name: 'home'});
                        }
                        this.$store.dispatch('form/result', {isError: isError, message: response.data.message});
                        this.$store.dispatch('form/submit', false);
                    })
                    .catch(err => {
                      console.log(err);
                      this.$store.dispatch('form/submit', false);
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
            getAllActivitiesType(){
                this.$store.dispatch('form/submit', true);
                ActivityService.getActivityTypeByEmployee(this.username).then((response) => {
                    this.activitiesType = response.data;
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
    }).apply(AddActivity);

    export default AddActivity
</script>
