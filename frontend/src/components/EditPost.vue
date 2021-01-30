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
 methods: {
   async updateMessage() {
     console.log("UPDATE");
    

   },
   cancel() {
     this.$parent.shouldEdit = false;
   }

 }, 
}
</script>

<style scoped>

</style>