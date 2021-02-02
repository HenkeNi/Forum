<template>
  <div>
     <div class="modals">
     <SignInModal v-model="signInModalOpen" />
     <RegisterModal v-model="registerModalOpen" />
    </div>
    <div class="header-component">
      <div class="overlay">
        <h1 class="title" @click="backToHomePage">Superhero Forum</h1>
        <div class="menu-options"> 
          <h3 class="messages" @click="goToConversations" v-if="currentUser">Messages</h3>
          <h3 @click="goToProfile">{{currentUser.username}}</h3>
          <div class="sign-in" id="sign-in-options">
            <h3 @click="showSignInModal">Login /</h3>
            <h3 @click="showRegisterModal">Register</h3>
          </div>
          <div id="logout-option"><h3 @click="signOutUser">Logout</h3></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import SignInModal from './SignInModal.vue';
import RegisterModal from './RegisterModal.vue';

export default {
  components: {
    SignInModal,
    RegisterModal,
  },
  data() {
    return {
      signInModalOpen: false,
      registerModalOpen: false,
    }
  },
  computed: {
    /*showLogin() {
      console.log("TRUE OR FALSE: ", this.$store.getters.currentUser !== null)
      return this.$store.getters.currentUser === null;
    },*/
    currentUser() {
      return this.$store.getters.currentUser || "";
    }
  },
  methods: {
    backToHomePage() {
      if (this.$route.path === "/") { return; }
      this.$router.push("/");
    },

    hideElements(hideLogin) {
      var login = document.getElementById("sign-in-options");
      var logout = document.getElementById("logout-option");

      if (!hideLogin) {
        login.style.display = "block";
        logout.style.display = "none";
      } else {
        login.style.display = "none";
        logout.style.display = "block";
      }
    },
    showSignInModal() {
      this.signInModalOpen = !this.signInModalOpen;
    },
    showRegisterModal() {
      this.registerModalOpen = !this.registerModalOpen;
    },
    goToProfile() {
      this.$router.push({ name: 'ProfilePage', params: {user: this.currentUser} });
    },
    goToConversations() {
      this.$router.push({ name: 'ConversationsPage', params: {user: this.currentUser} });
    },
    async signOutUser() {
      let res = await fetch('/rest/v1/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: 
          JSON.stringify({ "user": this.currentUser }) // stored user
      });
      res = await res.json();
      
      if (res) {
        this.hideElements(false);
        this.$store.commit('setCurrentUser', null);
      }
    },
  },
  mounted() {
    this.hideElements(false);
  },
  watch: {
    /*isLoggedIn() {
      this.hideElements();
    },*/
    currentUser() {
      this.$store.getters.currentUser === null ? this.hideElements(false) : this.hideElements(true);
    },
  }
}
</script>

<style scoped>
.header-component {
  width: 100vw;
  height: 150px;
  
  /* background-image: url("https://cdna.artstation.com/p/assets/images/images/003/932/068/large/michael-broussard-env-gothamstreets-devsketch-1b.jpg?1478645462"); */
  /* background-image: url("https://wallpapercave.com/wp/U08hnMx.jpg"); */
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  /* background-color: rgb(27, 26, 26); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* background-size: contain; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.overlay{
  width: 100vw;
  height: 150px;
  /* background: rgba(221, 218, 57, 0.1); */
    background: rgba(6, 11, 27, 0.267);

}

.title {
  text-align: center;
  margin: 0;
  padding-top: 30px;
  font-size: 3.2em;
  color: white;
  /* color: rgb(221, 221, 132); */
  /* color: white; */
  /* color: rgb(207, 205, 205); */
  cursor: pointer;
}

.title:hover {
  color: rgb(207, 207, 132);
}

h3:hover {
  color: rgb(207, 207, 132);
}

.menu-options {
  padding-bottom: 15px;
  width: 95%;
  height: 60px;
  display: flex;
  flex-direction: row;
  /* flex-wrap: nowrap; */
  justify-content: flex-end;
  color: white;
  /* color: rgb(231, 231, 231); */
  align-items: flex-end;
}

.menu-options h3 {
  margin: 0px 5px;
  cursor: pointer;
}

.sign-in {
  /* height: 100%; */
  width: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  /* align-content: flex-end; */
  /* justify-content: space-around; */
}

.sign-in h3 {
  margin: 0px;
  display: inline-block;
  padding-left: 5px;
}


.modals {
  display: flex;
  align-content: center; 
  }


.line {
  /* background-color: yellow; */
  /* background-color: rgb(17, 15, 37); */
    background: rgb(26, 33, 36);
  height: 5px;
  width: 100vw;
}

.messages {
  /* background-color: aquamarine;
  border: 2px solid black;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 5px; */
}

</style>