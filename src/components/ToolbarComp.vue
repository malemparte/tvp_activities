<template>
    <span class="z-3">
        <toolbar class="fixed top-0 ml-0 w-12">
        <template #start>
            <div class="w-2"><img style="width: 80px !important;" alt="icono corporativo" src="@/assets/logo.svg"></div>
        </template>
        <template #end>
                <buttonp icon="pi pi-home" @click.prevent="goHome() " class="fixed right-0 m-7"/>
                <buttonp icon="pi pi-bars" @click.prevent="openSideBar() " class="fixed right-0 m-4"/>
        </template>
        </toolbar>
        <sidebarp v-model:visible="visibleRight" position="right">
            <Menu :model="items" />
        </sidebarp>
    </span>
</template>

<script>
   
    let ToolbarComp = {};
    (function () {

        this.name = 'tooolbar';

        this.created = function () {
            
        };
        this.data = function () {
            return {
                visibleRight: false,
                items: [
                     {
                        label: 'Consulta',
                        items: [{label: 'Mis Resultados', icon: 'pi pi-fw pi-plus', to: '/my-result' },
                        {label: 'Cumplimiento Colaboradores', icon: 'pi pi-fw pi-plus',  to: '/compliance-activity' },
                        ]
                    },
                    {
                        label: 'Ingresos',
                        items: [{label: 'Calnedario Actividades', icon: 'pi pi-fw pi-plus', to: '/calendar-activity' },
                        {label: 'Realizacion Actividades', icon: 'pi pi-fw pi-plus',  to: '/do-activity' },
                        {label: 'Definicion Actividades', icon: 'pi pi-fw pi-plus', to: '/add-activity' },
                        {label: 'Tipo de Actividades', icon: 'pi pi-fw pi-plus',  to: '/add-activitytype' },
                        ]
                    },
                    {
                        label: 'Sistema',
                        items: [{label: 'Inicio', icon: 'pi pi-hm pi-home', to: '/home'},
                                {label: 'Salir', icon: 'pi pi-fw pi-power-off', to: '/logout'},
                                ]
                    }
                ],  
            }
        };
        this.methods = {
            goHome(){
                this.$router.push({name: 'home'});
            },
            openSideBar(){
                this.visibleRight = true;
            },
            logOut() {
                this.$router.push({name: 'logout'});
            },
            goTo: function (route) {
                this.$router.push({name: route});
            }
        };
        this.mounted = function () {};
        this.components = {}
        this.computed = {};
        this.watch = {};
        this.props = [];
    }).apply(ToolbarComp);
    export default ToolbarComp;
</script>

<style scoped>

</style>
