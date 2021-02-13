<template>
  <div class="subforum-list">
     <div class="title">
        <h1>Forums</h1>
      </div>

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
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}


.title {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.title h1 {
  width: 60vw;
  padding: 2px;
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  background-color: rgb(85, 83, 83);
  border-radius: 5px;
  color: white;
  text-align: center;
  text-decoration: underline;
}

</style>