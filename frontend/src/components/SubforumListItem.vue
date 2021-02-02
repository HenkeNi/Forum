<template>
  <div class="subforum-container" @click="goToSubforum">
    <div class="icon-img">
      <span class="material-icons" style="font-size: 5em;">chat</span>
    </div>
    <div class="info">

    <div class="title-container">
      <h3 class="subforum-name text">{{ subforum.title }}</h3>
      <p class="text">{{ subforum.description }}</p>
    </div>
    <div class="threads">
      <p class="threads-title">Threads</p>
      <p class="amount">{{ this.threadsAmount }}</p>
    </div>
        </div>
  </div>
</template>

<script>
export default {
  props: ['subforum'],
  data() {
    return {
      threadsAmount: 0,
    }
  },
  methods: {
    goToSubforum() {
      this.$router.push({ name: 'SubforumPage', params: {subforum: this.subforum} });
    },
    async fetchThreadCount() {
      let res = await fetch(`/rest/v1/threads/count/${this.subforum.id}`);
      res = await res.json();
      this.threadsAmount = res[0]["COUNT(subforumId)"];
    }
  },
  created() {
    this.fetchThreadCount();  
  }
}
</script>

<style scoped>
.subforum-container {
  margin-bottom: 30px;
  width: 55vw;
  border: 1px solid rgb(214, 214, 214);


  background-color: rgb(85, 83, 83);
  /* background-image: linear-gradient(red, yellow); */
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  box-shadow: 1px 2px 8px #000000;

  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  color: white;
  /* flex-direction: row;
  flex-wrap: wrap; */
}

.info {
  display: flex;
  justify-content: space-between;
  width: 42vw;
}

.title-container {
  display: flex;
  flex-flow: column;
  padding: 15px 0px 0px 40px;
}

.title-container p {
  margin: 0px 0px 20px;
  padding-left: 15px;
}

.icon-img {
  background-color: rgb(214, 214, 214);
  height: 100%;
  width: 12vw;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.threads {
  /* color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
}



.threads-title {
  margin: 0px;
  font-size: 1em;

}

.amount {
  margin: 0px;
  font-size: 2.5em;
}

hr {
  /* color: rgb(207, 207, 161); */
  /* margin-top: 30px; */
  padding-top: 30px;
  border: 0;
  border-top: 1px solid rgb(207, 207, 161);
  /* width: 100vw; */
}

.subforum-name {
  margin: 0px;
  font-size: 2em;
}


.material-icons {
  /* background-color: white; */
}

.text {
  /* color: rgb(214, 214, 214); */
  text-shadow: 1px 2px #000000;
  /* text-shadow: -0.5px 0.5px #000000;   */
}

span {
  color: rgb(51, 50, 50);
}

.subforum-container:hover {
  color: rgb(207, 207, 132);
  border: 1px solid rgb(207, 207, 132);
}

.subforum-container:hover .icon-img {
  background-color: rgb(207, 207, 132); 
}

</style>