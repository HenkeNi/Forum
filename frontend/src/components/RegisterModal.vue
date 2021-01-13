<template>
  <div class="modal" v-show="value">
    <div class="form">
      <h2 class="title">Register</h2>
      <form>
        <div class="input-fields">
          <input required type="email" id="reg-email" name="reg-email" placeholder="email" /><br/>
          <input required type="text" id="reg-username" name="reg-username" placeholder="username" /><br/>
          <input required type="password" id="reg-password" name="reg-password" placeholder="password"/><br/>  
        </div>
        <p v-show="failed">Registration failed!</p>
        <input type="submit" @click="register" value="Register" />      
        <button @click.prevent="close">Close</button>
      </form>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'Register-Modal',
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
    async register(e) {
      e.preventDefault();
      
      let user = await fetch('http://localhost:3000/rest/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: 
          JSON.stringify({ 
             "email": document.getElementById("reg-email").value, 
              "password": document.getElementById("reg-password").value,
              "username": document.getElementById("reg-username").value,
              "userRole": "member",
              "isActive": 1
          })
      });
      user = await user.json();

      if (!user) {
        console.log("Failed registration!");
        this.failed = true;
      } else {
        console.log("Registration success!", user);
        this.$store.dispatch('fetchCurrentUser');
        //this.$store.commit('setCurrentUser', user);
        this.$emit("input", !this.value);
      }
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

</style>