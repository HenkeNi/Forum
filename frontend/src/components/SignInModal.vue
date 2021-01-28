<template>
  <div class="modal" v-show="value">
    <div class="form">
      <h2 class="title">Sign In</h2>
      <form>
        <div class="input-fields">
          <input required type="email" id="email" name="email" placeholder="email" />
          <br />
          <input required type="password" id="password" name="password" placeholder="password" />
          <br />
        </div>

        <p class="warning" v-show="failed">Wrong email or password!</p>
      </form>
      <div class="buttons">
        <input type="submit" @click="login" value="Login" />
        <button @click.prevent="close">Close</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SignIn-Modal",
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
    async login(e) {
      e.preventDefault();

      let user = await this.$store.dispatch("signInUser", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });

      if (!user) {
        console.log("Login attempt failed!");
        this.failed = true;
      } else {
        this.close();
      }
    },
    clearFields() {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
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

.input-fields {
  padding-bottom: 30px;
}

.input-fields input {
  width: 100%;
}

.warning {
  color: red;
}

.buttons {
  padding-bottom: 40px;
}
</style>