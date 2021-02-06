<template>
  <div class="post-container">
    <!-- <form action=""> -->
    <form class="post-form">
      <div class="remove-quote" v-if="this.quotedPost !== null">
        <h4 @click.prevent="removeQuote">remove</h4>
      </div>
      <div v-if="this.quotedPost !== null" class="quoted-text">
        <div class="quote-head">
          <h3>at dd-mm-yy at hh:mm {{this.quotedAuthor.username}} wrote:</h3>
        </div>
        <div>
          <textarea class="quote-textarea" id="quote-message" type="text" cols="40"
          rows="5" v-model="this.quotedPost.message"></textarea>
           <!-- <textarea class="quote-textarea" id="quote-text" type="text" cols="40"
          rows="5" v-model="this.quotedPost.message"></textarea> -->
        </div>
       
      </div>

      <div class="input-fields">
        <textarea
          class="textarea"
          id="post-message"
          type="text"
          name="post-message"
          placeholder="Enter message..."
          cols="40"
          rows="5"
          required
        ></textarea>
        <br />
      </div>
      <div class="checkbox" v-if="showCheckbox">
        <!-- <br /> -->
        <label class="box">
          Warning message:
          <input class="box" type="checkbox" id="post-warning" name="post-warning" />
        </label>
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
  props: ["quote", "threadId"],
  data() {
    return {
      quotedAuthor: Object,
      quotedPost: null,
    };
  },
  computed: {
    showCheckbox() {
      let user = this.$store.getters.currentUser;
      if (user) {
        return user.userRole === "admin" || user.userRole === "moderator";
      }
      return false;
    }
  },
  methods: {
    close() {
      this.$parent.shouldPost = false;
    },
    removeQuote() {
      console.log("remove quote");
      this.quotedPost = null;
    },
    // getMessage() {

    //   if (this.quote === null) { return; } // OR SOMETHING:....

    //   let head= "[head] " + + this.quote.published_time + " at " + this.quotedAuthor.username + "[/head]";
    //   let message = "[quote]" + this.quote.message + "[/quote]";
    //   message += "even more text!!";

    //   //let quotedText = message.substring(message.lastIndexOf("[quote]") + 1, message.lastIndexOf("[/quote]")); 
    //   let quotedText = message.split('[quote]').pop().split('[/quote]')[0];
    //   console.log("This is quoted text", quotedText);

    //   let quotedHead = head.split('[head]').pop().split('[/head]')[0];
    //   console.log("This is head of quote", quotedHead);


    // },
    async postQuotedText(postId) {
      console.log("post quote");

      let quotedText = document.getElementById('quote-message').value;
      let isEdited = quotedText !== this.quotedPost.message ? 1 : 0;

      let quote = {
        message: quotedText,
        userId: this.quotedAuthor.id,
        postId: postId,
        published_time: this.quotedPost.published_time,
        isEdited: isEdited
      };

      console.log(quote);

      let res = await fetch(`/rest/v1/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quote)
      });
      res = await res.json();
      console.log(res);

    },
    async getQuotedAuthor() {
      let res = await fetch(`/rest/v1/users/${this.quote.userId}`); 
      this.quotedAuthor = await res.json();
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

      if (
        this.showCheckbox &&
        document.getElementById("post-warning").checked === true
      ) {
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

       // Also send 
       if (this.quotedPost !== null) {
        this.postQuotedText(res.lastInsertRowid);
      }

      this.$parent.fetchPosts();
      this.close();
    }
  },
  created() {
    console.log("START:", this.quotedPost);
    if (this.quote) {
      this.quotedPost = this.quote;

     //document.getElementById('quote-message').value = "BATMAN";//this.quote.message;
     //console.log("SOME", document.getElementById('quote-message').value);
     // console.log("New post with quote", this.quote);
      this.getQuotedAuthor();
      // document.getElementById('quote-text').value = this.quote.message; 
    }
    // let div = document.getElementById("post-container");
    // console.log(div);
    // //div.scrollTop = div.scrollHeight;
    // div.scrollIntoView();
  }
};
</script>


<style scoped>

.remove-quote {
  padding: 2px;
}

.remove-quote h4 {
  margin: 0px;
  border: 2px solid black;
  width: 12%;
  text-align: center;
  border-radius: 5px;
  padding: 1px;
  cursor: pointer;
}

.post-form {
    padding-top: 10px;
}

.quote-textarea {
  background-color: transparent;
  border: none;
  width: 100%;
}

.quoted-text {
  background-color: rgb(55, 46, 63);
  border: 2px solid white;
}
.quote-head {
    background-color: rgb(37, 31, 43);
    color: white;
}

.quote-head h3 {
  margin: 0px;
}


.post-container {
  margin-top: 5px;
  width: 60vw;
  /* height: 200px; */
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

.box {
  cursor: pointer;
}

.checkbox {
  padding-top: 10px;
  margin-bottom: 10px;
  color: white;
  display: flex;
  justify-content: center;
}

.checkbox:hover {
  color: rgb(207, 207, 132);
}

.send {
  cursor: pointer;
  width: 160px;
  background-color: rgb(26, 33, 36);
  color: white;
  border-radius: 5px;
  border: 1px solid rgb(214, 214, 214);
}

.send:hover {
  color: rgb(207, 207, 132);
  border: 1px solid rgb(207, 207, 132);
}

.cancel {
  cursor: pointer;
  width: 160px;
  background-color: rgb(49, 52, 53);
  color: white;
  border-radius: 5px;
  border: 1px solid rgb(214, 214, 214);
}

.cancel:hover {
  color: rgb(207, 207, 132);
  border: 1px solid rgb(207, 207, 132);
}

.buttons {
  display: flex;
  justify-content: center;
}
</style>