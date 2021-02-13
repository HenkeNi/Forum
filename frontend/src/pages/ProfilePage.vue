<template>
  <div class="profile-page">
    <License :user="user"/>
    <div>
      <h2 v-if="!ownProfile && isLoggedIn" @click="goToMessagePage" class="message">Send PM</h2>
    </div>
    <div v-if="showOptions">
      <div>
      <div class="delete">
        <h3 @click="deleteUser">DELETE USER</h3>
      </div>
    </div>
    <div class="mode">
      <h3 v-if="!isModerator" @click="makeModerator">Make Moderator</h3>
      <h3 v-if="isModerator" @click="removeModerator">Remove Moderator</h3>
    </div>
    </div>
    <div class="list" v-if=isAdminProfile>
      <h2>Admin options:</h2>
      <h2 class="list-route" @click.prevent="goToUserList">See list of user</h2>  
    </div>
  </div>
</template>

<script>
import License from '../components/License.vue';

export default {
  components: {
    License
  },
  props: ["user"],
  computed: {
    ownProfile() {
      if (this.$store.getters.currentUser !== null) {
        return this.$store.getters.currentUser.id === this.user.id;
      }
      return false;
    },
    isLoggedIn() {
      return this.$store.getters.currentUser !== null;
    },
    showOptions() {
      if (this.user.userRole === "admin") { return false; } // Admin pressed on own profile -> don't turn admin into a moderator/delete admin
      return (this.$store.getters.currentUser !== null && this.$store.getters.currentUser.userRole === "admin"); // only show if admin
    },
    isModerator() {
      return this.user.userRole !== null && this.user.userRole === "moderator"; 
    },
    isAdminProfile() {
      return this.user.userRole !== null && this.user.userRole === 'admin' && 
        this.$store.getters.currentUser !== null && this.$store.getters.currentUser.userRole === "admin"
    }
  },
  methods: {
    async deleteUser() {
      
      let res = await fetch(`/rest/v1/users/${this.user.id}`, {
        method: "DELETE"
      });
      res = await res.json();
      console.log(res);
      this.goToHomePage();
    },
    goToHomePage() {
      this.$router.push("/");
    },
    goToMessagePage() {
      this.$router.push({ name: 'MessagePage', params: {user: this.user} });
    },
    goToUserList() {
      this.$router.push("/userlistpage");
    },
    async giveUserWarning() {
      // TODO: Update user with a warning.... 
      // Resets after x time... (goes back to 0?)
    },
    async makeModerator() {
      if (this.user.userRole === "Admin") { return; } // Prevent admin from making themselves moderator...

      let res = await fetch(`/rest/v1/users/${this.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userRole: "moderator" })
      });
      res = await res.json();      
      console.log(res);
      if (res) { this.user.userRole = "moderator"; }
    },
    async removeModerator() {
      let res = await fetch(`/rest/v1/users/${this.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userRole: "member" })
      });
      res = await res.json();
      console.log(res);
      if (res) { this.user.userRole = "member"; }
    },
  },
};
</script>

<style scoped>
.profile-page {
  background-color: grey;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}



.delete {
  cursor: pointer;
  background-color: rgb(175, 33, 33);
  padding: 1px 5px;
  margin-top: 10px;
  border: solid black 2px;
}

.mode {
  cursor: pointer;
  background-color: rgb(90, 192, 43);
  padding: 1px 5px;
  margin-top: 10px;
  border: solid black 2px;
}

.list-route {
  cursor: pointer;
}

.list {
  margin-top: 50px;
  margin-bottom: 50px;
  height: 250px;
  overflow: scroll;
}

.list-item {
  padding-top: 40px;
  margin-bottom: 5px;
}

.message {
  cursor: pointer;
}

.message:hover {
  color: rgb(207, 207, 132);
}

.add {
  margin: 0px;
  /* margin-bottom: 15px; */
  text-align: center;
  padding-bottom: 10px;
  cursor: pointer;
}

.add:hover {
  color: rgb(207, 207, 132);
}

</style>