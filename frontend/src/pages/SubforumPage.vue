<template>
  <div class="subforum-page">
    <div>
      <h1 class="title">{{ this.$route.params.subforum.title }}</h1>
    </div>
    <ThreadList :subforum="this.$route.params.subforum" />
  </div>
</template>


<script>
import ThreadList from '../components/ThreadList.vue';

export default {
  components: {
    ThreadList
  },
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


</style>