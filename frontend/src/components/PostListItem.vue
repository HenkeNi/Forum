<template>
  <div v-bind:class="{ warning: isWarning }" class="post-container">
    <div @click="goToProfile" class="profile">
      <h3 class="author">{{author.username}}</h3>
      <img src="https://image.flaticon.com/icons/png/512/21/21294.png" />
      <h4>{{ author.userRole }}</h4>
    </div>
    <div class="message">
      <h2>{{post.message}}</h2>
    </div>
    <div class="info">
      <div class="remove" v-if="isAuthorized" @click="remove"><h3>remove</h3></div>
      <h3>sent: {{publishedDate}}</h3>
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
      let res = await fetch(`/rest/v1/posts/${this.post.id}`, {
        method: 'delete'
      });
      res = await res.json();
      console.log(res);
      // TODO: emit RELOAD...
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
  padding: 20px;
  width: 80vw;
  border: 1px solid white;
  background-color: rgb(167, 164, 164);
  display: flex;
  justify-content: space-between;
}

.profile {
  margin: 0px;
  background-color: blue;
  cursor: pointer;
  text-align: center;
}

.profile h4 {
  margin-top: 0px;
}


img {
  width: 80px;
  hegiht: 80px;
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
  margin-bottom: 0px;
}

.info {
  display: flex;
  flex-direction: column-reverse;
}

</style>