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
  
}
</script>


<style scoped>
.user-list {
  margin-bottom: 50px;
}

</style>