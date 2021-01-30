<template>
  <div class="post-container">
<!-- <form action=""> -->
    <form>
      <div class="input-fields">
          <textarea class="textarea" id="post-message" type="text" name="post-message" placeholder="Enter message..." cols="40" rows="5" required></textarea>
          <br />
        </div>
        <div class="checkbox" v-if="showCheckbox">
          <label for="warning">Warning message: </label>
          <!-- <br /> -->
          <input type="checkbox" id="post-warning" name="post-warning" />
        </div>
        <div class="buttons">
          <input class="send" @click.prevent="createPost" type="submit" value="Post" />
          <!-- <button type="submit" @click="createPost">Sen</button> -->
          <!-- <input type="submit" @click="submit" value="Post" /> -->
          <button class="cancel" @click.prevent="close">Close</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["threadId"],
  data() {
    return {
      name: "hllo",
    }
  },
  computed: {
    showCheckbox() {
      let user = this.$store.getters.currentUser;
      if (user) {
        return user.userRole === "admin" || user.userRole === "moderator";
      }
      return false;
    },
  },
  methods: {
    close() {
      this.$parent.shouldPost = false;
    },
    async createPost(e) {
      e.preventDefault();

      let post = {
        message: document.getElementById("post-message").value,
        userId: this.$store.getters.currentUser.id,
        threadId: this.threadId,
        published_time: Date.now(),
        warning: 0
      };

      if (this.showCheckbox && document.getElementById("post-warning").checked === true) {
        post.warning = 1;
      }

      //let res = await this.$store.dispatch("postNewPost", post);

      let res = await fetch("/rest/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      });
      res = await res.json();
      console.log(res);
      this.$parent.fetchPosts();
      this.close();
    },
  },
  created () {
    // let div = document.getElementById("post-container");
    // console.log(div);
    // //div.scrollTop = div.scrollHeight;   
    // div.scrollIntoView();
  },
  


}
</script>


<style scoped>
.post-container {
  margin-top: 5px;
  width: 60vw;
  height: 200px;
  background-color: rgb(46, 58, 63);
  /* background-color: rgb(26, 33, 36); */
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-fields {
  display: flex;
  justify-content: center;
  align-items: center;
}


.textarea {
  background-color: rgb(46, 58, 63);
  color: white;
  border-top: none;
  border-left: none;
  width: 55vw;
}

::placeholder {
  color: white;
}

.checkbox {
  padding-top: 10px;
  margin-bottom: 10px;
  color: white;
  display: flex;
  justify-content: center;
}


.send {
  cursor: pointer;
  width: 160px;
  background-color: rgb(26, 33, 36);
  color: white;
  border-radius: 5px;
  border: 1px solid rgb(214, 214, 214);
}

.cancel {
  cursor: pointer;
  width: 160px;
  background-color: rgb(49, 52, 53);
  color: white;
  border-radius: 5px;
  border: 1px solid rgb(214, 214, 214);
}


.buttons {
  display: flex;
  justify-content: center;
}

</style>