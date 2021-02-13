<template>
  <div class="page">
    <div class="send">
      <div class="other-user">
        <h2>Conversation with</h2><h2 @click.prevent="goToProfile" class="name">{{user.username}}</h2>
      </div>
      <textarea
        class="textarea"
        id="post-message"
        type="text"
        name="post-message"
        placeholder="Enter new message..."
        cols="40"
        rows="5"
        required
      ></textarea>
      <p>Send a message to {{ user.username }}{{ user.id }}</p>
      <button @click="sendMessage">SEND</button>
    </div>
    <div class="list" v-if="conversationsID != null">
      <MessageList :messages="messages" />
    </div>
  </div>
</template>

<script>
import MessageList from "../components/MessageList";

export default {
  props: ["user"],
  components: {
    MessageList
  },
  data() {
    return {
      conversationsID: null,
      messages: [],
      interval: null
    };
  },
  methods: {
    async sendMessage() {
      if (document.getElementById("post-message").value === "") { return; }

      if (this.conversationsID !== null) {
        this.postMessage();
        this.fetchMessages();
      } else {
        console.log("CONVERSATION WITH NEW USER");
        // TODO: FIX!!!
        let id = await this.createConversation();
        console.log("CONVERSATion started with id: ", id);
        await this.addUserToConversation(this.user.id);
        await this.addUserToConversation(this.$store.getters.currentUser.id);
        await this.postMessage();
        await this.fetchMessages();
      }

      // CHECK IF NO CONVERSATION EXISTS BETWEEN users
      // GET convers..id from one user and compare it to another user....
      //this.checkIfAlreadyAConversation();

      //this.createConversation();

      // console.log(this.conversationsId);
      // this.addUserToConversation(this.user.id);
    },

    async fetchConversations(userId) {
      let res = await fetch(`/rest/v1/conversations/${userId}`);
      return await res.json();
    },

    // If new conversation
    async createConversation() {
  
      let res = await fetch("/rest/v1/conversations", {
        method: "POST"
      });
      res = await res.json();
      this.conversationsID = res.lastInsertRowid;
      
      
      return res.lastInsertRowid;
      
      
      //this.addUserToConversation(this.user.id, res.lastInsertRowid);
      //this.addUserToConversation(this.$store.getters.currentUser.id, res.lastInsertRowid);
      //this.postMessage(res.lastInsertRowid);
    },
    async addUserToConversation(userId) {
      // check if user is already in conversation?
      let data = {
        userId: userId,
        // conversationId: this.conversationsId
        conversationId: this.conversationsID
      };
      console.log(data);

      let res = await fetch("/rest/v1/conversationsXusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      res = await res.json();
      console.log(res);
    },

    async postMessage() {
      let message = {
        senderId: this.$store.getters.currentUser.id,
        text: document.getElementById("post-message").value,
        send_date: Date.now(),
        conversationId: this.conversationsID
      };

      console.log("message", message);
      let res = await fetch("/rest/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });
      res = await res.json();
      console.log(res);
      this.emptyInputField();
    },
    async fetchMessages() {
      if (this.conversationsID !== null) {
        let res = await fetch(`/rest/v1/messages/${this.conversationsID}`);
        this.messages = await res.json();
      }
    },
    async checkIfAlreadyAConversation() {
      let convUser1 = await this.fetchConversations(this.user.id);
      let convUser2 = await this.fetchConversations(
        this.$store.getters.currentUser.id
      );

      // converts array of object (convID: number) to an array of string
      convUser1 = convUser1.map(function(element) {
        return element["convID"];
      });
      convUser2 = convUser2.map(function(element) {
        return element["convID"];
      });

      // check if first array includes element(s) from the second array
      let convID = convUser1.filter(element => convUser2.includes(element));

      if (convID !== undefined && convID.length > 0) {
        this.conversationsID = convID[0];
      }
    },
    emptyInputField() {
      document.getElementById("post-message").value = "";
    },
    setInterval() {
      this.interval = setInterval(() => {
        this.fetchMessages();
      }, 5000);
    },
    goToProfile() {
      this.$router.push({ name: 'ProfilePage', params: {user: this.user} });
    }
   
    // async getUserInConversation() { // NEEDED???!
    //   let res = await fetch(`/rest/v1/conversationsXusers/${this.conversationsId}`);
    //   return await res.json();
    // }
  },

  
  created() {
    this.checkIfAlreadyAConversation();
    this.fetchMessages();
    this.setInterval();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  watch: {
    conversationsID() {
      this.fetchMessages();
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.list {
  width: 60vw;
  height: 60vh;
  display: flex;
  justify-content: center;
}



.textarea {
  color: white;
  background-color: rgb(54, 62, 65);
  /* background-color: rgb(98, 73, 122); */
  border: 2px solid black;
}

p {
  margin-top: 0px;
  text-align: center;
}

::placeholder {
  color: white;
}

.send {
  display: flex;
  flex-direction: column;
}

.send button {
  background-color: rgb(27, 38, 43);
  border: 2px solid black;
  color: white;
  padding: 3px;
  cursor: pointer;
}


.other-user {
  display: flex;
}

.name {
  padding-left: 10px;
  color: rgb(30, 75, 134);
  cursor: pointer;
}

.name:hover {
  color: rgb(207, 207, 132);
}


</style>