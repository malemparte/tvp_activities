<template id="calendarActivity">
        <div >
            <div v-if="getactivitiesCalendar.length > 0">
                            <TabView class="mt-5" style="width: 1000px !important;">
                <TabPanel header="Calendario Actividades">
                        <div v-if="getactivitiesCalendar.length > 0">
                            <FullCalendar :events="getactivitiesCalendar" :options="optionsCalendar" />
                        </div>
                        <div v-else>
                            <h2>Sin Actividades</h2>
                        </div>
                        
                </TabPanel>
                <TabPanel header="Tabla Actividades">
                    <!--div class="field mt-3">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText id="searchactivity2" type="text" v-model="queryAcivity" placeholder="Buscar Actividad"/>
                        </span>
                    </div-->
                    <DataTable id="tableActivity" :value="allActivities" responsiveLayout="scroll">
                        <Column field="activity_implementation_id" header="ID"></Column>
                        <Column field="activity.name" header="Actividad"></Column>
                        <Column field="activity.activity_type.name" header="Tipo Actividad"></Column>
                        <Column field="schedule_start" header="Comienzo"></Column>
                        <Column field="schedule_finish" header="Termino"></Column>
                        <!--Column  header="Acciones"></Column-->
                    </DataTable>
                </TabPanel>
            </TabView>





                        </div>
                        <div v-else>
                            <h2>Sin Actividades</h2>
                        </div>

            
        </div>
</template>


<script>
    import {mapGetters} from 'vuex';
    import ActivityService from '@/service/ActivityService';
    import '@fullcalendar/core/vdom';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import esLocale from '@fullcalendar/core/locales/es';
    import moment from "moment";


    let CalendarActivity = {};
    (function () {
        this.name = 'calendar-activity';

        this.created = function () {
            this.getAllActivitiesUser();
        };

        this.mounted  = function () {

        };

        this.data = function () {
            return {
                name: '',
                optionsCalendar: {
                    height: '800px',
                    plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
                    initialDate : new Date(),
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    selectMirror: true, 
                    dayMaxEvents: true,
                    selectable: true,
                    editable: false,
                    locale: esLocale,
                    eventClick: (e) =>  {
                        //handle date click
                        this.editActivity(e.event._def.publicId);
                    }
                },
                activitiesCalendar: [],
                allActivities: [],
            }
        };
        this.methods = {
             utcToLocal(date){
                if(date){
                  var stillUtc = moment.utc(date).toDate();
                  var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm');
                  return local;
                }
              },
            editActivity(){
                console.log('go activity implementation');
            },
            getAllActivitiesUser() {
                this.$store.dispatch('form/submit', true)
                let result = {isError: false, message: null}
                ActivityService.allActiImplCreator()
                    .then(response => {
                         this.allActivities = response.data;
                    if(response.data.length === 0){
                        result.isError = true;
                        result.message = 'Sin resultados';
                        this.$store.dispatch('form/result', result);
                    }

                    for (var i = 0; i < this.allActivities.length; i++) {
                            var titlleeee = this.allActivities[i].activity.name + '('+this.allActivities[i].activity.activity_type.name+')';
                            this.allActivities[i].schedule_start = this.utcToLocal(this.allActivities[i].schedule_start);
                            this.allActivities[i].schedule_finish = this.utcToLocal(this.allActivities[i].schedule_finish);
                            let evetTemp = {
                                "id": this.allActivities[i].activity_implementation_id,
                                "title": titlleeee,
                                "start": this.allActivities[i].schedule_start,
                                "end": this.allActivities[i].schedule_finish,
                            }
                            this.activitiesCalendar.push(evetTemp);
                        }

                    this.$store.dispatch('form/submit', false);
                    })
                    .catch(err => {
                      console.log(err);
                       this.$store.dispatch('form/submit', false)
                    });
                    
            },
        };
        this.computed = {
            getactivitiesCalendar(){
                return this.activitiesCalendar;
            },
            ...mapGetters({
                username: 'auth/user'
            }),
        };
        this.watch = {

        };
        this.props = [];
    }).apply(CalendarActivity);

    export default CalendarActivity
</script>
