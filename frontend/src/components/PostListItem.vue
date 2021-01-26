<template>
  <div v-bind:class="{ warning: isWarning }" class="post-container">
    <div @click="goToProfile" class="profile">
      <h3 class="author">{{author.username}}</h3>
      <img src="https://image.flaticon.com/icons/png/512/21/21294.png" />
      <h4>{{ author.userRole }}</h4>
    </div>
    <div  class="main">
      <div class="published">
        <h3>{{publishedDate}}</h3>
      </div>
      <div class="message">
        <h2>{{post.message}}</h2>
      </div>
    </div>
      
    <div class="remove">
      <div v-if="isAuthorized" @click="remove"><h3>remove</h3></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      author: Object
    }
  },
  computed: {
    isWarning() {
      return this.post.warning === 1;
    },
    isAuthorized() {
      let user = this.$store.getters.currentUser;

      if (user) {
        return user.userRole === 'admin' || user.userRole === 'moderator';
      }
      return false;
    },
    publishedDate() {
      //return new Date(this.post.published_time).toLocaleString();
      let publishedDate = new Date(this.post.published_time);
      let currentDate = new Date();

      if (publishedDate.getDate() < currentDate.getDate() - 7) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return months[publishedDate.getMonth()] + "  " + publishedDate.getDay() + ", " + publishedDate.getFullYear();
      }

      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let day = publishedDate.getDate() === currentDate.getDate() ? "Today" : 
      publishedDate.getDate() === currentDate.getDate() - 1 ? "Yesterday" : days[publishedDate.getDay()];

      return day + " at " + publishedDate.getHours() + ":" + publishedDate.getMinutes();
    }
  },
  methods: {
    async fetchAuthor() {
      let res = await fetch(`/rest/v1/users/${this.post.userId}`); // TODO: FIX!!!!
      res = await res.json();
      console.log(res);
      this.author = res;
    },
    async remove() {
      let res = await fetch(`/rest/v1/posts/${this.post.id}`, {
        method: 'delete'
      });
      res = await res.json();
      console.log(res);
      // TODO: emit RELOAD...
    },
    goToProfile() {
      this.$router.push({ name: 'ProfilePage', params: {user: this.author} });
    }
  },
  created() {
    this.fetchAuthor();
  }
}
</script>


<style scoped>
.post-container {
  text-align: start;
  /* padding: 10px; */
  width: 80vw;
  border: 1px solid white;
  background-color: rgb(167, 164, 164);
  display: flex;
  justify-content: flex-start;
  /* height: 400px; */
  min-height: 250px;
  margin-bottom: 10px;
  
}

.profile {
  margin: 0px;
  cursor: pointer;
  text-align: center;
  /* background-color: rgb(116, 115, 115); */
  height: 100%;
  width: 120px;
}

.profile h4 {
  margin: 0px;
}

.author {
  margin: 0px;
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
  width: 100%;
}

.message {
  text-align: start;
}

.posted-by {
    color: rgb(231, 231, 31);
}

.warning {
  /* border: 1px solid black; */
  background-color: rgb(255, 255, 116);
}


.remove h3 {
  cursor: pointer;
  margin-right: 20px;
  background-color: rgb(175, 25, 25);
  color: white;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid rgb(214, 214, 214);
}



</style>