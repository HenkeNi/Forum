<template>
  <div class="modal" v-show="value">
    <div class="form">
      <div class="title">
        <h2>Register</h2>
      </div>
      <div>
        <form>
          <div class="input-fields">
            <input required type="email" id="reg-email" name="reg-email" placeholder="email" />
            <br />
            <input
              required
              type="text"
              id="reg-username"
              name="reg-username"
              placeholder="username"
            />
            <br />
            <input
              required
              type="password"
              id="reg-password"
              name="reg-password"
              minlength="8"
              placeholder="password"
            />
            <br />
          </div>
          <p v-show="failed">Registration failed!</p>
        </form>
      </div>
      <div class="buttons">
        <input type="submit" @click="register" value="Register" />
        <button @click.prevent="close">Close</button>
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
      this.$emit("input", !this.value);
    },
    async register(e) {
      e.preventDefault();

      let user = await fetch("/rest/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: document.getElementById("reg-email").value,
          password: document.getElementById("reg-password").value,
          username: document.getElementById("reg-username").value,
          userRole: "member",
          isActive: 1
        })
      });
      user = await user.json();

      if (!user) {
        console.log("Failed registration!");
        this.failed = true;
      } else {
        console.log("Registration success!", user);
        this.$store.dispatch("fetchCurrentUser");
        //this.$store.commit('setCurrentUser', user);
        this.$emit("input", !this.value);
      }
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
  width: 40%;
  height: 50%;
  /* padding: 20px 50px 50px; */
  background-color: rgb(186, 187, 183);
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-flow: column wrap;
  text-align: center;
  border-radius: 5px;
}

.buttons {
  padding-bottom: 30px;
}

.input-fields {
  padding-bottom: 30px;
}

.input-fields input {
  width: 100%;
  border: none;
  border-bottom: 2px solid black;
  background-color: rgb(186, 187, 183);
}
</style>