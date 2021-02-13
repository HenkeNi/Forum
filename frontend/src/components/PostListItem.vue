<template>
  <div v-bind:class="{ warning: isWarning }" class="post-container">
    <div @click="goToProfile" class="profile">
      <h3 class="author">{{author.username}}</h3>
      <img class="image" :src="author.imgUrl" />
      <!-- <img src="https://image.flaticon.com/icons/png/512/21/21294.png" /> -->
      <h4>{{ author.userRole }}</h4>
      <h5>Registration:</h5>
      <h5>{{ this.registrationDate }}</h5>
      <h5>Posts: {{this.author.numberOfPosts}}</h5>
    </div>
    <div class="main">
      <div class="top">
        <div class="published">
          <h3>{{publishedDate}}</h3>
        </div>
        <div>
          <h2 v-if="isWarning">Warning!</h2>
        </div>
        <div class="options">
          <div v-if="isLoggedIn" class="quote" @click="quoteUser">
            <h2>quote</h2>
          </div>
          <div v-if="isEditable" @click="edit" class="edit">
            <h3>Edit</h3>
          </div>
          <div class="remove">
            <div v-if="isAuthorized" @click="remove">
              <h3>remove</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="message">
        <div v-if="this.quote" >
          <QuoteItem :quote="quote" />
        </div>

        <!-- <div class="quote-container" v-if="quote !== null">
          <div v-if="quotedAuthor" class="quote-header">
            <h4>at dd-mm-yy at hh:mm {{this.quotedAuthor.username}} wrote:</h4>
          </div>
          <h3>{{this.quote.message}}</h3>
        </div> -->

        <div v-if="shouldEdit">
          <EditPost :post="post" />
        </div>
        <div v-if="!shouldEdit">
          <p class="has-edited" v-if="isEdited">(Edited)</p>
          <h2 class="main-text">{{post.message}}</h2>
        </div>
      </div>
          <!-- <h2>Flag as offensive</h2> -->
    </div>
  </div>
</template>

<script>
import EditPost from "../components/EditPost.vue";
import QuoteItem from "../components/QuoteItem.vue";

export default {
  components: {
    EditPost,
    QuoteItem
  },
  props: ["post", "thread"],
  data() {
    return {
      // author: Object,
      author: Object,
      shouldEdit: false,
      quote: null,
      // quotedAuthor: null
    };
  },
  computed: {
    isWarning() {
      return this.post.warning === 1;
    },
    isAuthorized() {
      let user = this.$store.getters.currentUser;

      if (user) {
        return user.userRole === "admin" || user.userRole === "moderator";
      }
      return false;
    },
    isLoggedIn() {
      return this.$store.getters.currentUser !== null;
    },
    isEditable() {
      return (
        this.thread.active === 1 &&
        (this.isAuthorized ||
          (this.$store.getters.currentUser !== null &&
            this.$store.getters.currentUser.id === this.author.id))
      );

      // let user = this.$store.getters.currentUser;
      // if (user) {
      //   return user.userRole === 'admin' || user.userRole === 'moderator' || user.id === this.author.id;
      // }
      // return false;
    },
    isEdited() {
      return this.post.isEdited === 1;
    },
    registrationDate() {
      let regDate = new Date(this.author.registrationDate);
      return regDate.getDay() + 1 + "/" + regDate.getMonth() + 1 + "/" + regDate.getFullYear(); 
    },
    publishedDate() {
      //return new Date(this.post.published_time).toLocaleString();
      let publishedDate = new Date(this.post.published_time);
      let currentDate = new Date();

      if (publishedDate.getDate() < currentDate.getDate() - 7) {
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
        return (
          months[publishedDate.getMonth()] +
          "  " +
          publishedDate.getDay() +
          ", " +
          publishedDate.getFullYear()
        );
      }

      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let day =
        publishedDate.getDate() === currentDate.getDate()
          ? "Today"
          : publishedDate.getDate() === currentDate.getDate() - 1
          ? "Yesterday"
          : days[publishedDate.getDay()];

      return (
        day +
        " at " +
        publishedDate.getHours() +
        ":" +
        publishedDate.getMinutes()
      );
    }
  },
  methods: {
    // async fetchQuotedAuthor(quote) {
    //   let res = await fetch(`/rest/v1/users/${quote.userId}`); // TODO: FIX!!!!
    //   res = await res.json();
    //   console.log(res);
    //   this.quotedAuthor = res;
    // },
     async fetchAuthor() {
      let res = await fetch(`/rest/v1/users/${this.post.userId}`); // TODO: FIX!!!!
    
      this.author = await res.json();
    },
    async remove() {
      let res = await fetch(`/rest/v1/posts/${this.post.id}`, {
        method: "delete"
      });
      res = await res.json();
      console.log(res);
      // this.$parent.reload();
      this.fetchPostsInParent();
    },
    async edit() {
      this.shouldEdit = !this.shouldEdit;
    },
    async getPossibleQuote() {
      let res = await fetch(`/rest/v1/quotes/${this.post.id}`);
      res = await res.json();

      if (res[0]) {
        this.quote = res[0];
        //this.fetchQuotedAuthor(res[0]);
      }
    },
    async getNumberOfPostsByUser() {
      let res = await fetch(`/rest/v1/posts/user/count/${this.post.userId}`);
      res = await res.json();
      this.author.numberOfPosts = res[0]["COUNT(userId)"];
    },
    fetchPostsInParent() {
      this.$parent.reload();
    },
    goToProfile() {
      this.$router.push({ name: "ProfilePage", params: { user: this.author } });
    },
    quoteUser() {
      if (this.$store.getters.currentUser === null) {
        alert("Login to quote a message!");
        return;
      }
      this.$parent.passQuotedPost(this.post);
    }
  },
  created() {
    this.fetchAuthor();
    this.getNumberOfPostsByUser();
    this.getPossibleQuote();
    // this.fetchQuotedAuthor();    
  }
};
</script>


