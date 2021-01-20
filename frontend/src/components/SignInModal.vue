<template>
  <div class="modal" v-show="value">
    <div class="form">
      <h2 class="title">Sign In</h2>
      <form>
        <div class="input-fields">
          <input required type="email" id="email" name="email" placeholder="email"/><br/>
          <input required type="password" id="password" name="password" placeholder="password"/><br/>  
        </div>
        <input type="submit" @click="login" value="Login" />      
        <button @click.prevent="close">Close</button>
        <p class="warning" v-show="failed">Wrong email or password!</p>
      </form>
    </div>
  </div>  
</template>


<script>
export default {
  name: 'SignIn-Modal',
  props: {
    value: {
      required: true,
    }
  },
  data() {
    return {
      failed: false,
    }
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
    },
    async login(e) { // TODO: put in store??
      e.preventDefault();

      let user = await fetch('/rest/v1/login', {
       method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: 
          JSON.stringify({ "email": document.getElementById("email").value, "password": document.getElementById("password").value})
      });
      user = await user.json();
      
      if (!user) {
        this.failed = true;
      } else {
        console.log("Successfully logged in with:\n", user);
        this.clearFields();
        this.$store.commit('setCurrentUser', user);
        this.$emit("input", !this.value);
      }
    },
    clearFields() {
        document.getElementById("email").value = "";
    }
  },
}
</script>


<style scoped>

.modal {
  position: absolute;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;  
  align-items: center;
}

.title {
  text-decoration: underline;
}

.form {
  width: 40%;
  height: 30%;
  /* padding: 20px 50px 50px; */
  background-color: rgb(186, 187, 183);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: column wrap;
  text-align: center;
}



.input-fields {
  padding-bottom: 30px;
}

.input-fields input {
  width: 100%;
}

.warning {
  color: red;
}

</style>