<template>  
  <div class="page">
    <div class="send">
      <textarea class="textarea" id="post-message" type="text" name="post-message" placeholder="Enter new message..." cols="40" rows="5" required></textarea>
      <p>Send a message to {{ user.username }}{{ user.id }}</p>
      <button @click="sendMessage">SEND</button>
    </div>
    <div class="list" v-if="conversationsID != null">
      <MessageList :messages="messages" />
    </div>
  </div>  
</template>

<script>
import MessageList from '../components/MessageList';

export default {
  props: ['user'],
  components: {
    MessageList
  },
  data() {
    return {
      conversationsID: null,
      messages: [],
      intervalID: null
    }
  },
  methods: {
    async sendMessage() {

      if (this.conversationsID !== null) {
        this.postMessage();
            this.fetchMessages();
      } else {
        // TODO: FIX!!!
        this.createConversation();
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
      if (this.conversationsId != null) { return; }

      let res = await fetch('/rest/v1/conversations', {
        method: 'POST'
      });
      res = await res.json();
      this.conversationsID = res.lastInsertRowid;

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

      let res = await fetch('/rest/v1/conversationsXusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify(data)
      });
      res = await res.json();
      console.log(res);
    },

    async postMessage() {
      let message = {
        senderId: this.$store.getters.currentUser.id,
        text: document.getElementById('post-message').value,
        send_date: Date.now(),
        conversationId: this.conversationsID 
      };

      console.log("message", message);
      let res = await fetch('/rest/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify(message)
      });
      res = await res.json();
      console.log(res);
    },
    async fetchMessages() {
      if (this.conversationsID !== null) {
        let res = await fetch(`/rest/v1/messages/${this.conversationsID}`);
        this.messages = await res.json();
      }
    },
    async checkIfAlreadyAConversation() {
      let convUser1 = await this.fetchConversations(this.user.id);
      let convUser2 = await this.fetchConversations(this.$store.getters.currentUser.id);

      // converts array of object (convID: number) to an array of string
      convUser1 = convUser1.map(function(element) { return element['convID']; }); 
      convUser2 = convUser2.map(function(element) { return element['convID']; });

      // check if first array includes element(s) from the second array 
      let convID = convUser1.filter(element => convUser2.includes(element)); 

      if (convID !== undefined && convID.length > 0) {
        this.conversationsID = convID[0]; 
      }  
    },


   

    // async getUserInConversation() { // NEEDED???!
    //   let res = await fetch(`/rest/v1/conversationsXusers/${this.conversationsId}`);
    //   return await res.json();
    // }


  },
  fetchMessages() {
    // TODO only fetch 10 latest??
    this.intervalID = window.setInterval(this.fetchMessages(), 100);
  },
  created() {
    this.checkIfAlreadyAConversation();
    this.fetchMessages();
  },
  destroyed() {
    window.clearInterval(this.intervalID);
  },
  watch: {
    conversationsID() {
      this.fetchMessages();
    }
  },


}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.list {
  width: 60vw;
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
  border: 2px solid white;
  color: white;
  padding: 3px;
}

</style>