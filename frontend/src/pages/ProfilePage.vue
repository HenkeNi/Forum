<template>
  <div class="profile-page">
    <h2 class="title">{{ user.username }}</h2>
    <div class="info">
      <h3>email: {{user.email}}</h3>
      <h3>{{user.userRole}}</h3>
    </div>
    <div v-if="isAdmin">
      <h3 class="delete" @click="deleteUser">DELETE</h3>
    </div>
    <div v-if="isAdmin">
      <h3 v-if="!profileUserIsModerator" @click="makeModerator">Make Moderator</h3>
      <h3 v-if="profileUserIsModerator" @click="removeModerator">Remove Moderator</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  computed: {
    isAdmin() {
      return this.$store.getters.currentUser !== null && this.$store.getters.currentUser.userRole === "admin";
    },
    profileUserIsModerator() {
      return this.$store.getters.currentUser !== null && this.user.userRole === "moderator";
    }
  },
  methods: {
    async deleteUser() {

      // Temporary solution
      this.deleteAllUserPosts();
      this.deleteAllUserThreads();

      if (this.$store.getters.currentUser.userRole !== "admin") { return }
      console.log("DELETING USER");

      let res = await fetch(`/rest/v1/users/${this.user.id}`, {
        method: 'DELETE'
      });
      res = await res.json();
      console.log(res);
      this.goToHomePage();
    },

    async deleteAllUserPosts() {
      await fetch(`/rest/v1/threads/${this.used.id}`, {
        method: 'DELETE'
      });
    },
    async deleteAllUserThreads() {
       await fetch(`/rest/v1/posts/${this.used.id}`, {
        method: 'DELETE'
      });
    },

    logoutUser() {
      // NEEDED or only ADMIN CAN DELETE USER?
    },
    goToHomePage() {
        this.$router.push("/");
    },
    async makeModerator() {
      
      let res = await fetch(`/rest/v1/user/${this.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({ "userRole": "moderator" })
      });
      res = await res.json();
      console.log(res);
    },
    async removeModerator() {
      let res = await fetch(`/rest/v1/user/${this.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({ "userRole": "member" })
      });
      res = await res.json();
      console.log(res);
    }
  },

  // TODO: if current user == admin -> radera användare || gör användare till moderator...
}
</script>

<style scoped>
.profile-page {
  background-color: grey;
  height: 80vh;
}

.title {
  padding-top: 40px;
  margin: 0px;
  text-align: center;
  text-decoration: underline;
}

.info {
  text-align: center;
  display: flex;
  flex-direction: column; 
  justify-content: center;  
}

.delete {
  cursor: pointer;
}

</style>