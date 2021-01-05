<template>
  <div class="thread-container" @click="goToThreadPage">
    <h1>{{thread.title}}</h1>
    <h4>by {{thread.user}}</h4>
    <h4>published at: {{thread.published_time}}</h4>
  </div>
</template>

<script>
export default {
  props: ['thread'],
  methods: {
    goToThreadPage() {
      this.$router.push({ name: 'ThreadPage', params: {thread: this.thread} });
    }
  }
}
</script>



<style scoped>
.thread-container {
  width: 80vw;
  background-color: gray;
  margin-bottom: 20px;
  cursor: pointer;
}



</style>