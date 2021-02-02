<template>
  <div id="thread-page" class="thread-page">
    <NewPostModal :threadId="this.thread.id" @reload="fetchPosts" @myEvent="modalClosed" v-model="newpostModalOpen" />
    <div class="page-head">
      <h1 v-bind:class="{ showclose: showCloseThread }" class="title">{{thread.title}}</h1>
      <div class="block" v-if="showCloseThread">
        <h2 @click="closeThread">Close Thread</h2>
      </div>
    </div>
    <div class="closed" v-if="threadClosed">
      <h3 class="closed-text">Thread Closed!</h3>
    </div>
    <PostList class="list" :posts="this.posts" :thread="this.thread" />
    
  <div class="buttons">
        <div @click="newPost" class="post" v-if="!threadClosed">
    <!-- <div @click.prevent="scrollTo('#newpost')" class="post" v-if="!threadClosed"> -->
      <h2>New Post</h2>
    </div>
    <!-- <div class="block" v-if="showCloseThread">
      <h2 @click="closeThread">Close Thread</h2>
    </div> -->
  </div>
    
    <div id="newpost" class="newpost" v-if="shouldPost">
      <NewPost :threadId="this.thread.id"/>
    </div>

    
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import NewPostModal from "../components/NewPostModal.vue";
import NewPost from '../components/NewPost.vue';

export default {
  components: {
    PostList,
    NewPostModal,
    NewPost
  },
  props: ["thread"],
  data() {
    return {
      posts: [],
      threadClosed: false,
      newpostModalOpen: false,
      shouldPost: false,
    };
  },
  computed: {
    showCloseThread() {
      let user = this.$store.getters.currentUser;
      if (user) {
        return (
          (user.userRole === "moderator" || user.userRole === "admin") &&
          this.threadClosed === false
        );
      }
      return false;
    },
    isLoggedIn() {
      return this.$store.getters.currentUser !== null;
    }
  },
  methods: {
    modalClosed() {
      this.newpostModalOpen = false;
      this.fetchPosts();
    },
    async fetchPosts() {
      let res = await fetch(`/rest/v1/posts/${this.thread.id}`); // TODO: FIX!!!!
      res = await res.json();
      this.posts = res;
    },
    async closeThread() {
      let res = await fetch(`/rest/v1/threads/${this.thread.id}`, {
        method: "PUT"
      });
      res = await res.json();
      console.log(res);
      this.threadClosed = true;
    },
    newPost() {

      if (!this.isLoggedIn) { alert("Login to post a message!"); return; } 

      this.shouldPost = !this.shouldPost;
      //this.scrollToEnd();

      // TODO : if no current user => return, show error message

      // TODO: Scrolla ner sidan...
      // TODO: disable button. alt stäng 
      // TODO: kolla att man är inloggad


      //window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);


      //this.newpostModalOpen = !this.newpostModalOpen;
    },
    scrollToEnd() {
      // const el = this.$el.getElementsByClassName('newpost')[0];
      // if (el) {
      // el.scrollIntoView({behavior: 'smooth'});
      // }


      //let pageDiv = document.getElementById("thread-page");
      //pageDiv.scrollTop = pageDiv.scrollHeight;    

        //pageDiv.scrollIntoView();
      //let container = document.getElementById("newpost");
      // container.scrollTop = container.scrollHeight;
      //container.scrollIntoView() - 200;
    },
  },
  created() {
    this.fetchPosts();
    this.threadClosed = this.thread.active === 0 ? true : false;
  },
  mounted() {
    this.fetchPosts();
  },
  // watch: {
  //   newpostModalOpen() {
  //     this.fetchPosts();
  //   } 
  //}
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

.showclose {
  background-color: aquamarine;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px; 
}

.page-head {
  margin-top: 30px;
  margin-bottom: 30px;
}

.title {
  padding: 30px 0px 30px 0px;
  text-align: center;
  text-decoration: underline;
  width: 60vw;
  margin: 0px;
  /* background-color: rgb(105, 105, 105); */
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  color: white;
  border-radius: 5px;
  word-wrap: break-word;
}

.block {
  position: relative;
  /* border-radius: 5px; */
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: center;
  /* width: 60vw; */
  margin-left: 10px;
  width: 15vw;
  border: 2px solid rgb(27, 27, 27);
  border-top: 0px;
  background-color: rgb(175, 25, 25);
  cursor: pointer;
  color: white;
}

.block:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}

.block h2 {
  margin: 0px;

}

.block h3 {
  margin: 5px;
}

.buttons {
  width: 60vw;
  display: flex;
  flex-direction: row-reverse;
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

.post h2:hover {
  color: rgb(207, 207, 132);
  border: 1px solid rgb(207, 207, 132);
}



</style>