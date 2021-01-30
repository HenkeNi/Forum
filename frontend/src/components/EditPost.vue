<template>
<div>
  <textarea class="textarea" id="edit-message" type="text" name="edit-message" placeholder="Enter new message..." cols="40" rows="5" required></textarea>
  <div>
    <button @click="updateMessage">Update</button>
    <button @click="cancel">Cancel</button>
  </div>
</div>
</template>


<script>
export default {
  props: ['post'],
  methods: {
    async updateMessage() {
      console.log(this.post)
      await fetch(`/rest/v1/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          id: this.post.id,
          message: document.getElementById("edit-message").value, 
          userId: this.post.userId,
        })
      });
      // res = await res.json();      
      this.$parent.fetchPostsInParent();
      this.cancel();
   },
   cancel() {
     document.getElementById("edit-message").value = "";
     this.$parent.shouldEdit = false;
   }

 }, 
}
</script>

<style scoped>

</style>