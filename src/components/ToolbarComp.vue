<template>
    <span>
        <toolbar class="fixed top-0 ml-0 w-12">
        <template #start>
            <div class="w-2"><img style="width: 80px !important;" alt="icono corporativo" src="@/assets/logo.svg"></div>
        </template>

        <template #end>
                <buttonp icon="pi pi-bars" @click.prevent="openSideBar()"/>
        </template>
        </toolbar>
        <sidebarp v-model:visible="visibleRight" position="right">
            Content
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
                
            }
        };
        this.methods = {
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
