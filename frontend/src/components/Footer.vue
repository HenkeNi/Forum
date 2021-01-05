<template>
  <div class="footer">
    <h4>@Batman</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      some: 1,
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  /* height: 100px; */
  background-color: yellow;
  text-emphasis: center;
  border-top: solid black 1px;
  display: flex;
  justify-content: center;
}
</style>