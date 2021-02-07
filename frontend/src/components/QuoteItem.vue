<template>
  <div class="quote-container">
    <h4 class="quote-header">at dd-mm-yy at hh:mm {{this.quotedAuthor.username}} wrote:</h4>
    <div>
      <h3>{{this.quote.message}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['quote'],
  data() {
    return {
      quotedAuthor: Object,
    }
  },
  methods: {
    async fetchQuoteAuthor() {
      let res = await fetch(`/rest/v1/users/${this.quote.userId}`); 
      this.quotedAuthor = await res.json();
    }
  },
  created() {
    this.fetchQuoteAuthor();
  },
}
</script>

<style scoped>
.quote-container {
    background-color: rgb(122, 103, 110);
}

.quote-header {
  background-color: rgb(56, 37, 44);
}

</style>