<template>
  <div>
    <input id="search" type="text" />
    <button @click="getSearchedUser">Search</button>
    <div>
      <div v-if="searchedUsers != null">
        <h2>found users</h2>
        <div v-for="user in searchedUsers" :key="user.id">
        <h2 @click="goToMessagePage(user)">{{user.username}}</h2>
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

</style>