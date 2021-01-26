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
  height: 5%;
  bottom: 0;
  width: 100%;
  /* height: 100px; */
  /* background-color: yellow; */
  background-color: rgb(26, 33, 36);
  text-emphasis: center;
  border-top: solid rgb(17, 15, 37) 1px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>