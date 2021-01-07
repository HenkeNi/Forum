<template>
  <div class="subforum-list">
    <h1>Forums</h1><br/>
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
      let res = await fetch('http://localhost:3000/rest/subforums');
      //let res = await fetch(`/api/subforums`);
      //let res = await fetch('http://localhost:3000/api/hello');
      res = await res.json();
      console.log(res);
      this.subforums = res;
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
  width: 100%;
  padding-left: 60px;
  text-align: center;
  text-decoration: underline;
}


</style>