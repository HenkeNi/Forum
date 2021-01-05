<template>

  <div class="subforum-container" @click="goToSubforum">
    <div class="icon-img">
      <i class="bi bi-chat-dots"></i>
      <!-- <img src="https://image.flaticon.com/icons/png/512/14/14558.png"/> -->
    </div>
    <hr/>
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
  height: 100px;
  border: 1px solid yellow;
  background-color: rgb(77, 75, 75);
  cursor: pointer;
  display: flex;
  flex-direction: row;

}

.title-container {
  display: flex;
  flex-flow: column wrap;
  width: 90%;
  padding: 15px 0px 0px 40px;
}

.title-container p {
  padding-left: 15px;
}

.icon-img {
  background-color: yellow;
  height: 100%;
  width: 12vw;
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
}

</style>