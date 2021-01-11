<template>
  <div class="thread-page">
    <PostList :thread=this.thread />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue';

export default {
  //name: 'ThreadPage',
  components: {
    PostList,
  },
  props: ['thread'],
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    fetchPosts() {
      
      //let res = await fetch(''); // TODO: fetch posts for thread id
      console.log("FETCHING POSTS");
    }
  },
  created() {
    this.fetchPosts();
  }

}
</script>
  
<style scoped>

.thread-page {
    background-color: gray;
}

</style>