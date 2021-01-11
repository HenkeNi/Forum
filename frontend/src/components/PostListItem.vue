<template>
  <div class="post-container">
    <h2>{{post.message}}</h2>
    <h3>sent: {{post.published_time}}</h3>
    <h3>posted by: <span class="posted-by">{{author.username}}</span></h3>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      author: Object
    }
  },
  methods: {
    async fetchAuthor() {
      let res = await fetch(`http://localhost:3000/rest/users/${this.post.userId}`); // TODO: FIX!!!!
      res = await res.json();
      console.log(res);
      this.author = res;
    }
  },
  created() {
    this.fetchAuthor();
  }
}
</script>


<style scoped>
.post-container {
  margin-bottom: 30px;
  width: 80vw;
  border: 1px solid yellow;
  background-color: rgb(77, 75, 75);
  margin-bottom: 20px;
}

.posted-by {
    color: rgb(231, 231, 31);
}


</style>