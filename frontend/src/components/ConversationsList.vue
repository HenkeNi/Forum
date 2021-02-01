<template>
  <div>
    <ConversationsListItem 
    v-for="convID in convIDs"
    :key="convID.id"
    :convID="convID" />
  </div>
</template>

<script>
import ConversationsListItem from '../components/ConversationsListItem';

export default {
  props: ['convIDs'],
  components: {
    ConversationsListItem
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  created() {
    // console.log("Conver...", this.convIDs);
  },
}
</script>

<style scoped>

</style>