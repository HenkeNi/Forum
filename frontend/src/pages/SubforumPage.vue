<template>
  <div class="subforum-page">
    <div class="top">
      <h1 class="title">{{ this.$route.params.subforum.title }}</h1>
      <h2 class="create" @click="createNewThread">+ Create new thread</h2>
    </div>
    <ThreadList class="thread-list" :subforum="this.$route.params.subforum" />
  </div>
</template>


<script>
import ThreadList from '../components/ThreadList.vue';

export default {
  components: {
    ThreadList,
  },

  methods: {
    // TODO: maybe put thus code in subfou page and instead do router push to ThreadPage and do ti there....
    createNewThread() {
      // if user is not logged in return....
      this.$router.push({ name: 'threadCreation', params: {subforum: this.$route.params.subforum} });
    }
  }
}
</script>

<style scoped>
.subforum-page {
  background-color: gray;
}
.top {
  margin-top: 0px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  text-decoration: underline;

  width: 100vw;
  border: 1px solid yellow;
  background-color: rgb(114, 110, 110);
}
.title {


}

/* .thread-list {
  background-color: gray;
} */

.new-thread {
  background-color: greenyellow;
  display: inline;
}

.create {
  cursor: pointer;
}

</style>