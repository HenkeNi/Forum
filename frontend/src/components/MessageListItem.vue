<template>
  <div v-bind:class="{ own: isOwnMessage }" class="large-container">
    <div class="container">
      <h2>{{ message.text }}</h2>
      <p>{{ this.author.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      author: Object,
    }
  },
  computed: {
    isOwnMessage() {
      console.log(this.message);
      console.log("OWN: ", this.$store.getters.currentUser.id === this.message.senderId);
      return this.$store.getters.currentUser.id === this.message.senderId;
    }
  },
  methods: {
    async fetchAuthor() { // TODO: PUT IN viex?
      let res = await fetch(`/rest/v1/users/${this.message.senderId}`);
      this.author = await res.json();
    }
  },
  created() {
    this.fetchAuthor();
    console.log(this.message);
  },
  

}
</script>

<style scoped>
.large-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.container {
  background-color: rgb(142, 160, 170);
  width: 40vw;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  border: 2px solid black;
  
}

.own {
  justify-content: flex-end;
}

.own .container {
  background-color: rgb(150, 150, 211);
  text-align: end;
}

</style>