<template>
  <div>
    <div>
      <h1 class="title">{{ this.$route.params.subforum.title }}</h1>
    </div>
    <ThreadList />
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
.title {
  text-align: center;
}


</style>