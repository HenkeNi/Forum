<template>
  <div>
    <h1>Create new thread</h1>

    <form>
      <label for="title">Enter title</label><br/>
      <input required id="title" type="text" /><br/>

      <label for="message">Message</label><br/>
      <input required id="message" type="text" />
      <button>Cancel</button><button @click="createThread">Confirm</button>
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

      this.postInitialPost(res);
    },

    async postInitialPost(thread) {
    
      let post = {
        "message": document.getElementById("message").value,
        "userId": this.$store.getters.currentUser.id,
        "threadId": thread.lastInsertRowid,
        "published_time": Date.now()
      }

      console.log("POST:", post);

       //this.$store.dispatch('postNewPost', post); 
      // this.$store.dispatch('postNewPost', {
      //   "message": document.getElementById("message").value,
      //   "userId": this.$store.getters.currentUser.id,
      //   "threadId": thread.lastInsertRowid,
      //   "pubished_time": Date.now()
      // });      



      let res = await fetch('http://localhost:3000/rest/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(post)
      });
      res = await res.json();
      console.log(res);
    },

  }
}
</script>


<style>


</style>
