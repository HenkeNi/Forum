<template>
  <div class="post-list">
    <h1>{{thread.title}}</h1>
    <PostListItem 
      v-for="post in posts"
      :key = "post.id"
      :post="post"
    />
  </div>  
</template>

<script>
import PostListItem from './PostListItem.vue';

export default {
   components: {
    PostListItem,
  },
  props: ['thread'],
  data() {
    return {
      posts: [
        {
          message: "TEST",
          id: 1
        }
      ],
    }
  },
  methods: {
    async fetchAllPosts() {
      let res = await fetch(`http://localhost:3000/rest/posts/${this.thread.id}`); // TODO: FIX!!!!
      res = await res.json();
      console.log(res);
      this.posts = res;
    }
  },
  created() {
    this.fetchAllPosts();
  }
}
</script>


<style scoped>

.post-list {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}

</style>