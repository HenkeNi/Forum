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
  margin-bottom: 0px;
}

h2 {
  margin-bottom: 0px;
}

.form {
  width: 30%;
  height: 40%;
  /* padding: 20px 50px 50px; */
  background-color: rgb(186, 187, 183);
  /* background-color: rgb(47, 45, 58); */
  /* background-image: url("data:image/jpeg;base64,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"); */
  /* background: cover; */
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-flow: column wrap;
  text-align: center;
  border-radius: 5px;
  border: 2px solid black;
}

.buttons {
  padding-top: 15px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cancel {
  margin-top: 4px;
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

p {
  margin: 0px;
  padding-top: 5px;
  color: red;
}

</style>