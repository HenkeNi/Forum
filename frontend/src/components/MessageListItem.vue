<template>
  <div v-bind:class="{ own: isOwnMessage }" class="large-container">
    <div>
      <div class="container">
        <h2>{{ message.text }}</h2>
        <p>writen by: {{ this.author.username }}</p>
      </div>
      <div class="bottom">
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  data() {
    return {
      author: Object
    };
  },
  computed: {
    isOwnMessage() {
      return this.$store.getters.currentUser.id === this.message.senderId;
    }
  },
  methods: {
    async fetchAuthor() {
      // TODO: PUT IN viex?
      let res = await fetch(`/rest/v1/users/${this.message.senderId}`);
      this.author = await res.json();
    }
  },
  created() {
    this.fetchAuthor();
  }
};
</script>

<style scoped>
.large-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
    margin-bottom: 20px;
  
}



.container {
  /* background-color: rgb(142, 160, 170); */
  background-color: rgb(77, 99, 109);
  width: 40vw;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  /* margin-bottom: 10px; */
  border: 2px solid black;
}

.own {
  justify-content: flex-end;
}

.own .container {
  /* background-color: rgb(150, 150, 211); */
  background-color: rgb(77, 77, 109);
  text-align: end;
}

.arrow {
  width: 0;
  height: 0;
  margin: 0px;
  margin-top: -3px;
  position: relative;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  border-top: 20px solid rgb(77, 99, 109);
  transform: rotate(135deg);
}

.own .arrow {
  transform: rotate(225deg);
   border-top: 20px solid rgb(77, 77, 109);
}

.bottom {
  margin-left: 20px;
  margin-right: 20px;
}

.own .bottom {
  display: flex;
  justify-content: flex-end;
}

</style>