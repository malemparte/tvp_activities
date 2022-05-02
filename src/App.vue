<template>
    <toolbar-comp v-if="showTopBar"></toolbar-comp>
    
      <result-message></result-message>
    
    
    <div class="pt-7">
      <div class="z-2">
        <router-view></router-view>
      </div>
      
      <loader v-if="isLoading"></loader>
      
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ToolbarComp from '@/components/ToolbarComp'
    import Loader from '@/components/Loader'
    import ResultMessage from '@/components/ResultMessage'

export default {
  name: 'app',
  components: {
    ToolbarComp, Loader, ResultMessage
  },
  computed: {
             showTopBar: function () {
                const dontShowIn = ['login'];
                return dontShowIn.indexOf(this.$route.name) === -1;
            },
             ...mapGetters({
                isLoading: 'form/is-submiting'
            })
        }
  }





</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body{
  background-color: black;
  margin-left: 0;
}
</style>
