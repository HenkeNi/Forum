<template>
  <div>
    <h2 class="title">{{ user.username }}</h2>
    <div >
      <h3 @click="deleteUser">DELETE</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    async deleteUser() {
      console.log("DELETING USER");

      let res = await fetch(`http://localhost:3000/rest/deleteusers/${this.user.id}`, {
        method: 'DELETE'
      });
      res = await res.json();
      console.log(res);

    }
  },

  // TODO: if current user == admin -> radera användare || gör användare till moderator...
}
</script>

<style scoped>

.title {
  text-align: center;
  text-decoration: underline;
}

</style>