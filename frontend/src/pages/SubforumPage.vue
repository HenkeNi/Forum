<template>
  <div class="subforum-page">
    <div class="top">
      <div class="info">
        <h1 class="title">{{ this.$route.params.subforum.title }}</h1>
        <h2>{{ this.$route.params.subforum.description }}</h2>     
      </div>
      <div class="create" @click="createNewThread">
        <h3>Create Thread</h3>
      </div>
    </div>
    <hr style="border:black;color:black;width:60%;height:2px;background-color:black">
 
     <!-- <div class="create" @click="createNewThread"> 
        <span class="material-icons" style="font-size: 2em;">add_circle
          <span class="tooltiptext">Create new thread</span>  
        </span>
      </div> -->
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top {
  margin-top: 30px;
  padding-bottom: 10px;
  padding-left: 5px;
  text-align: start;  
  width: 60vw;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: space-around;
  
  /* border: 1px solid yellow; */
  /* background-color: rgb(77, 75, 75); */
  /* background-color: rgb(114, 110, 110); */
}

.info {
  width: 80vw;
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  margin-bottom: 30px;
  width: 80vw;
  background-color: rgb(85, 83, 83);
  border-radius: 5px;
  color: white;
  text-align: center;
      /* box-shadow: 1px 2px 8px #000000; */
}


.top h1 {
  text-decoration: underline;
  margin-top: 10px;
  margin-bottom: 0px;
}
.top h2 {
  margin-top: 0px;
  margin-bottom: 10px;
  padding-left: 10px;
}






.material-icons .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-emphasis: center;
  padding: 5px 0;
  border-radius: 6px;
  font-size: small;
  position: absolute;
  z-index: 1;
}

.material-icons:hover .tooltiptext {
  visibility: visible;
}




.create {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: flex-end;
}

.create h3 {
  width: 25%;
  padding: 10px 15px;
  font-weight: bold;
  background-color: rgb(26, 33, 36);
  color: white;
  /* background-color: yellow; */
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgb(214, 214, 214);
      box-shadow: 1px 2px 8px #000000;

}



</style>