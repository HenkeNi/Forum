<template>
  <div>
    <div class="title-container">
      <h1 class="title">{{ user.username }}'s conversations</h1>
    </div>
    <div class="find-container">
      <span class="material-icons">search</span>
      <h2 class="find-btn" @click="showUserSearch">find user</h2>
    </div>
    <div v-if="findUser">
      <SearchUser />
    </div>
    <ConversationsList :convIDs="convIDs" />
  </div>
</template>

<script>
import ConversationsList from "../components/ConversationsList";
import SearchUser from "../components/SearchUser.vue";

export default {
  props: ["user"],
  components: {
    ConversationsList,
    SearchUser
  },
  data() {
    return {
      convIDs: [],
      findUser: false
    };
  },
  methods: {
    async fetchConversations() {
      let res = await fetch(`/rest/v1/conversations/${this.user.id}`);
      res = await res.json();
      console.log(res);
      this.convIDs = res;
    },
    showUserSearch() {
      this.findUser = !this.findUser;
    }
  },
  created() {
    this.fetchConversations();
  }
};
</script>

<style scoped>
/* .title {
  padding-top: 30px;
  color: white;
  text-align: center;
  text-decoration: underline;
} */


.title-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  /* box-shadow: 1px 2px 8px #000000; */
}



.title {
  width: 60vw;
  padding: 2px;
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  /* margin-bottom: 30px; */
  /* width: 80vw; */
  background-color: rgb(85, 83, 83);
  border-radius: 5px;
  color: white;
  text-align: center;
}



.find-container {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.find-container:hover {
  color: rgb(207, 207, 132);
}

.material-icons {
  font-size: 2em;
}
.find-btn {
  margin: 0px;
}
</style>