<template>
    <div class="loader-container z-4">
        <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" animationDuration=".5s"/>
    </div>
</template>

<script>
   
    let EmptyComponent = {};
    (function () {

        this.name = 'loader-component';

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
    .loader-container {
        position: fixed;
        z-index: 1000;
        background-color: black;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        flex-direction: column;
        div {
            text-align: center;
        }
    }

    @keyframes p-progress-spinner-color {
        100%,
        0% {
            stroke: white;
        }
        40% {
            stroke: yellow;
        }
        66% {
            stroke: yellow;
        }
        80%,
        90% {
            stroke: red;
        }
}
</style>

