<template>
  <div class="user-list">
    <UserListItem 
      v-for="(user, index) in users"
      :key="user.id"
      :user="user"
      :index="index"
    />
  </div>
</template>

<script>
import UserListItem from './UserListItem.vue';

export default {
  props: ['sort'],
  components: {
    UserListItem,
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    async fetchAllUsers() {
      let res = await fetch(`/rest/v1/users/`); 
      this.users = await res.json();
    }
  },
  created() {
    this.fetchAllUsers();
  },
  watch: {
    sort() {
      if (this.sort === "az") {
      this.users.sort((a, b) => (a.username.toLowerCase() > b.username.toLowerCase()) ? 1 : -1); 
      }
      if (this.sort === "role") {
        this.users.sort((a, b) => (a.userRole < b.userRole) ? 1 : -1);
      }
      // if (this.sort === "rapported") {
      //   this.users.sort((a, b) => (a.isRapported < b.isRapported) ? 1 : -1);
      // }

    }
  }
  
  
}
</script>


<style scoped>
.user-list {
  margin-bottom: 50px;
}

</style>