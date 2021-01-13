<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>


<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    },
    created() {
      this.$store.dispatch('fetchCurrentUser');
    }
  }
</script>

<style>
* {
  box-sizing: border-box;
  font-family: 'Architects Daughter', cursive;
}

body {
  margin: 0px;
}
</style>