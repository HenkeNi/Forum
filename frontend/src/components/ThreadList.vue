<template>
  <div class="thread-list">
    <ThreadListItem 
      v-for="thread in threads"
      :key="thread.id"
      :thread="thread"
    />
  </div>
</template>

<script>
import ThreadListItem from './ThreadListItem.vue';

export default {
  props: ['subforum'],
  components: {
    ThreadListItem,
  },
  data() {
    return {
      threads: [],
    }
  },
  methods: {
    async fetchAllThreads() {
      console.log("subforum", this.subforum);
      let res = await fetch(`http://localhost:3000/rest/threads/${this.subforum.id}`); // TODO: FIX!!!!
      res = await res.json();
      console.log(res);
      this.threads = res;
    }
  },
  created() {
    this.fetchAllThreads();
  },

}
</script>

<style scoped>
.thread-list {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}

</style>