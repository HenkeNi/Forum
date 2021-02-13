<template>
  <div class="thread-list">
    <ThreadListItem 
      v-for="(thread, index) in threads"
      :key="thread.id"
      :thread="thread"
      :index="index"
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
      let res = await fetch(`/rest/v1/threads/${this.subforum.id}`); 
      this.threads = await res.json();
    },
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
  background-color: gray;
  padding-bottom: 70px;
  padding-top: 30px;
  /* min-height: 100vh;  */
}

</style>