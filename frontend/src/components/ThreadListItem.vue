<template>
  <div v-bind:class="{ evenRow: !isEvenRow }" class="thread-container" @click="goToThreadPage">
    <div class="container">
      <div class="left">
      <div class="user-icon">
        <img src="https://image.flaticon.com/icons/png/512/21/21294.png" />
      </div>
      <div class="user-info">
        <div class="title-close">
          <div class="thread-title">
            <h2 class="title">{{thread.title}}</h2>
          </div>
        </div>
        <div class="thread-info">
          <h4>
            <span @click="goToProfile" class="author">{{author.username}} - {{ publishedDate }}</span>
          </h4>
          <!-- <h4>published at: <span class="published">{{publishedDate}}</span></h4> -->
        </div>
      </div>
      </div>
      <div class="closed">
        <h2 v-if="isClosed">closed</h2>
        <div class="amount">
          <p>Posts</p>
          <p>{{postsAmount}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["thread", "index"],
  data() {
    return {
      author: Object,
      postsAmount: 0
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
    },
    isClosed() {
      return this.thread.active == 0;
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
    },
    async fetchPostAmount() {
      let res = await fetch(`/rest/v1/posts/count/${this.thread.id}`);
      res = await res.json();
      this.postsAmount = res[0]["COUNT(threadId)"];
    }
  },
  created() {
    this.fetchAuthor();
    this.fetchPostAmount()
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
  justify-content: space-between;
  /* box-shadow: 0.5px 0.5px 8px #000000; */
}

.thread-container:hover {
  color: rgb(207, 207, 132);
  border: 1px solid rgb(207, 207, 132);
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.thread-container h1 {
  margin-bottom: 0px;
  margin-top: 10px;
}

.left {
  display:flex;
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

.user-info {
  width: 70%;

}

.title-close {
  widows: 100%;
  display: flex;
  justify-content: space-between;
}

.closed {
  /* padding-top: 20px; */
  padding-right: 30px;

  display: flex;
  align-items: center;
}

.amount {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
}

.closed p {
  margin: 0px;
  font-size: 1.2em;
}

.closed h2 {
  color: red;
  border: 1px solid red;
  margin: 0px;
  border-radius: 5px;
  padding: 2px;
}

.thread-title {
  padding-left: 40px;
}
.thread-title h1 {
  /* margin-right: 70px; */
}

.thread-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 40px;
}

.thread-info h4 {
  margin-top: 0px;
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

.evenRow:hover {
  color: rgb(207, 207, 132);
  border: 1px solid rgb(207, 207, 132);
}

.title {
  padding-top: 10px;
  width: 300px;
  margin: 0px;
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
}


</style>