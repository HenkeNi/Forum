<template>
  <div>
    <h1>{{ user.username }}'s conversations</h1>
    <ConversationsList :convIDs="convIDs"/>
  </div>
</template>

<script>
import ConversationsList from '../components/ConversationsList';

export default {
  props: ['user'],
  components: {
    ConversationsList
  },
  data() {
    return {
      convIDs: [],
    }
  },
  methods: {
    async fetchConversations() {
      let res = await fetch(`/rest/v1/conversations/${this.user.id}`);
      res = await res.json();
      console.log(res);
      this.convIDs = res;
    },
  },
  created() {
    this.fetchConversations();
  },
}
</script>

<style scoped>

</style>