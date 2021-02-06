<template>
  <div class="container">
    <div class="search">
      <input placeholder="Enter username" id="search" type="text" />
      <button @click="getSearchedUser">Search</button>
    </div>
    <div class="content">
      <div v-if="searchedUsers != null">
        <div class="list-item" @click="goToMessagePage(user)" v-for="user in searchedUsers" :key="user.id" >
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
      searchedUsers: null,
    }
  },
  methods: {
    async getSearchedUser() {
      let searchedStr = document.getElementById('search').value;
      console.log(searchedStr);
      let res = await fetch(`/rest/v1/users/search/${searchedStr}`);
      res = await res.json();
      this.searchedUsers = res;
      console.log(res);
    },
    goToMessagePage(user) {
      this.$router.push({ name: 'MessagePage', params: {user: user} });
    }
  },
}
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

.search {
  width: 15vw;
  margin: auto;
}

.list-item {
  background-color: rgb(26, 33, 36);
  border: 2px solid white;
  color: white;
  /* height: 5vh; */
}
.list-item h3 {
  margin: 3px;
}

</style>