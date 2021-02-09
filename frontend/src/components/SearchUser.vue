<template>
  <div class="container">
    <div class="search">
      <input
        class="input-field"
        placeholder="Enter username"
        id="search"
        type="text"
        v-on:keyup="getSearchedUser"
      />
      <!-- <button @click="getSearchedUser">Search</button> -->
    </div>
    <div class="content">
      <div v-if="searchedUsers != null">
        <div
          class="list-item"
          @click="goToMessagePage(user)"
          v-for="user in searchedUsers"
          :key="user.id"
        >
          <h3>{{user.username}}</h3>
        </div>
      </div>

      <!-- <UserList /> -->
    </div>
  </div>
</template>

<script>
//import UserList from '../components/UserList'

export default {
  components: {
    //UserList
  },
  data() {
    return {
      searchedUsers: null
    };
  },
  methods: {
    async getSearchedUser() {
      let searchedStr = document.getElementById("search").value;
      if (searchedStr === "") {
        this.searchedUsers = null;
        return;
      }

      let res = await fetch(`/rest/v1/users/search/${searchedStr}`);
      this.searchedUsers = await res.json();
    },
    goToMessagePage(user) {
      this.$router.push({ name: "MessagePage", params: { user: user } });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 30vw;
  margin: auto;
}

.input-field {
  width: 20vw;
  border-radius: 3px;
  border: none;
}

.search {
  width: 15vw;
  margin: auto;
  display: flex;
  justify-content: center;
}

.list-item {
  margin-top: 5px;
  background-color: rgb(26, 33, 36);
  border: 2px solid white;
  color: white;
  /* height: 5vh; */
}
.list-item h3 {
  margin: 3px;
}
</style>