<template>
  <div>
    <h1 class="title">{{ user.username }}'s conversations</h1>
    <h2 @click="showUserSearch">Start new conversation</h2>
    <div v-if="findUser">
      <h1>Hello</h1>
      <SearchUser />
    </div>
    <ConversationsList :convIDs="convIDs"/>
  </div>
</template>

<script>
import ConversationsList from '../components/ConversationsList';
import SearchUser from '../components/SearchUser.vue';

export default {
  props: ['user'],
  components: {
    ConversationsList,
    SearchUser
  },
  data() {
    return {
      convIDs: [],
      findUser: false,
    }
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
  },
}
</script>

<style scoped>
.title {
  padding-top: 30px;
  color: white;
  text-align: center;
  text-decoration: underline;
}


</style>