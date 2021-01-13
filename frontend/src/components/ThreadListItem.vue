<template>
  <div class="thread-container" @click="goToThreadPage">
    <div class="thread-title">
      <h1>{{thread.title}}</h1>
    </div>
    <div class="thread-info">
      <h4>by: <span @click="goToProfile" class="author">{{author.username}}</span></h4>
      <h4>published at: <span class="published">{{publishedDate}}</span></h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ['thread'],
  data() {
    return {
      author: Object,
    }
  },
  computed: {
    publishedDate() {
      return new Date(this.thread.published_time).toLocaleString();
    }
  },
  methods: {
    goToThreadPage() {
      this.$router.push({ name: 'ThreadPage', params: {thread: this.thread} });
    },
    goToProfile() {
      this.$router.push({ name: 'ProfilePage', params: {user: this.author} });
    },
    async fetchAuthor() {
      let res = await fetch(`http://localhost:3000/rest/users/${this.thread.userId}`); 
      res = await res.json();
      console.log(res);
      this.author =  res;
    }
  },
  created() {
    this.fetchAuthor();
  },
}
</script>



<style scoped>
.thread-container {
  margin-bottom: 30px;
  width: 80vw;
  border: 1px solid yellow;
  background-color: rgb(77, 75, 75);
  margin-bottom: 20px;
  cursor: pointer;
}

.thread-title {
  padding-left: 40px;
}

.thread-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 40px;
}

.thread-info h4 {
  padding-left: 40px;
}

.author {
  color: rgb(231, 231, 31);
}

.published {
    color: rgb(231, 231, 31);
}



</style>