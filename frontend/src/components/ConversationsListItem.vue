<template>
  <div @click="goToMessagePage" class="container">
    <h2 
    v-for="user in this.otherUser"
    :key="user.userId"
    class="conversation-item"
    >{{ user.username }}</h2>
    <div class="icon-img">
      <span class="material-icons" style="font-size: 8em;">chat</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['convID'],
  data() {
    return {
      otherUser: Object,
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser || "";
    }
  },
  methods: {
    async fetchUsersInConversations() {
      let res = await fetch(`/rest/v1/conversationsXusers/${this.convID.convID}`);
      res = await res.json();
      this.otherUser = res.filter(user => user.userId !== this.currentUser.id);
    },
    async fetchFullAuthor() {
      let res = await fetch(`/rest/v1/users/${this.otherUser[0].userId}`); // TODO: FETCH FIRST FOR NOW!!
      return await res.json();
    },
    async goToMessagePage() {
      let user = await this.fetchFullAuthor();
      this.$router.push({ name: 'MessagePage', params: {user: user} });
    },
  },
  created() {
    this.fetchUsersInConversations();
  },
}
</script>

<style scoped>
.container {
  background-color: rgb(54, 62, 65);
  border: 2px solid white;
  width: 20vw;
  height: 20vw;
  color: white;
  text-align: center;
  margin-left: 20px;
  cursor: pointer;
}

.container:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}




</style>