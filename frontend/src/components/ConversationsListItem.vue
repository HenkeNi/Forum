<template>
  <div @click="goToMessagePage" class="container">
    <div class="unread">
      <h1 v-if="unreadMessages != 0">{{unreadMessages}}</h1>
    </div>
    <div class="main">

    <h2 
    v-for="user in this.otherUser"
    :key="user.userId"
    class="conversation-item"
    >{{ user.username }}</h2>
    <div class="icon-img">
      <span class="material-icons" style="font-size: 8em;">chat</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['convID'],
  data() {
    return {
      otherUser: Object,
      unreadMessages: 0,
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
    async fetchNumberOfNewMessages() {
      let res = await fetch(`/rest/v1/messages/count/${this.convID.convID}`);
      res = await res.json()
      this.unreadMessages = res[0]["COUNT(unread)"];
      // console.log("UNREAD Messages: ", res[0]["COUNT(unread)"]);
    }
  },
  created() {
    this.fetchUsersInConversations();
    this.fetchNumberOfNewMessages();
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

.conversation-item {
  margin: 2px;  
}

.main {
  position: relative;
  top: 10px;

}

.unread {
  display: flex;
  justify-content: flex-end;
  position: relative; 
  top: -15px;
  right: -15px; 
  padding-right: 0px;
}


.unread h1 {
  border-radius: 50%;
  margin: 0;
  background-color: red;
  text-align: center;
  width: 20%;
}



</style>