<template>
  <div class="subforum-page">
    <div>
      <h1 class="title">{{ this.$route.params.subforum.title }}</h1>
      <h2 class="create" @click="createNewThread">+ Create new thread</h2>
    </div>
    <ThreadList :subforum="this.$route.params.subforum" />
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

.title {
  margin-top: 0px;
  padding-top: 40px;
  text-align: center;
  text-decoration: underline;
}

.new-thread {
  background-color: greenyellow;
  display: inline;
}

.create {
  cursor: pointer;
}

</style>