<template>
    <span>
        Empty Comp
    </span>
</template>

<script>
   
    let EmptyComponent = {};
    (function () {

        this.name = 'empty-component';

        this.created = function () {
            
        };
        this.data = function () {
            return {
                 
            }
        };
        this.methods = {
            
        };
        this.mounted = function () {};
        this.components = {}
        this.computed = {};
        this.watch = {};
        this.props = [];
    }).apply(EmptyComponent);
    export default EmptyComponent;
</script>

<style scoped>

</style>
