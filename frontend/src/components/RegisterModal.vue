<template>
  <div class="modal" v-show="value">
    <div class="form">
      <div class="title">
        <h2>Create Account</h2>
      </div>
      <div>
        <form>
          <div class="input-fields">
            <input type="email" id="reg-email" name="reg-email" placeholder="email" required/>
            <br />
            <input
              type="text"
              id="reg-username"
              name="reg-username"
              placeholder="username"
              required
            />
            <br />
            <input
              type="password"
              id="reg-password"
              name="reg-password"
              minlength="8"
              placeholder="password"
              required
            />
            <br />
          </div>
          <p v-show="failed">Registration failed!</p>
          <div class="buttons">
        <button class="register" @click="register" type="submit" value="Register">Register</button>
        <h4 class="cancel" @click.prevent="close">Cancel</h4>
      </div>
        </form>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Register-Modal",
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      failed: false
    };
  },
  methods: {
    close() {
      this.clearFields();
      this.failed = false;
      this.$emit("input", !this.value);
    },
    async register(e) {
      e.preventDefault();

      let res = await this.$store.dispatch("registerUser", {
        email:    document.getElementById("reg-email").value,
        password: document.getElementById("reg-password").value,
        username: document.getElementById("reg-username").value,
      });
      if (res.error) { this.failed = true; }
      if (res) { this.close(); }
    },
    clearFields() {
      document.getElementById("reg-email").value = "";
      document.getElementById("reg-password").value = "";
      document.getElementById("reg-username").value = "";
    }
  }
};
</script>

<style scoped>
.modal {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  text-decoration: underline;
}

.form {
  width: 30%;
  height: 40%;
  /* padding: 20px 50px 50px; */
  background-color: rgb(186, 187, 183);
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-flow: column wrap;
  text-align: center;
  border-radius: 5px;
  border: 2px solid black;
}

.buttons {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cancel {
  cursor: pointer;
}

.register {
  width: 100%;
  height: 30px;
  border: 2px solid white;
  background-color: rgb(26, 33, 36);
  color: white;
}

.input-fields {
  /* padding-bottom: 30px; */
}

.input-fields input {
  width: 100%;
  /* border: none; */
  /* border-bottom: 2px solid black; */
  /* background-color: rgb(186, 187, 183); */
}
</style>