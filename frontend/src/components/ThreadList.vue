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
      let res = await fetch('http://localhost:3000/rest/threads/1');
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}

</style>