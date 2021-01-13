<template>
  <div class="thread-creation">
    <h1 class="title">Create new thread</h1>

    <form class="form">
      <label for="title">Enter title</label><br/>
      <input required id="title" type="text" /><br/>

      <label for="message">Message</label><br/>
      <input class="message" required id="message" type="text" />
      <button @click="goBack">Cancel</button><button @click="createThread">Confirm</button>
    </form>
  </div>
</template>


<script>
export default {
  props: ['subforum'],
  methods: {
    async createThread(e) {
      e.preventDefault();
      
      let thread = {
        "title": document.getElementById("title").value,
        "userId": this.$store.getters.currentUser.id,
        "published_time": Date.now(),
        "subforumId": this.$route.params.subforum.id,
        "active": "active",
      }

      console.log("POSTING THREAD", thread);

      if (thread.userId === null || thread.userId === undefined) { return; } 

      let res = await fetch('http://localhost:3000/rest/threads', {

      //let res = await fetch(`http://localhost:3000/threads/${this.$route.params.subforum.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: 
          JSON.stringify(thread)
      });
      res = await res.json();
      console.log("RESPONSE: ", res.lastInsertRowid);

      this.postInitialPost(thread, res);

      thread.id = res.lastInsertRowid;
      this.$router.push({ name: 'ThreadPage', params: {thread: thread} });
    },

    async postInitialPost(thread, res) {
    
      let post = {
        "message": document.getElementById("message").value,
        "userId": this.$store.getters.currentUser.id,
        "threadId": res.lastInsertRowid,
        "published_time": Date.now(),
        "warning": 0
      }

      console.log("POST:", post);

       //this.$store.dispatch('postNewPost', post); 
      // this.$store.dispatch('postNewPost', {
      //   "message": document.getElementById("message").value,
      //   "userId": this.$store.getters.currentUser.id,
      //   "threadId": thread.lastInsertRowid,
      //   "pubished_time": Date.now()
      // });      

      let result = await fetch('http://localhost:3000/rest/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(post)
      });
      result = await result.json();
      console.log(result);
    },
    goBack() {
      this.$router.push({ name: 'SubforumPage', params: {subforum: this.subforum} });
    }
  }
}
</script>


<style scoped> 
.thread-creation {
  background-color: gray;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center
}
.title {
  padding-top: 30px;
  margin: 0px;
  text-align: center;
}

.form {
  padding-top: 50px;
  width: 40vw;
  height: 50vh;
  background-color: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
}

.form label {
  margin: 0px;
  padding-bottom: 2px;
}

.message {
  width: 30vw;
  height: 40vh;
}

</style>
