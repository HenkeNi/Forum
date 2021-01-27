<template>
  <div class="thread-page">
    <NewPostModal :threadId="this.thread.id" @myEvent="fetchPosts" v-model="newpostModalOpen" />
    <h1 class="title">{{thread.title}}</h1>
  
    <div class="closed" v-if="isClosed">
      <h3 class="closed-text">Thread Closed!</h3>
    </div>
    <PostList class="list" :posts="this.posts" :thread="this.thread" />
    <div @click="newPost" class="post" v-if="!isClosed">
      <h2>New Post</h2>
    </div>
    <div class="block" v-if="showCloseThread">
      <h3 @click="closeThread">Close Thread</h3>
    </div>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import NewPostModal from "../components/NewPostModal.vue";

export default {
  components: {
    PostList,
    NewPostModal
  },
  props: ["thread"],
  data() {
    return {
      posts: [],
      isClosed: false,
      newpostModalOpen: false
    };
  },
  computed: {
    showCloseThread() {
      let user = this.$store.getters.currentUser;

      if (user) {
        return (
          (user.userRole === "moderator" || user.userRole === "admin") &&
          this.isClosed === false
        );
      }
      return false;
    }
  },
  methods: {
    async fetchPosts() {
      let res = await fetch(`/rest/v1/posts/${this.thread.id}`); // TODO: FIX!!!!
      res = await res.json();
      this.posts = res;
      this.newpostModalOpen = false; // temp SOLUTION...
    },
    async closeThread() {
      let res = await fetch(`/rest/v1/threads/${this.thread.id}`, {
        method: "PUT"
      });
      res = await res.json();
      console.log(res);
      this.isClosed = true;
    },
    newPost() {
      if (this.isClosed) {
        return;
      }
      this.newpostModalOpen = !this.newpostModalOpen;
      //this.fetchPosts();
    }
  },
  created() {
    this.fetchPosts();
    this.isClosed = this.thread.active === 0 ? true : false;
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>
  
<style scoped>
.thread-page {
  display: flex;
  flex-direction: column;
  background-color: gray;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  margin-bottom: 50px;
}

.title {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px 0px 30px 0px;
  text-align: center;
  text-decoration: underline;
  width: 60vw;
  /* background-color: rgb(105, 105, 105); */
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  color: white;
  border-radius: 5px;
}



.closed {
  display: inline-block;
  text-align: center;
  text-decoration: underline;
  /* width: 80vw; */
  font-size: 3.2em;
  position: absolute;
  color: red;
  /* transform-origin: 0 0; */
  transform: rotate(-10deg);
}

.post {
  width: 60vw;
  display: flex;
  justify-content: flex-end;
}

.post h2 {
  margin: 5px;
  text-align: center;
  margin-top: 0px;
  cursor: pointer;
  width: 160px;
  background-color: rgb(26, 33, 36);
  color: white;
  border-radius: 5px;
  border: 1px solid rgb(214, 214, 214);
}

.block {
  border-radius: 5px;
  text-align: center;
  text-decoration: underline;
  width: 300px;
  margin-top: 10px;
  border: 1px solid white;
  background-color: rgb(175, 25, 25);
  cursor: pointer;
  color: black;
}

.block h3 {
  margin: 5px;
}
</style>