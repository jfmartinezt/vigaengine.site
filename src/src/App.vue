<template>
  <div id="app" class="container" v-bind:style="styleObject">
    <router-view></router-view>
  </div >
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      styleObject:{
      },
    }
  },

  created(){
    console.log('app created');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* body{
  background-image: url('~@/assets/main/main-background.png');

} */
</style>
