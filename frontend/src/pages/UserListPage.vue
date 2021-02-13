<template>
  <div>

    <h2>Search</h2>
    <input type="text" placeholder="enter username"/>
    <h2>Users:</h2>
        <h2>Name Email UserRole isRapported Warnings</h2>
    



    <div class="dropdown">
      <h2 class="drop-btn">Sort</h2>
      <div class="drop-items">
        <h3 @click="setSorting('role')">userrole</h3>
        <h3 @click="setSorting('az')">A-Z</h3>
        <!-- <h3 @click="setSorting('rapported')">Rapported</h3> -->
      </div>
    </div>

    <div class="list">   
             <UserList  :sort="sort" />
    </div>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';

export default {
  components: {
    UserList
  },
  data() {
    return {
      sort: "normal",
    }
  },
  methods: {
    setSorting(property) {
      this.sort = property;
    },
    searchUser() {

    }

  },
}
</script>


<style scoped>
.list {
  display: flex;
  justify-content: center;
}





.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.drop-btn {
  background-color: antiquewhite;
  color: black;
}



.drop-items {
  display: none;
  position: absolute;
  background-color  : blue;
  z-index: 1;
  min-width: 160px;
}

.drop-items h3 {
  display: block;
}

.dropdown:hover .drop-items {
  display: block;
}

</style>