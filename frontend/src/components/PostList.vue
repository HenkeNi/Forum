<template>
  <div class="post-list">
    <!-- <NewPostModal :threadId="this.thread.id" v-model="newpostModalOpen"/> -->
    <PostListItem 
      v-for="post in posts"
      :key = "post.id"
      :post="post"
    />
    <!-- <h2 @click="newPost">+ Add new post</h2> -->
  </div>  
</template>

<script>
import PostListItem from './PostListItem.vue';
// import NewPostModal from './NewPostModal.vue';

export default {
   components: {
    PostListItem,
    // NewPostModal,
  },
  props: ['posts'],
  // props: ['thread', 'posts'],
  // data() {
  //   return {
  //     newpostModalOpen: false,
  //   }
  // },
  // methods: {
  //   newPost() {
  //     this.newpostModalOpen = !this.newpostModalOpen;
  //   },
  // },
}
</script>


<style scoped>

.post-list {
  top: 0px;
  /* height: 100vh; */
  background-color: gray;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-direction: column;
  margin-bottom: 60px;
}

</style>