<style scoped>
.post-container {
  text-align: start;
  /* padding: 10px; */
  width: 60vw;
  border: 2px solid black;
  background-color: rgb(167, 164, 164);
  display: flex;
  justify-content: flex-start;
  /* height: 400px; */
  min-height: 250px;
  margin-bottom: 10px;
  border-radius: 10px;
  word-wrap: break-word;
}

.top {
  /* width: 580px; */
  display: flex;
  justify-content: space-between;
}

.profile {
  margin: 0px;
  cursor: pointer;
  text-align: center;
  /* background-color: rgb(116, 115, 115); */
  height: 100%;
  width: 120px;
  padding-left: 5px;
}

.profile h4 {
  margin: 0px;
}

.profile:hover {
  color: rgb(207, 207, 132);
}

.author {
  margin: 0px;
  padding-top: 5px;
}

img {
  width: 80px;
  height: 80px;
}

.main {
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: 100%;
}

.published {
  /* width: 60%; */
  display: flex;
}

.published h3 {
  /* margin-right: 150px; */
}

.message {
  text-align: start;
  width: 80%;
  padding-bottom: 20px;
}
.message h2 {
  /* margin: 0px; */
}

.posted-by {
  color: rgb(231, 231, 31);
}

.warning {
  border: 2px solid black;
  background-color: rgb(255, 255, 116);
}

.options {
  display: flex;
  justify-content: flex-end;
}

.remove h3 {
  cursor: pointer;
  margin-right: 20px;
  background-color: rgb(175, 25, 25);
  color: black;
  border-radius: 5px;
  padding: 5px;
  border: 2px solid black;
}

.remove h3:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}

.edit h3 {
  margin-right: 10px;
  cursor: pointer;
  background-color: rgb(226, 226, 188);
  border-radius: 5px;
  border: 2px solid black;
  padding: 5px;
}

.edit h3:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}

.has-edited {
  margin: 0px;
}

.main-text {
  margin-top: 0px;
}

.image {
  object-fit: cover;
}

.quote {
  cursor: pointer;
}
.quote h2 {
  border: 2px solid black;
  border-radius: 5px;
  background-color: rgb(90, 88, 88);
  margin-right: 5px;
}

.quote h2:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}





</style>