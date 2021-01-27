<template>
  <div v-bind:class="{ evenRow: !isEvenRow }" class="thread-container" @click="goToThreadPage">
    <div class="user-icon">
      <img src="https://image.flaticon.com/icons/png/512/21/21294.png" />
    </div>
    <div class="user-info">
      <div class="thread-title">
        <h1>{{thread.title}}</h1>
      </div>
      <div class="thread-info">
        <h4>
          <span @click="goToProfile" class="author">{{author.username}} - {{ publishedDate }}</span>
        </h4>
        <!-- <h4>published at: <span class="published">{{publishedDate}}</span></h4> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["thread", "index"],
  data() {
    return {
      author: Object
    };
  },
  computed: {
    publishedDate() {
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];

      let date = new Date(this.thread.published_time);
      return (
        months[date.getMonth()] +
        "  " +
        date.getDay() +
        ", " +
        date.getFullYear()
      );
    },
    isEvenRow() {
      return this.index % 2 == 0;
    }
  },
  methods: {
    goToThreadPage() {
      this.$router.push({
        name: "ThreadPage",
        params: { thread: this.thread }
      });
    },
    goToProfile() {
      this.$router.push({ name: "ProfilePage", params: { user: this.author } });
    },
    async fetchAuthor() {
      let res = await fetch(`/rest/v1/users/${this.thread.userId}`);
      this.author = await res.json();
    }
  },
  created() {
    this.fetchAuthor();
  }
};
</script>



<style scoped>
.thread-container {
  /* margin-bottom: 30px; */
  width: 55vw;
  border: 1px solid white;
  /* background-color: rgb(26, 33, 36); */
  background-color: rgb(54, 62, 65);
  /* background-image: linear-gradient(to right, rgb(26, 33, 36), rgb(161, 164, 165)); */
  color: white;
  /* background-color: rgb(85, 83, 83); */
  margin-bottom: -1px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-content: flex-start;
  /* box-shadow: 0.5px 0.5px 8px #000000; */
}

.thread-container h1 {
  margin-bottom: 0px;
  margin-top: 10px;
}

.thread-container h4 {
  margin-bottom: 12px;
}

/*.user-info {
  background-color: red;
}*/

.user-icon img {
  height: 80px;
  width: 80px;
}

.thread-title {
  padding-left: 40px;
}

.thread-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 40px;
}

.thread-info h4 {
  margin-top: 5px;
  padding-left: 40px;
}

.author {
  padding-left: 5px;
  color: rgb(231, 231, 31);
}

.published {
  color: rgb(231, 231, 31);
}

.evenRow .author {
  color: yellow;
}

.evenRow {
  background-color: rgb(160, 156, 156);
  color: black;
  /* box-shadow: 0.5px 0.5px 8px #000000; */
}
</style>