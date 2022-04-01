<template id="home">
    <div>
        <h5>Home</h5>
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

        };
        this.computed = {

        };
        this.watch = {

        };
        this.props = [];
    }).apply(HomePage);

    export default HomePage
</script>
