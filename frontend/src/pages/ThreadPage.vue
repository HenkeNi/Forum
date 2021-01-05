<template>
  <div>
    {{thread.id}}
    {{thread.title}}
  </div>
</template>

<script>
export default {
  //name: 'ThreadPage',
  props: ['thread'],
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    fetchPosts() {
      //let res = await fetch('');
      console.log("FETCHING POSTS");
    }
  },
  created() {
    this.fetchPosts();
  }

}
</script>


  
<style scoped>

</style>