<template id="home">

    <div class="card p-fluid">

        <buttonp class="w-6 mt-5 p-button-warning" label="Mis Resultados" @click.prevent="goTo('my-result')"/>
        <br />

        <buttonp class="w-6 mt-5 p-button-warning" label="Calendario de Actividades" @click.prevent="goTo('calendar-activity')"/>
        <br />

        <buttonp class="w-6 mt-5 p-button-warning" label="Realizar Actividad" @click.prevent="goTo('do-activity')"/>
        <br />

        <buttonp class="w-6 mt-5 p-button-warning" label="Definicion Actividad" @click.prevent="goTo('add-activity')"/>
        <br />

         <buttonp class="w-6 mt-5 p-button-warning" label="Tipo Actividad" @click.prevent="goTo('add-activitytype')"/>
        <br />

        <buttonp class="w-6 mt-5 p-button-warning" label="Cumplimiento Actividades" @click.prevent="goTo('compliance-activity')"/>
        <br />

    </div>


</template>


<script>
    
    let HomePage = {};
    (function () {
        this.name = 'home-page';
        // let _self = null;

        this.created = function () {

        };

        this.mounted  = function () {
            window.scrollTo(0, 0);
        };

        this.data = function () {
            return {
               
            }
        };
        this.methods = {
             goTo: function (route) {
                    this.$router.push({name: route});
                },

        };
        this.computed = {

        };
        this.watch = {

        };
        this.props = [];
    }).apply(HomePage);

    export default HomePage
</script>
