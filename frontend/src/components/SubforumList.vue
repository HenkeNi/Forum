<template>
  <div class="subforum-list">
     <div class="info">
        <h1>Forums</h1>
      </div>
    <!-- <div class="header">
      <h3>Characters</h3> 
      <h3>Superhero Forums</h3>
      <h3 class="forum">name</h3>
      <h3>Threads</h3>
    </div> -->
    <!-- <h1 class="forum">Forums</h1> -->
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
  /* height: 75vh; */
  /* width: 60vw; */
  /* height: 100vh; */
  /* margin-top: 35px; */
  /* padding-top: 10px; */
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  /* align-content: flex-start; */
    /* background-color: rgb(85, 83, 83); */

}

.header {
  width: 80vw;
  background-color: rgb(85, 83, 83);
  display: flex;
  justify-content: space-evenly;
  border-radius: 5px;
}
.header h3 {
  margin: 3px;
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


.info {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  /* box-shadow: 1px 2px 8px #000000; */
}

.info h1 {
  width: 60vw;
  padding: 2px;
 background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  /* margin-bottom: 30px; */
  /* width: 80vw; */
  background-color: rgb(85, 83, 83);
  border-radius: 5px;
  color: white;
  text-align: center;
}

</style>