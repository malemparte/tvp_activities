<template>
    <div v-if="result.message" style="z-index: 99 !important; margin-top: 40px;">
        <br /><br /><br />
        <Message severity="success" :life="3000" :sticky="false">{{result.message}}</Message> 
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    let ResultMessage = {};
    (function () {
        this.name = 'resultmessage-component';
        this.created = function () {};
        this.data = function () {
            return {}
        };
        this.methods = {

        };
        this.mounted = function () {};
        this.components = {}
        this.computed = {
            ...mapGetters({
                result: 'form/result',
            })
        };
        this.watch = {
            'result.message': function (newValue) {
                if (newValue) {
                    if (this.handler) clearTimeout(this.handler);
                    let _self = this;
                    setTimeout(function () {
                        _self.result.message = null;
                    }, 3000);
                }
            }
        };
        this.props = [];
    }).apply(ResultMessage);
    export default ResultMessage;
</script>

<style scoped>
    
</style>
