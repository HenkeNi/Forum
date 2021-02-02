<template>
  <div class="subforum-list">
      <h1 class="forum">Forums</h1>
    <br/>
    <SubforumListItem 
      v-for="subforum in subforums"
      :key = "subforum.id"
      :subforum="subforum"
    />
  </div>
</template>

<script>
import SubforumListItem from './SubforumListItem';

export default {
  components: {
    SubforumListItem
  },
  data() {
    return {
      subforums: [],
    }
  },
  methods: {
    async fetchSubforums() {
      let res = await fetch('/rest/v1/subforums');
      this.subforums = await res.json();
    }
  },
  created() {
    this.fetchSubforums();    
  }
}
</script>

<style scoped>
.subforum-list {
  height: 100vh;
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}

h1 {
  width: 80%;
  /* padding-left: 20px; */
  text-align: center;
  text-decoration: underline;
}

.forum {
  color: rgb(37, 38, 41);
}

</style>