<template>
  <div>
    <div class="header-component">
     <h1 class="title" @click="backToHomePage">Superhero Forum</h1>
      <div class="menu-options"> 
        <h3>Contact</h3>
        <div class="sign-in" id="sign-in-options">
          <h3>Login /</h3>
          <h3>Register</h3>
        </div>
        <div id="logout-option"><h3>Logout</h3></div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: true,
    }
  },
  methods: {
    backToHomePage() {
      this.$router.push("/");
    },
    hideElements() {
       var login = document.getElementById("sign-in-options");
      var logout = document.getElementById("logout-option");

      if (this.isLoggedIn) {
        login.style.display = "block";
        logout.style.display = "none";
      } else {
        login.style.display = "none";
        logout.style.display = "block";
      }
    }
  },
  mounted() {
    this.hideElements()
  },
  watch: {
    isLoggedIn() {
      this.hideElements();
    }
  }
}
</script>

<style scoped>
.header-component {
  width: 100vw;
  height: 150px;
  /* background-image: url("https://wallpapercave.com/wp/U08hnMx.jpg"); */
  /* background-image: url("https://images.wallpapersden.com/image/download/batman-8k-logo_a2traW6UmZqaraWkpJRmZW1lrWdlaWU.jpg"); */
  background-color: rgb(27, 26, 26);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

}

.title {
  text-align: center;
  margin: 0;
  padding-top: 30px;
  font-size: 3.2em;
  color: rgb(207, 205, 205);
  cursor: pointer;
}

.menu-options {
  padding-bottom: 15px;
  width: 95%;
  height: 60px;
  display: flex;
  flex-direction: row;
  /* flex-wrap: nowrap; */
  justify-content: flex-end;
  color: rgb(231, 231, 231);
  align-items: flex-end;
}

.menu-options h3 {
  margin: 0px 15px;
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

.line {
  background-color: yellow;
  height: 5px;
  width: 100vw;
}


</style>