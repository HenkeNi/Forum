<template>
  <div class="list">
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
}
</script>

<style scoped>

.list {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
}

</style>