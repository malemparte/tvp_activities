<template>
    <toolbar-comp v-if="showTopBar"></toolbar-comp>
    <div class="pt-7">
      <router-view></router-view>
    </div>
</template>

<script>
    import ToolbarComp from '@/components/ToolbarComp'

export default {
  name: 'app',
  components: {
    ToolbarComp
  },
  computed: {
             showTopBar: function () {
                const dontShowIn = ['login'];
                return dontShowIn.indexOf(this.$route.name) === -1;
            }
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
