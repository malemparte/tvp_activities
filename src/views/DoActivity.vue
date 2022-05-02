<template id="doActivity">
    <span>
        <div class="md-min-width card m-5">
                <h5>Realizar Actividad</h5>

                <h5 class="text-white">Inicio Actividad</h5>
                <Calendar id="startActi5" v-model="start" :showTime="true" />

                <h5 class="text-white">Termino Actividad</h5>
                <Calendar id="finishAct5" v-model="finish" :showTime="true" />

                <div class="field mt-4">
                    <FileUpload mode="basic" name="demo[]" url="./upload" chooseLabel="Ingrese Comprobante" :customUpload="true" @uploader="myUploader"/>
                </div>

                <div class="field">
                    <Dropdown id="dropActivity" v-model="selectedActivity" :options="activities" optionLabel="Nombre" :filter="false" placeholder="Seleccione Actividad" :showClear="true">
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
                    <h6 v-if="error.act_oblig" class="p-error">Seleccion actividad tipo obligatoria.</h6>
                </div>

                <div class="field" v-if="allEmployeesNotDrivers.length > 0">
                    <autoComplete v-model="selectedAsignedEmployee" field="first_name1" :suggestions="filteredNotDrivers" @complete="searchNotDrivers($event)" placeholder="Seleccione encargado de actividad"></autoComplete>
                    <h6 v-if="error.act_asigned_oblig" class="p-error">Seleccion encargado de actividad.</h6>
                </div>

                <buttonp icon="pi pi-plus" @click.prevent="openButtonBar()" label="Ingreso Participante/vehiculo"/>   
                 
        </div>
        <div class="ml-2" v-if="participants.length > 0">
            <span v-if="selectedParticipats.length > 0">
                <!--buttonp icon="pi pi-times" @click.prevent="deleteParticipat()" label="Borrar Participantes Seleccionados"/-->
            </span>
            <DataTable :value="getParticipats" responsiveLayout="scroll" selectionMode="multiple" v-model:selection="selectedParticipats">
                <!--Column selectionMode="multiple" headerStyle="width: 3rem"></Column-->
                <Column field="name" header="Nombre/Patente"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <buttonp icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="removeFromParticipant(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

            <span v-if="activity_implementation.url_file !== null">
                    <buttonp class="w-8rem mt-5 p-button-warning" icon="pi pi-save" label="Guardar" @click.prevent="newActivityImplementation()"/>
                </span>
                <span v-else>
                    <h6 class="p-error">ATENCION!! Suba Comprobante para poder Guardar.</h6>
                </span>

        </div>
           <div class="ml-2" v-else>
            <h6 class="p-error">ATENCION!! Debe seleccionar Participante o Vehiculos.</h6>
           </div>
        <sidebarp v-model:visible="visibleFull" position="full">
            Selecion de Participantes y Vehiculos
            <TabView class="mt-5">
                <TabPanel header="Colaboradores">
                    <div class="field mt-3">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText id="driver2" type="text" v-model="queryEmployee" placeholder="Buscar Colaboradores"/>
                        </span>
                    </div>
                    <DataTable id="tableEmployees" :value="getEmployee" responsiveLayout="scroll" v-model:selection="selectedEmployees" selectionMode="multiple"  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :paginator="true"  :rows="5">
                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                        <Column field="first_name1" header="Nombre" ></Column>
                        <Column field="first_name2" header=""></Column>
                        <Column field="last_name1" header=""></Column>
                        <Column field="last_name2" header=""></Column>
                    </DataTable>
                </TabPanel>
                <TabPanel header="Equipos">
                    <div class="field mt-3">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText id="vehicle2" type="text" v-model="queryVehicle" placeholder="Buscar Vehiculo"/>
                        </span>
                    </div>
                    <DataTable id="tableVehicles" :value="getVehicles" responsiveLayout="scroll" v-model:selection="selectedVehicles" selectionMode="multiple" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :paginator="true"  :rows="5">
                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                        <Column field="plate" header="Patente"></Column>
                        <Column field="brand" header="Marca"></Column>
                        <Column field="vehicle_model" header="Modelo"></Column>
                    </DataTable>
                </TabPanel>
            </TabView>
        </sidebarp>
    </span>
</template>


