<template>
  <div class="home-page">
    <subforum-list />
  </div>
</template>

<script>
import SubforumList from '../components/SubforumList.vue';

export default {
  components: {
    SubforumList
  }
}
</script>

<style scoped>

.home-page {
  margin-top: 0px;
  background-color: gray;
  display: flex; 
  justify-content: center;
  flex-direction: column;
}
</style>