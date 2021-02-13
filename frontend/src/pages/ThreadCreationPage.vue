<template>
  <div class="thread-creation">
    <div class="head">
      <h1 class="title">Thread Creation</h1>
    </div>

    <form class="form">
      <label for="title">Title</label><br/>
      <input required id="title" type="text" /><br/>
      <div v-if="isModeratorOrAdmin">
        <label>Make thread nailed:
          <input id="nailed-check" type="checkbox" />
        </label>
      </div>


      <label for="message">Message</label><br/>
      <textarea required id="message" type="text" name="Text1" cols="40" rows="5"></textarea>
      <!-- <input class="message" required id="message" rows="5" type="text" /> -->
      <div class="buttons">
        <button class="cancel" @click="goBack">Cancel</button><button class="confirm" @click="createThread">Confirm</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  props: ['subforum'],
  computed: {
    isModeratorOrAdmin() {
      let user = this.$store.getters.currentUser;
      if (user) {
        return user.userRole === "admin" || user.userRole === "moderator";
      }
      return false;
    }
  },
  methods: {
    async createThread(e) {
      e.preventDefault();

      if (document.getElementById('title').value === "" || document.getElementById('message') === "") { return; }
      
      let thread = {
        "title": document.getElementById("title").value,
        "userId": this.$store.getters.currentUser.id,
        "published_time": Date.now(),
        "subforumId": this.$route.params.subforum.id
      }

      if (thread.userId === null || thread.userId === undefined) { return; } 

      if (this.isModeratorOrAdmin && document.getElementById("nailed-check").checked === true) {
        thread.isNailed = 1; 
      }

      let res = await fetch('/rest/v1/threads', {
      //let res = await fetch(`/threads/${this.$route.params.subforum.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify(thread)
      });
      res = await res.json();
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

      let result = await fetch('/rest/v1/posts', {
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
  padding-top: 15px;
  padding-bottom: 15px;  
  margin: 0px;
  text-align: center;
}

.head {
  background-image: url("https://i.pinimg.com/originals/d2/dc/2f/d2dc2f6d81d98938f19a5c99aaf32db9.jpg");
  margin-bottom: 30px;
  width: 60vw;
  background-color: rgb(85, 83, 83);
  border-radius: 5px;
  color: white;
  text-align: center;
  margin-top: 30px;
  padding-bottom: 10px;
    /* box-shadow: 2px 2px 8px #000000; */

}



.form {
  padding-top: 50px;
  width: 59.5vw;
  height: 50vh;
  background-color: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  box-shadow: 1px 1px 8px #000000;

}

.form label {
  margin: 0px;
  padding-bottom: 2px;
}

.message {
  width: 30vw;
  height: 40vh;
}

label {
  text-align: center;
}


.buttons {
  display: flex;
  padding-top: 20px;
}

.confirm {
  padding: 10px 15px;
  background-color: rgb(26, 33, 36);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid rgb(214, 214, 214);
  box-shadow: 1px 2px 8px #000000;
  width: 100%;
}

.confirm:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}

.cancel {
  padding: 10px 15px;
  background-color: rgb(114, 114, 114);
  color: black;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid rgb(214, 214, 214);
  box-shadow: 1px 2px 8px #000000;
  width: 100%;
}

.cancel:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}


</style>
