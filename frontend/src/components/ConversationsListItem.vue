<template>
  <!-- <div @click="goToMessagePage" class="container"> -->
  <div class="container">
    <div class="head">
      <div @click="goToMessagePage" class="head-empty"></div>
      <div class="head-delete">
        <h2 @click.prevent="deleteConversation" class="delete">x</h2>
      </div>
    </div>

    <div @click="goToMessagePage" class="main">
      <div class="top">
        <h2
          v-for="user in this.otherUser"
          :key="user.userId"
          class="conversation-item"
        >{{ user.username }}</h2>
      </div>

      <div class="center">
        <div class="unread">
          <h1 v-if="unreadMessages != 0">{{unreadMessages}}</h1>
        </div>
        <div class="icon-img">
          <span class="material-icons" style="font-size: 8em;">chat</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["convID"],
  data() {
    return {
      otherUser: Object,
      unreadMessages: 0
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser || "";
    }
  },
  methods: {
    async fetchUsersInConversations() {
      let res = await fetch(
        `/rest/v1/conversationsXusers/${this.convID.convID}`
      );
      res = await res.json();
      this.otherUser = res.filter(user => user.userId !== this.currentUser.id);
    },
    async fetchFullAuthor() {
      let res = await fetch(`/rest/v1/users/${this.otherUser[0].userId}`); // TODO: FETCH FIRST FOR NOW!!
      return await res.json();
    },
    async goToMessagePage() {
      let user = await this.fetchFullAuthor();
      this.$router.push({ name: "MessagePage", params: { user: user } });
    },
    async fetchNumberOfNewMessages() {
      let res = await fetch(`/rest/v1/messages/count/${this.convID.convID}`);
      res = await res.json();
      this.unreadMessages = res[0]["COUNT(unread)"];
      // console.log("UNREAD Messages: ", res[0]["COUNT(unread)"]);
    },
    async deleteConversation() { 

      let deleteObject = {
        userId: this.currentUser.id,
        conversationId: this.convID.convID
      };

      let res = await fetch('/rest/v1/conversationsXusers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify(deleteObject)
      })
      res = await res.json();
      console.log(res);

      // call to parent to reload...
      this.$parent.fetchConversations();

    }
  },
  created() {
    this.fetchUsersInConversations();
    this.fetchNumberOfNewMessages();
  },
  watch: {
    otherUser() {
      // delete conversation if no other users 
      if (this.otherUser[0] === null || this.otherUser[0] === undefined) {
        this.deleteConversation();
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(54, 62, 65);
  border: 2px solid white;
  width: 20vw;
  height: 20vw;
  color: white;
  text-align: center;
  margin-left: 20px;
  cursor: pointer;
}

.container:hover {
  color: rgb(207, 207, 132);
  border: 2px solid rgb(207, 207, 132);
}

.conversation-item {
  margin: 2px;
}




.head {
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
}
.head-delete {
  /* background-color: blue; */
  width: 20%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.head-empty {
  /* background-color: red; */
  width: 80%;
}
.head-delete h2 {
  margin: 0px;
  font-size: 2em;
  /* font-size: 3em; */
}





.top {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.top h2 {
  margin: 0px;
}

.delete {
  text-align: end;
  padding-right: 10px;
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 10px;
}

.center {
  display: flex;
  justify-content: center;
}

.unread {
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 4vw;
  /* padding-top: -2vw; */
  /* position: relative; */
  /* top: -15px; */
  /* right: -15px; */
  /* padding-right: 0px; */
  /* padding-bottom: -15px; */
}

.unread h1 {
  border-radius: 50%;
  margin: 0;
  background-color: red;
  text-align: center;
  width: 40px;
  height: 40px;
}
</style>