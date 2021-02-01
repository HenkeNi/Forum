<template>
  <div>
    <h2 
    v-for="user in this.otherUser"
    :key="user.userId"
    @click="goToMessagePage"
    class="conversation-item"
    >{{ user.username }}</h2>
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
      console.log(this.otherUser);
    },
    async fetchFullAuthor() {
      let res = await fetch(`/rest/v1/users/${this.otherUser[0].userId}`); // TODO: FETCH FIRST FOR NOW!!
      return await res.json();
    },
    async goToMessagePage() {
      let user = await this.fetchFullAuthor();
      console.log("CORRECT USER?, ", user);
      this.$router.push({ name: 'MessagePage', params: {user: user} });
    },
  },
  created() {
    this.fetchUsersInConversations();
  },
}
</script>

<style scoped>
.conversation-item {
  cursor: pointer;
}

</style>