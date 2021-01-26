<template>
  <div class="thread-page">
    <NewPostModal :threadId="this.thread.id" @myEvent="fetchPosts" v-model="newpostModalOpen"/>
    <h1 class="title">{{thread.title}}</h1>
    <div class="block" v-if="showCloseThread">
      <h3 @click="closeThread">Close Thread</h3>
    </div>
    <div class="closed" v-if="isClosed">
      <h3 class="closed-text">Thread Closed!</h3>
    </div>
    <PostList class="list" :posts="this.posts" :thread="this.thread" />
    <div v-if="!isClosed">
      <h2 class="new-post" @click="newPost">+ Add new post</h2>
    </div>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue';
import NewPostModal from '../components/NewPostModal.vue';


export default {
  components: {
    PostList,
    NewPostModal,
  },
  props: ['thread'],
  data() {
    return {
      posts: [],
      isClosed: false,
      newpostModalOpen: false,
    }
  },
  computed: {
    showCloseThread() {
      let user = this.$store.getters.currentUser;

      if (user) { return (user.userRole === "moderator" || user.userRole === "admin") && this.isClosed === false; }
      return false;
    },
  },
  methods: {
    async fetchPosts() {
      let res = await fetch(`/rest/v1/posts/${this.thread.id}`); // TODO: FIX!!!!
      res = await res.json();
      this.posts = res;
      this.newpostModalOpen = false;// temp SOLUTION...
    },
    async closeThread() {
      let res = await fetch(`/rest/v1/threads/${this.thread.id}`, {
        method: 'PUT',
       });
      res = await res.json();
      console.log(res);
      this.isClosed = true;
    },
    newPost() {
      if (this.isClosed) { return; }
      this.newpostModalOpen = !this.newpostModalOpen;
      //this.fetchPosts();
    },
  },
  created() {
    this.fetchPosts();
    this.isClosed = this.thread.active === 0 ? true : false;
  },
  mounted() {
    this.fetchPosts();
  },
 

}
</script>
  
<style scoped>
.thread-page {
  display: flex;
  flex-direction: column;
  background-color: gray;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
}

.title {
  margin-top: 30px;
  padding: 30px 0px 30px 0px;
  text-align: center;
  text-decoration: underline;
  width: 80vw;
  /* background-color: rgb(105, 105, 105); */
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  color: white;
}

.block {
  text-align: center;
  text-decoration: underline;
  width: 80vw;
  border: 1px solid yellow;
  background-color: rgb(240, 145, 145);
  cursor: pointer;
}

.closed {
  text-align: center;
  text-decoration: underline;
  width: 80vw;
  font-size: 3.2em;
  position: absolute;
  color: red;
  /* transform-origin: 0 0; */
  transform: rotate(-10deg);
}


.new-post {
  margin-top: 0px;
  padding-bottom: 50px;
  cursor: pointer;
}



</style>