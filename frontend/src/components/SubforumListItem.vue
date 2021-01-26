<template>
  <div class="subforum-container" @click="goToSubforum">
    <div class="icon-img">
      <span class="material-icons" style="font-size: 5em;">chat</span>
    </div>
    <div class="title-container">
      <h3 class="subforum-name">{{ subforum.title }}</h3>
      <p>{{ subforum.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['subforum'],
  methods: {
    goToSubforum() {
      console.log("GO TO SUBFORUM");
      //this.$router.push("/forum");
      this.$router.push({ name: 'SubforumPage', params: {subforum: this.subforum} });
    }
  }
}
</script>

<style scoped>
.subforum-container {
  margin-bottom: 30px;
  width: 80vw;
  border: 1px solid yellow;
  background-color: rgb(77, 75, 75);
  border-radius: 5px;

  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  /* flex-direction: row;
  flex-wrap: wrap; */
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
  background-color: yellow;
  height: 100%;
  width: 12vw;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
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
  font-size: 2em
}




</style>