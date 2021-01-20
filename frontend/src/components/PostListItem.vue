<template>
  <div v-bind:class="{ warning: isWarning }" class="post-container">
    <div class="message">
      <h2>{{post.message}}</h2>
    </div>
    <div class="info">
      <div class="remove" v-if="isAuthorized" @click="remove"><h3>remove</h3></div>
      <h3>sent: {{publishedDate}}</h3>
      <h3 class="author" @click="goToProfile">posted by: <span class="posted-by">{{author.username}}</span></h3>
    </div>
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
  computed: {
    isWarning() {
      return this.post.warning === 1;
    },
    isAuthorized() {
      let user = this.$store.getters.currentUser;

      if (user) {
        return user.userRole === 'admin' || user.userRole === 'moderator';
      }
      return false;
    },
    publishedDate() {
      return new Date(this.post.published_time).toLocaleString();
    }
  },
  methods: {
    async fetchAuthor() {
      let res = await fetch(`/rest/v1/users/${this.post.userId}`); // TODO: FIX!!!!
      res = await res.json();
      console.log(res);
      this.author = res;
    },
    async remove() {
      let res = await fetch(`/rest/v1/deletepost/${this.post.id}`, {
        method: 'delete'
      });
      res = await res.json();
      console.log(res);
    },
    goToProfile() {
      this.$router.push({ name: 'ProfilePage', params: {user: this.author} });
    }
  },
  created() {
    this.fetchAuthor();
  }
}
</script>


<style scoped>
.post-container {
  text-align: start;
  margin-bottom: 30px;
  padding: 20px;
  width: 80vw;
  border: 1px solid yellow;
  background-color: rgb(77, 75, 75);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.message {
}

.posted-by {
    color: rgb(231, 231, 31);
}

.warning {
  border: 1px solid black;
  background-color: rgb(255, 255, 116);
}


.remove {
  cursor: pointer;
}

.author {
  cursor: pointer;
}

.info {
  display: flex;
  flex-direction: column-reverse;
}

</style>