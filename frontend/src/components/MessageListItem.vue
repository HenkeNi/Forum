<template>
  <div v-bind:class="{ own: isOwnMessage }" class="large-container">
    <div>
      <div class="container">
        <h3 v-if="isOwnMessage" @click="deletePost" class="delete">X</h3>
        <h2 class="message">{{ message.text }}</h2>
        <p>written by: {{ this.author.username }}</p>
        <p v-if="isOwnMessage && message.unread === 1" class="read-status">(unread)</p>
      </div>
      <div class="bottom">
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  data() {
    return {
      author: Object
    };
  },
  computed: {
    isOwnMessage() {
      return this.$store.getters.currentUser.id === this.message.senderId;
    }
  },
  methods: {
    async fetchAuthor() {
      // TODO: PUT IN viex?
      let res = await fetch(`/rest/v1/users/${this.message.senderId}`);
      this.author = await res.json();
    },
    async markAsRead() {
      // Make put to db and update unread to 0(?)
      if (this.message.unread === 1 && !this.isOwnMessage) {
        let res = await fetch(`/rest/v1/messages/${this.message.id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ unread: 0 })
        });
        console.log(await res.json());
      }
    },
    async deletePost() {
      await fetch(`/rest/v1/messages/${this.message.id}`, {
        method: 'DELETE',
      });
      this.$parent.fetchMessages();
    }
  },
  created() {
    this.fetchAuthor();
    this.markAsRead();
  }
};
</script>

<style scoped>
.large-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
    margin-bottom: 20px;
  
}



.container {
  /* background-color: rgb(142, 160, 170); */
  background-color: rgb(77, 99, 109);
  width: 40vw;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  /* margin-bottom: 10px; */
  border: 2px solid black;
}

.own {
  justify-content: flex-end;
}

.own .container {
  /* background-color: rgb(150, 150, 211); */
  background-color: rgb(77, 77, 109);
  text-align: end;
}

.delete {
  margin: 5px;
  cursor: pointer;
}

.message {
  margin-top: 5px;
}

.arrow {
  width: 0;
  height: 0;
  margin: 0px;
  margin-top: -3px;
  position: relative;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  border-top: 20px solid rgb(77, 99, 109);
  transform: rotate(135deg);
}

.own .arrow {
  transform: rotate(225deg);
   border-top: 20px solid rgb(77, 77, 109);
}

.bottom {
  margin-left: 20px;
  margin-right: 20px;
}

.own .bottom {
  display: flex;
  justify-content: flex-end;
}

.read-status {
  font-size: 0.8em;
}

</style>