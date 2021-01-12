<template>
  <div v-bind:class="{ warning: isWarning }" class="post-container">
    <h2>{{post.message}}</h2>
    <div class="remove" v-if="isAuthorized" @click="remove"><h3>remove</h3></div>
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
    }
  },
  methods: {
    async fetchAuthor() {
      let res = await fetch(`http://localhost:3000/rest/users/${this.post.userId}`); // TODO: FIX!!!!
      res = await res.json();
      console.log(res);
      this.author = res;
    },
    async remove() {
      let res = await fetch(`http://localhost:3000/rest/deletepost/${this.post.id}`, {
        method: 'delete'
      });
      res = await res.json();
      console.log(res);
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
  width: 80vw;
  border: 1px solid yellow;
  background-color: rgb(77, 75, 75);
  margin-bottom: 20px;
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

</style>