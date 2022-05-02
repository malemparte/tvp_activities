<template id="home">

    <span>
        <div class="md-min-width card m-5">
           <h5 class="text-white">Mis Resultados</h5>

                <Accordion :activeIndex="activeIndex">

                 
                  <AccordionTab header="Consulta">
                    
                      <div class="field">
                     <Dropdown v-model="selectedMonth" :options="monthNames" optionLabel="Nombre" :filter="false" placeholder="Todos los meses" :showClear="true">
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

                <div class="field">
                <Dropdown id="asscewfddsd" v-model="selectYear" :options="years" :filter="false" placeholder="Seleccione año *" :showClear="true">
                          <template #value="slotProps">
                              <div class="p-dropdown-supervisors-value" v-if="slotProps.value">
                                  <span>
                                    {{slotProps.value}}
                                  </span>
                              </div>
                              <span v-else>
                                  {{slotProps.placeholder}}
                              </span>
                          </template>
                          <template #option="slotProps">
                          <div class="p-dropdown-supervisors-option">
                            <span>
                                  {{slotProps.option}}</span>
                          </div>
                        </template>
                </Dropdown>
                 <h6 v-if="error.year_obli" class="p-error">Seleccion año, es obligatoria.</h6>
            </div>

            <buttonp class="w-6 mt-5 p-button-warning" label="Consultar" @click.prevent="askCompliance()"/>


                  </AccordionTab>
                  <AccordionTab header="Cumplimiento">
                     <div v-if="getReportResult.length > 0">
                <h4><strong>Resumen resultado</strong></h4>
                <h5 class="text-white">Total actividades: <strong>{{result_report.total_activities}}</strong></h5>
                <h5 class="text-white">Total realizado: <strong>{{result_report.activities_total_len}}</strong></h5>
                <h5 class="text-white">Cumplimiento: <strong>{{result_report.prom_compliance}} %</strong></h5>
            </div>

            <span  v-if="getReportResult.length > 0">
              <DataTable id="tablereport" :value="getReportResult" responsiveLayout="stack" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :paginator="true"  :rows="5">
                        <Column field="contract.name" header="Contrato"></Column>
                        <Column field="name_activity_type" header="Tipo Actividad"></Column>
                        <Column field="indicator" header="Indicador Mensual"></Column>
                        <Column field="activities_len" header="Total evaluadas"></Column>
                        <Column field="complaince" header="% Cumplimiento"></Column>
            </DataTable>
            </span>
            <span v-else>
              <h5 class="text-white">Sin Resultados</h5>
              
            </span>
            

                  </AccordionTab>
                </Accordion>

                

            <!--div class="field">
            <Dropdown v-model="selectedContract" :options="contracts" optionLabel="Nombre" :filter="false" placeholder="Seleccione contrato" :showClear="true">
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
                <h6 v-if="error.contract_obli" class="p-error">Seleccion contrato, es obligatoria.</h6>
            </div-->

             


           
        </div>
    </span>


</template>


<script>
    import moment from "moment";
    import {mapGetters} from 'vuex';
    import ContractService from '@/service/ContractService';
    import ActivityService from '@/service/ActivityService';

    let MyResult = {};
    (function () {
        this.name = 'myresult-page';
        // let _self = null;

        this.created = function () {
           let thismonth = moment().format('M');
           this.selectedMonth = this.monthNames.find( month => month.id === parseInt(thismonth) );
                this.askCompliance();

        };

        this.mounted  = function () {
            window.scrollTo(0, 0);
        };

        this.data = function () {
            return {
                activeIndex: 1,
                selectedContract: null,
                contracts: [],
                selectYear: 2022,
                selectedMonth: null,
                monthNames: [{id:1, name: 'Enero'}, {id:2, name: 'Febrero'}, {id:3, name: 'Marzo'}, {id:4, name: 'Abril'}, {id:5, name: 'Mayo'}, {id:6, name: 'Junio'}, {id:7, name: 'Julio'}, {id:8, name: 'Agosto'}, {id:9, name: 'Septiembre'}, {id:10, name: 'Octubre'}, {id:11, name: 'Noviembre'}, {id:12, name: 'Deciembre'}],
                years:[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
                result_report: {data:[]},
               
            }
        };
        this.methods = {
            getAllContracts(){
             ContractService.getByEmployee(this.username).then((response) => {
                        this.contracts = response.data;
                    }).catch((error) => {
                        console.log(error);
                        this.$store.dispatch('form/submit', false);
                    });
          },
          askCompliance(){
            this.activeIndex = 0;
            this.$store.dispatch('form/reset');
                this.$store.dispatch('form/submit', true)
                this.$store.dispatch('form/error', {
                    year_obli: false,

                });
                
                if (this.selectYear === null) {
                    this.$store.dispatch('form/error', {year_obli: true});
                }

                if (this.$store.getters['form/invalid-fields'].length > 0) {
                    this.$store.dispatch('form/submit', false)
                    return
                }

            var monthhh = null;
            if(this.selectedMonth !== null)
                monthhh = this.selectedMonth.id;

            ActivityService.askMyCompliance(monthhh, this.selectYear).then((response) => {
                        this.result_report = response.data;
                        this.$store.dispatch('form/submit', false);
                        this.activeIndex = 1;
                    }).catch((error) => {
                        console.log(error);
                        this.$store.dispatch('form/submit', false);
                    });
          },

        };
        this.computed = {
          getActiveIndex(){
            return this.activeIndex;
          },
          getReportResult(){
              return this.result_report.data;
          },
          ...mapGetters({
              username: 'auth/user',
              error: 'form/error-states'
          }),

        };
        this.watch = {

        };
        this.props = [];
    }).apply(MyResult);

    export default MyResult
</script>
