<template>
  <div id="loginComponent">
    <div class="bg" :style="`background-image:url(${BG})`"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-4 mx-auto mt-5">
          <div class="card" id="loginCard">
            <div class="card-body d-flex flex-column">
              <img
                :src="LOGO"
                alt="Logo Image"
                class="img-fluid logo-login align-self-center"
              />
              <div
                class="alert alert-danger"
                role="alert"
                v-if="err.length > 0"
              >
                {{ err[0] }}
              </div>
              <form id="formLogin" v-on:submit.prevent="clickLogin">
                <div class="form-group">
                  <label for="usernameInput">Username</label>

                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      type="text"
                      class="form-control"
                      id="usernameInput"
                      aria-describedby="usernameHelp"
                      v-model="loginModel.username"
                      @keyup="formHandler"
                    />
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i
                          class="fas fa-user text-primary"
                          style="line-height: unset"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="passwordInput">Password</label>

                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      type="password"
                      class="form-control"
                      id="passwordInput"
                      v-model="loginModel.password"
                      @keyup="formHandler"
                    />
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i
                          class="fas fa-lock text-primary"
                          style="line-height: unset"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  :src="LOADING"
                  alt="Loading ..."
                  class="loading-login"
                  v-if="loading.login"
                />
                <button type="submit" class="btn btn-primary" v-else>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Auth } from "@/models/auth.model";
export default {
  name: "Login",
  setup() {
    const { BG, LOGO, LOADING } = require("@/helper/assets.helper");
    const CryptoJS = require("crypto-js");
    const loginStorageKey = CryptoJS.MD5(
      process.env.VUE_APP_STORAGE_KEY_LOGIN
    ).toString();
    return { BG, LOGO, LOADING, CryptoJS, loginStorageKey };
  },
  data: () => ({
    loading: {
      login: false,
    },
    loginModel: {},
    err: [],
  }),
  methods: {
    clickLogin: function () {
      this.loading.login = true;
      const data = this.loginModel;
      Auth.login(data)
        .then((result) => {
          if (result.total > 0) {
            localStorage.setItem(
              this.loginStorageKey,
              JSON.stringify([
                {
                  username: this.loginModel.username,
                },
              ])
            );
            let self = this;
            setTimeout(function () {
              self.$router.push("/");
            }, 1000);
          } else {
            this.err[0] = result.msg;
            this.loading.login = false;
          }
        })
        .catch((err) => {
          this.loading.login = false;
          this.err[0] = err;
          console.log(err);
        });
    },
    formHandler: function () {
      this.err = [];
    },
  },
  created() {
    document.title = `${process.env.VUE_APP_TITLE} | ${this.$route.meta.dn}`;
  },
};
</script>
<style scoped>
.bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
}
.logo-login {
  width: 10ch;
}
#formLogin {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  gap: 8px;
  display: flex;
  flex-direction: column;
}
.loading-login {
  height: 5ch;
}
</style>