<script>
    import {mapGetters} from 'vuex';
    import ActivityService from '@/service/ActivityService';
    import UploadFileService from '@/service/UploadFileService';

    let DoActivity = {};
    (function () {
        this.name = 'do-activity';
        // let _self = null;

        this.created = function () {
            this.getAllActivitiesType();
            this.getAllVehicles();
            this.getAllEmployee();
            this.getAllEmployeeNotDriver();
        };

        this.mounted  = function () {

        };

        this.data = function () {
            return {
                upload_data_file: null,
                name: '',
                visibleFull: false,
                participants: [],
                allEmployees: [],
                allEmployeesNotDrivers: [],
                allVehicles: [],
                queryVehicle: null,
                queryEmployee: null,
                selectedActivity: null,
                activities: [],
                start: null,
                finish: null,
                selectedEmployees: [],
                selectedVehicles: [],
                selectedParticipats: [],
                filteredVehicles: [],
                filteredEmployee: [],
                filteredNotDrivers: [],
                selectedAsignedEmployee: null,
                activity_implementation: {
                    name: null,
                    activity_id: null,
                    url_file: null,
                    vehicles: [],
                    employees: [],
                    schedule_start: null,
                    schedule_finish: null,
                    asigned: null,
                }
            }
        };
        this.methods = {
            searchNotDrivers(event){
                var filteredResultNotDrivers = [];
                if (event.query !== null && event.query.trim() !== '' && event.query.length > 0) {
                    event.query = event.query.toLowerCase();
                    for (var i = 0; i < this.allEmployeesNotDrivers.length; i++) {
                        if (this.allEmployeesNotDrivers[i].first_name1.toLowerCase().replace(/\s/g, '').trim().includes(event.query.replace(/\s/g, '').trim()) ||
                          this.allEmployeesNotDrivers[i].last_name1.toLowerCase().replace(/\s/g, '').trim().includes(event.query.replace(/\s/g, '').trim()) 
                        ) {
                            filteredResultNotDrivers.push(this.allEmployeesNotDrivers[i])
                        }
                    }
                    this.filteredNotDrivers = filteredResultNotDrivers;
                } else {
                    return [];
                }   
            },
            removeFromParticipant(participant){
                    var index = -1;
                    this.selectedParticipats = []
                    for (var i = 0; i < this.participants.length; i++) {
                        if(this.participants[i].id === participant.id){
                            index = i;
                        }
                    }

                    if(index >=0){
                       if(participant.type === 'employee'){
                        for (var hh = 0; hh < this.selectedEmployees.length; hh++) {
                            if(this.selectedEmployees[hh].employee_id === participant.id){
                                this.selectedEmployees.splice(hh, 1);
                                this.participants.splice(index, 1);
                            }
                        }
                        }
                        if(participant.type === 'vehicle'){
                            for (var xx = 0; xx < this.selectedVehicles.length; xx++) {
                                if(this.selectedVehicles[xx].vehicle_id === participant.id){
                                    this.selectedVehicles.splice(xx, 1);
                                    this.participants.splice(index, 1);
                                }
                            }
                        } 
                    }
            },
            deleteParticipat(){
                for (var i = 0; i < this.selectedParticipats.length; i++) {
                    var index2 = -1;
                    for (var y = 0; y < this.participants.length; y++) {
                            if(this.participants[y].id === this.selectedParticipats[i].id){
                                index2 = y;
                            }
                        }
                    if(this.selectedParticipats[i].type === 'employee'){
                        for (var hh = 0; hh < this.selectedEmployees.length; hh++) {
                            if(this.selectedEmployees[hh].employee_id === this.selectedParticipats[i].id){
                                this.selectedEmployees.splice(hh, 1);
                                this.selectedParticipats.splice(i, 1);
                                this.participants.splice(index2, 1);
                            }
                        }
                    }
                    if(this.selectedParticipats[i].type === 'vehicle'){
                        for (var ff = 0; ff < this.selectedVehicles.length; ff++) {
                            if(this.selectedVehicles[ff].vehicle_id === this.selectedParticipats[i].id){
                                this.selectedVehicles.splice(ff, 1);
                                this.selectedParticipats.splice(i, 1);
                                this.participants.splice(index2, 1);
                            }
                        }
                    }
                }
            },
            myUploader(event){
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
                    this.activity_implementation.url_file = response.data.full_path;
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
            getAllVehicles(){
                this.$store.dispatch('form/submit', true);
                ActivityService.getAllVehicle().then((response) => {
                    this.allVehicles = response.data;
                    this.filteredVehicles = response.data;
                    this.$store.dispatch('form/submit', false);
                }).catch((error) => {
                    console.log(error);
                    this.$store.dispatch('form/submit', false);
                });
            },
            getAllEmployee(){
                this.$store.dispatch('form/submit', true);
                ActivityService.getEmployeeByBusiness().then((response) => {
                    this.allEmployees = response.data;
                    this.filteredEmployee = response.data;
                    this.$store.dispatch('form/submit', false);
                }).catch((error) => {
                    console.log(error);
                    this.$store.dispatch('form/submit', false);
                });
            },
            getAllEmployeeNotDriver(){
                this.$store.dispatch('form/submit', true);
                ActivityService.getEmployeeNotDriver().then((response) => {
                    this.allEmployeesNotDrivers = response.data;
                    for (var i = 0; i < this.allEmployeesNotDrivers.length; i++) {
                            this.allEmployeesNotDrivers[i]['first_name1'] = this.allEmployeesNotDrivers[i]['first_name1'] +" "+this.allEmployeesNotDrivers[i]['first_name2']+' '+this.allEmployeesNotDrivers[i]['last_name1'] + ' ' +this.allEmployeesNotDrivers[i]['last_name2']+'('+this.allEmployeesNotDrivers[i]['card_id'] +'-'+ this.allEmployeesNotDrivers[i]['check_digit']+')';
                        }
                    this.$store.dispatch('form/submit', false);
                }).catch((error) => {
                    console.log(error);
                    this.$store.dispatch('form/submit', false);
                });
            },
            getAllActivitiesType(){
                this.$store.dispatch('form/submit', true);
                ActivityService.getActivityByEmployee(this.username).then((response) => {
                    this.activities = response.data;
                    this.$store.dispatch('form/submit', false);
                }).catch((error) => {
                    console.log(error);
                    this.$store.dispatch('form/submit', false);
                });
            },
            openButtonBar(){
                this.visibleFull = true;
            },
            newActivityImplementation() {
                this.$store.dispatch('form/reset');
                this.$store.dispatch('form/submit', true)
                this.$store.dispatch('form/error', {
                    url_file_oblig: false,
                    act_oblig: false,
                    act_asigned_oblig: false,
                });

                if (this.selectedActivity === null) {
                    this.$store.dispatch('form/error', {act_oblig: true});
                }

                if (this.selectedAsignedEmployee === null) {
                    this.$store.dispatch('form/error', {act_asigned_oblig: true});
                }

                if (this.$store.getters['form/invalid-fields'].length > 0) {
                    this.$store.dispatch('form/submit', false)
                    return
                }

                this.activity_implementation.name = this.name;
                this.activity_implementation.activity_id = this.selectedActivity.activity_id;
                this.activity_implementation.vehicles = this.selectedVehicles;
                this.activity_implementation.employees = this.selectedEmployees;
                this.activity_implementation.schedule_start = this.start;
                this.activity_implementation.schedule_finish = this.finish;
                this.activity_implementation.asigned = this.selectedAsignedEmployee.employee_id;

                ActivityService.newActivityImplementation(this.activity_implementation, this.upload_data_file)
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
            pushSelectedEmployees(){
                for (var k = 0; k < this.selectedEmployees.length; k++) {
                    var newParticipant2 = {id: this.selectedEmployees[k].employee_id, name: this.selectedEmployees[k].first_name1 +' '+ this.selectedEmployees[k].last_name1, type:'employee'}
                    this.participants.push(newParticipant2);
                }
            },
            pushSelectedVehicles(){
                for (var i = 0; i < this.selectedVehicles.length; i++) {
                    var newParticipant = {id: this.selectedVehicles[i].vehicle_id, name: this.selectedVehicles[i].plate, type:'vehicle'}
                    this.participants.push(newParticipant);
                }
            }
        };
        this.computed = {
            getParticipats(){
                return this.participants;
            },
            getVehicles(){
                return this.filteredVehicles;
            },
            getEmployee(){
                return this.filteredEmployee;
            },
            ...mapGetters({
                username: 'auth/user',
                error: 'form/error-states'
            }),
        };
        this.watch = {
            selectedVehicles(){
                this.participants = [];
                this.pushSelectedEmployees();
                this.pushSelectedVehicles();
            },
            selectedEmployees(){
                this.participants = [];
                this.pushSelectedEmployees();
                this.pushSelectedVehicles();
                
            },
            queryVehicle(newValue) {
                this.queryVehicle = newValue.toLowerCase();
                var filteredResultVehicles = [];
                if (this.queryVehicle !== null && this.queryVehicle.trim() !== '' && this.queryVehicle.length > 1) {
                    for (var i = 0; i < this.allVehicles.length; i++) {
                        if (this.allVehicles[i].plate.toLowerCase().replace(/\s/g, '').trim().includes(this.queryVehicle.replace(/\s/g, '').trim())
                        ) {
                            filteredResultVehicles.push(this.allVehicles[i])
                        }
                    }
                    this.filteredVehicles = filteredResultVehicles;
                } else {
                    this.filteredVehicles = this.allVehicles;
                }
            },
            queryEmployee(newValue) {
                this.queryEmployee = newValue.toLowerCase();
                var filteredResultEmployee = [];
                if (this.queryEmployee !== null && this.queryEmployee.trim() !== '' && this.queryEmployee.length > 1) {
                    for (var i = 0; i < this.allEmployees.length; i++) {
                        if (this.allEmployees[i].first_name1.toLowerCase().replace(/\s/g, '').trim().includes(this.queryEmployee.replace(/\s/g, '').trim()) ||
                          this.allEmployees[i].last_name1.toLowerCase().replace(/\s/g, '').trim().includes(this.queryEmployee.replace(/\s/g, '').trim()) 
                        ) {
                            filteredResultEmployee.push(this.allEmployees[i])
                        }
                    }
                    this.filteredEmployee = filteredResultEmployee;
                } else {
                    this.filteredEmployee = this.allEmployees;
                }
            },
        };
        this.props = [];
    }).apply(DoActivity);

    export default DoActivity
</script>
