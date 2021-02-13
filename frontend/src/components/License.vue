<template>
  <div class="license">
    <div class="image">
      <!-- <img src="https://image.flaticon.com/icons/png/512/21/21294.png" /> -->
      <img :src="user.imgUrl" />
      <!-- <div class="add-image" v-if="ownProfile">
        <h2>Hello</h2>
      </div>-->
      <div v-if="ownProfile">
        <p @click="showUrl = !showUrl" class="add">+ add image</p>
        <div class="url-container" v-if="showUrl">
          <input id="image-url" placeholder="image url.." type="text" />
          <button @click="addProfileImage">Update</button>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="head">
        <h2 class="username">{{ user.username }}</h2>
      </div>
      <h3 class="email">email: {{user.email }}</h3>
      <h3 class="role">role: {{user.userRole}}</h3>
      <h3>Registration: {{this.registrationDate}}</h3>
      <h3>Posts: {{this.user.numberOfPosts}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      showUrl: false
    };
  },
  computed: {
    ownProfile() {
      if (this.$store.getters.currentUser !== null) {
        return this.$store.getters.currentUser.id === this.user.id;
      }
      return false;
    },
    registrationDate() {
      let regDate = new Date(this.user.registrationDate);
      return (
        regDate.getDay() +
        1 +
        "/" +
        regDate.getMonth() +
        1 +
        "/" +
        regDate.getFullYear()
      );
    }
  },
  methods: {
    async addProfileImage() {
      let url = document.getElementById("image-url").value;

      if (url === "") {
        return;
      }

      let res = await fetch(
        `/rest/v1/users/${this.$store.getters.currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ imgUrl: url })
        }
      );
      this.user.imgUrl = url;
      url = ""; // clear field
      console.log(res);
    },
     async getNumberOfPostsByUser() {
      let res = await fetch(`/rest/v1/posts/user/count/${this.user.id}`);
      res = await res.json();
      this.user.numberOfPosts = res[0]["COUNT(userId)"];
    },
  },
  created() {
    this.getNumberOfPostsByUser();
  },
};
</script>

<style scoped>
.license {
  background-color: rgb(26, 33, 36);
  border: solid black 2px;
  width: 50vw;
  margin-top: 30px;
  display: flex;
  color: white;
}

.info {
  width: 100%;
}
.username {
  text-align: center;
  text-decoration: underline;
}
/* h3 {
  margin: 5px;
} */

.info .head {
  /* background-color: gray; */
  /* margin-top: 0px; */
}
.head h2 {
  margin: 0px;
  padding: 10px;
  font-size: 1.6em;
}

.title {
  /* padding-top: 40px; */
  margin: 0px;
  text-align: start;
  text-decoration: underline;
}

.info {
  /* text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px; */
}

img {
  width: 15vw;
  height: 15vw;
  /* height: 90%; */
  padding-bottom: 0px;
  padding-top: 10px;
  padding-left: 10px;
  margin-right: 10px;
  object-fit: cover;
  position: relative;
}
/* .add-image {
  position: absolute;
  width: 200px;
  height: 90%;
  padding-bottom: 0px;
  padding-top: 10px;
  padding-left: 10px;
  margin-right: 10px;
} */

.url-container {
  margin: 5px;
}
</style>