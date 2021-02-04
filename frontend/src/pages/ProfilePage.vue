<template>
  <div class="profile-page">
    <div class="license">
      <div class="image">
        <!-- <img src="https://image.flaticon.com/icons/png/512/21/21294.png" /> -->
        <img :src="user.imgUrl" />
        <div v-if="ownProfile">
          <p @click="showUrl = !showUrl" class="add">+ add image</p>
          <div v-if="showUrl">
            <input id="image-url" placeholder="image url.." type="text"/>
            <button @click="addProfileImage">Update</button>
          </div>
        </div>
      </div>
      <div class="info">
        <h2 class="title">{{ user.username }}</h2>
        <h3>email: {{user.email }}</h3>
        <h3>role: {{user.userRole}}</h3>
      </div>
    </div>
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
      <h2 class="list-item">List of users</h2>
      <UserList />
    </div>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';

export default {
  components: {
    UserList
  },
  props: ["user"],
  data() {
    return {
      showUrl: false,
    }
  },
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
    async addProfileImage() {
      console.log("TODO: add user-image:");
      let res = await fetch(`/rest/v1/users/${this.$store.getters.currentUser.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ imgUrl: document.getElementById('image-url').value })
      });
      this.user.imgUrl = document.getElementById('image-url').value;
      document.getElementById('image-url').value = ""; // clear field
      console.log(res);
    }
  }, 
  created() {
    console.log(this.user);
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

.title {
  padding-top: 40px;
  margin: 0px;
  text-align: start;
  text-decoration: underline;
}

.info {
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
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

img {
  width: 200px;
  height: 90%;
  padding-bottom: 0px;
  padding-top: 10px;
  padding-left: 10px;
  margin-right: 10px;
  object-fit: cover;
}

.license {
  border: solid black 2px;
  width: 50vw;
  margin-top: 30px;
  display: flex;
  background-color: rgb(26, 33, 36);
  color: white;
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
  margin-bottom: 15px;
  text-align: center;
  padding-bottom: 10px;
  cursor: pointer;
}

.add:hover {
  color: rgb(207, 207, 132);
}

</style>