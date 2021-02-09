<template>
  <div class="quote-container">
    <h4 class="quote-header">{{ publishedDate }} - {{this.quotedAuthor.username}} wrote:</h4>
    <div>
      <h3>{{this.quote.message}}</h3>
      <h4 v-if="this.quote.isEdited === 1">(edited)</h4>
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
  computed: {
    publishedDate() {

      let publishedDate = new Date(this.quote.published_time);
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

      return (publishedDate.getDay() + " " + months[publishedDate.getMonth()] + ", " + publishedDate.getFullYear() + " at " + publishedDate.getHours() + ":" + publishedDate.getMinutes());        
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