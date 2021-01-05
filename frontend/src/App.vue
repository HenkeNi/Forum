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

  // TEST 
  //import rest from '../RestApi';

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    },
    methods: {
      async checkSessionForUser() {
        //let user = await fetch(`http://localhost:3000/api/login`);
        console.log("CHECKING FOR LOGGED IN USER");
        //console.log(user);
        //var api = new RestApi(); 
        //console.log(api.get)
      }
    },
    created() {
      this.checkSessionForUser();
      
    }
  }
  
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
}

</style>