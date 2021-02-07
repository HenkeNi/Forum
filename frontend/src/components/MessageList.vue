<template>
  <div class="list">
    <h2>Conversation:</h2>
    <MessageListItem 
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script>
import MessageListItem from '../components/MessageListItem';

export default {
  components: {
    MessageListItem
  },
  props: ['messages'],
  
}
</script>

<style scoped>
.list {
  margin-top: 30px;
  padding: 10px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;  
    background-color: rgb(54, 62, 65);
  /* background-color: rgb(76, 76, 136); */
  border: 2px solid black;
  /* height: 100px; */
  /* height: 300px; */
  /* height: 500px; */
  overflow-y: scroll;
}

</style>