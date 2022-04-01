<template>
  <div id="main-component">
    <div
      class="alert alert-light network-alert"
      :class="isConnected == false ? 'show' : ''"
      role="alert"
    >
      Reconnecting <img src="@/assets/loading.svg" alt="" />
    </div>
    <div class="side-navbar container d-flex flex-column" id="sidebar">
      <a class="close-menu" href="javascript:;" @click="toggleMenu()">
        <i class="fas fa-chevron-left"></i>
      </a>
      <div class="sidebar-header">
        <div class="sidebar-header-container">
          <div class="logo-sidebar"></div>
          <div class="text-sidebar">
            <span class="h6 mb-0">Karakter Indonesia</span>
          </div>
        </div>
        <hr class="bg-light" />
      </div>
      <div class="sidebar-profile" v-if="isLogin">
        <div class="sidebar-header-container">
          <div class="avatar-sidebar"></div>
          <div class="text-avatar">
            <span
              class="small"
              v-text="accountName('Imaduddin Haris Nasution')"
            ></span>
          </div>
        </div>
      </div>
      <div class="sidebar-profile" v-else>
        <div class="sidebar-header-container">
          <div class="avatar-sidebar"></div>
          <div class="text-avatar">
            <span class="small"> Login </span>
          </div>
        </div>
      </div>
      <div class="sidebar-menu">
        <!-- Menu Section 1 -->
        <router-link
          v-for="(menus, index) of menu"
          :key="index"
          :to="menus.path"
          class="menu"
          :class="isActive(menus.meta.id)"
          @click="toggleMenu()"
        >
          <span class="icon"> <i :class="menus.meta.icon"></i> </span>
          <span>{{ menus.meta.dn }}</span>
        </router-link>

        <div class="px-2 mt-3 w-100">
          <hr class="bg-light w-100" />
        </div>

        <!-- Menu Section 2 -->
        <router-link
          v-for="(menus, index) of menuFooter"
          :key="index"
          :to="menus.path"
          class="menu"
          :class="isActive(menus.meta.id)"
          @click="toggleMenu()"
        >
          <span class="icon"> <i :class="menus.meta.icon"></i> </span>
          <span>{{ menus.meta.dn }}</span>
        </router-link>

        <div class="px-2 mt-2 w-100">
          <hr class="bg-light w-100" />
        </div>

        <!-- Menu Footer -->
        <div
          class="footer-item d-flex flex-column align-items-start justify-content-start"
        >
          <span class="small"
            >&COPY; 2020 - {{ new Date().getFullYear() }}</span
          >
          <span class="small">{{ titleApp }}</span>
        </div>
      </div>
    </div>

    <!-- Page Container -->
    <div class="my-container">
      <!-- appbar -->
      <nav class="container navbar navbar-light bg-light fixed-top" id="appbar">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-start align-items-center">
            <a class="toggle-menu" href="javascript:;" @click="toggleMenu()">
              <i class="fas fa-bars"></i>
            </a>
            <strong>{{ this.$route.meta.dn }}</strong>
          </div>
          <a href="javascript:;" class="text-dark appbar-button" v-if="isLogin">
            <i class="fas fa-bell"></i>
          </a>
          <a
            href="javascript:;"
            class="btn appbar-button btn-primary btn-sm mb-0"
            @click="clickModalLogin()"
            v-else
          >
            Masuk
            <i class="fas fa-sign-in-alt"></i>
          </a>
        </div>
      </nav>
      <!-- end appbar -->
      <!-- main content -->
      <div class="container" id="content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
      <!-- end main content -->
    </div>

    <!-- modal login -->
    <div
      class="modal fade"
      id="modalLogin"
      tabindex="-1"
      aria-labelledby="modalLoginLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div
            class="modal-header d-flex flex-column justify-content-center align-items-center"
          >
            <img src="@/assets/logo-full.png" class="logo-modal-top" alt="" />
          </div>
          <form v-on:submit.prevent="submitLogin()" id="form-login">
            <div class="modal-body">
              <span class="small text-muted"
                >Silahkan masuk menggunakan username dan password kamu:</span
              >
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control needs-validation"
                  id="username"
                  placeholder="cth: @karin123"
                  v-model="models.login.username"
                  required
                />
                <div class="invalid-feedback">invalid username</div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control needs-validation"
                  id="password"
                  v-model="models.login.password"
                  placeholder="*********"
                  required
                />
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-3">
              <div
                class="d-flex flex-column align-items-start justify-content-start"
              >
                <a href="javascript:;" class="small" @click="clickForgot()"
                  >forgot password?</a
                >
                <a
                  href="javascript:;"
                  class="small"
                  @click="clickModalRegister()"
                  >don't have an account?</a
                >
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-default"
                  @click="modalLogin.hide()"
                >
                  Kembali
                </button>
                <img
                  src="@/assets/loading.svg"
                  class="loading-btn-sm"
                  alt=""
                  v-if="loading.login"
                />
                <button
                  type="submit"
                  class="btn btn-sm btn-outline-primary"
                  v-else
                >
                  Masuk
                  <i class="fas fa-sign-in-alt"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- end modal login -->

    <!-- modal register -->
    <div
      class="modal fade"
      id="modalRegister"
      tabindex="-1"
      aria-labelledby="modalRegisterLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div
            class="modal-header d-flex flex-column justify-content-center align-items-center"
          >
            <img src="@/assets/logo-full.png" class="logo-modal-top" alt="" />
          </div>
          <form v-on:submit.prevent="submitRegister()" id="form-register">
            <div class="modal-body">
              <span class="small text-muted">
                Silahkan isi data dengan benar untuk melakukan pendaftaran akun:
              </span>
              <!-- Personal Info -->
              <div class="mb-3">
                <label for="fullname" class="form-label required"
                  >Nama Lengkap</label
                >
                <input
                  type="text"
                  class="form-control needs-validation"
                  id="fullname"
                  placeholder="cth: John Doe"
                  v-model="models.register.fullname"
                  required
                />
                <div class="invalid-feedback">invalid username</div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label required">Email</label>
                <input
                  type="email"
                  class="form-control needs-validation"
                  id="email"
                  placeholder="cth: johndoe@example.com"
                  v-model="models.register.email"
                  required
                />
                <div class="invalid-feedback">alamat email telah digunakan</div>
              </div>
              <div class="mb-3">
                <label for="birthday" class="form-label required"
                  >Tanggal Lahir</label
                >
                <input
                  type="date"
                  class="form-control needs-validation"
                  id="birthday"
                  v-model="models.register.birthday"
                  :max="yearThreshold"
                  required
                />
                <div class="invalid-feedback">minimal usia 10 tahun</div>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label optional"
                  >Alamat Lengkap</label
                >
                <textarea
                  type="date"
                  class="form-control needs-validation"
                  id="address"
                  placeholder="cth: Jalan ABC, Kota DEF, Provinsi XYZ"
                  v-model="models.register.address"
                  :max="yearThreshold"
                ></textarea>
                <div class="invalid-feedback">minimal usia 10 tahun</div>
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label required"
                  >Jenis Kelamin</label
                >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderMale"
                    v-model="models.register.gender"
                    value="Pria"
                    checked
                  />
                  <label class="form-check-label" for="genderMale">
                    Pria
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderFemale"
                    v-model="models.register.gender"
                    value="Wanita"
                  />
                  <label class="form-check-label" for="genderFemale">
                    Wanita
                  </label>
                </div>
              </div>
              <!-- End Personal Info -->
              <!-- Account Info -->
              <span class="small text-muted">
                Informasi akun untuk penggunaan saat login:
              </span>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control needs-validation"
                  id="username"
                  placeholder="cth: @karin123"
                  v-model="models.register.username"
                  required
                />
                <div class="invalid-feedback">invalid username</div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control needs-validation"
                  id="password"
                  v-model="models.register.password"
                  placeholder="*********"
                  required
                />
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-3">
              <div
                class="d-flex flex-column align-items-start justify-content-start"
              ></div>
              <div>
                <button
                  type="button"
                  @click="clickModalLogin()"
                  class="btn btn-sm btn-default"
                >
                  Kembali
                </button>
                <img
                  src="@/assets/loading.svg"
                  class="loading-btn-sm"
                  alt=""
                  v-if="loading.register"
                />
                <button
                  type="submit"
                  class="btn btn-sm btn-outline-primary"
                  v-else
                >
                  Register
                  <i class="fas fa-user-plus"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- end modal login -->
  </div>
</template>
<script>
import { Auth } from "@/models";
export default {
  name: "MainComponent",
  data() {
    return {
      titleApp: process.env.VUE_APP_TITLE,
      isLogin: Auth.isLogin,
      yearThreshold: new Date(
        new Date().setFullYear(new Date().getFullYear() - 10)
      )
        .toISOString()
        .slice(0, 10),
      menu: [],
      menuFooter: [],
      title: this.$route.meta.dn,
      models: {
        login: {},
        register: {},
      },
      loading: {
        login: false,
        register: false,
      },
      modalLogin: undefined,
      mdoalRegister: undefined,
      isConnected: this.$store.state.socket.isConnected,
    };
  },
  methods: {
    toggleMenu: () => {
      var sidebar = document.querySelector("#sidebar");
      var container = document.querySelector(".my-container");
      var component = document.querySelector("#main-component");
      sidebar.classList.toggle("active-nav");
      container.classList.toggle("active-cont");
      component.classList.toggle("side-open");
    },
    isActive: function (id) {
      if (this.$route.meta.active == id) {
        return "active";
      }
    },
    accountName: (name) => {
      let limit = 15;
      return name.length > limit ? `${name.substring(0, limit)}...` : name;
    },
    // login
    clickModalLogin: function () {
      this.modalRegister.hide();
      this.modalLogin.show();
    },
    submitLogin: function () {
      let that = this;
      that.loading.login = true;
    },
    // end login
    clickModalRegister: function () {
      this.modalLogin.hide();
      this.modalRegister.show();
    },
    submitRegister: function () {},
    // forgot
    clickForgot: function () {},
  },
  created() {
    let menuRouting = [];
    let that = this;
    this.$router.options.routes.map((item) => {
      menuRouting = [...menuRouting, ...item.children];
    });
    this.menu = menuRouting.filter((item) => {
      return item.meta.menu === true;
    });
    this.menuFooter = menuRouting.filter((item) => {
      return item.meta.footers === true;
    });
    this.$nextTick(function () {
      let appbar = document.getElementById("appbar");
      let appbarHeight = appbar.offsetHeight;
      let wrapperHeight = screen.height - 3.5 * appbarHeight;
      let content = document.getElementById("content-wrapper");
      content.style.minHeight = `${wrapperHeight}px`;
      content.style.marginTop = `${appbarHeight}px`;

      /** Init Modal */
      const bootstrap = require("bootstrap");
      let options = {
        backdrop: "static",
        focus: true,
      };
      that.modalLogin = new bootstrap.Modal(
        document.getElementById("modalLogin"),
        options
      );
      that.modalRegister = new bootstrap.Modal(
        document.getElementById("modalRegister"),
        options
      );
      /** End Init Modal */
    });
    document.title = `${process.env.VUE_APP_TITLE} | ${this.$route.meta.dn}`;
  },
  mounted() {},
  watch: {
    $route: function () {
      let that = this;
      if (this.$route.params.login) {
        this.$nextTick(function () {
          that.clickModalLogin();
        });
      }
      document.title = `${process.env.VUE_APP_TITLE} | ${this.$route.meta.dn}`;
    },
    "modalLogin._isShown": function () {
      if (!this.modalLogin._isShown) {
        if (this.$route.params.login) {
          delete this.$route.params.login;
          delete this.$route.params.redir;
        }
      }
    },
    "$store.state.socket.isConnected": function () {
      this.isConnected = this.$store.state.socket.isConnected;
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 576px) {
  .side-navbar {
    width: 60vw;
    margin-left: -61vw;
  }
}
@media only screen and (min-width: 576.1px) {
  .side-navbar {
    width: 30vw;
    margin-left: -31vw;
  }
}

.active-cont #content-wrapper {
  touch-action: none;
  overflow: hidden;
}
.side-navbar {
  /* height: calc(100% - 16px); */
  height: 100%;
  position: fixed;
  background: rgba(var(--bs-primary-rgb), 1);
  transition: 0.5s;
  z-index: 3;
  color: #fff;
  font-weight: bold;
  padding: 16px;
  border-radius: 0 0.75rem 0.75rem 0;
  /* margin-top: 8px;
  margin-bottom: 8px; */
}
.nav-link:active,
.nav-link:focus,
.nav-link:hover {
  background-color: #ffffff26;
}
.navbar {
  z-index: 1;
}
.my-container {
  transition: 0.5s;
}
#main-component {
  /* width:100vw; */
  overflow-x: hidden;
}
.active-nav {
  margin-left: 0;
}

.btn:active,
.btn:focus {
  outline: unset;
  box-shadow: unset;
}

.sidebar-header,
.sidebar-profile {
  padding: 8px;
}
.avatar-sidebar,
.logo-sidebar {
  height: 32px;
  width: 32px;
  border-radius: 100%;
  background: rgba(var(--bs-light-rgb), 0.8);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.sidebar-profile {
  background: rgba(var(--bs-light-rgb), 0.2);
  border-radius: 0.25rem;
  margin-bottom: 24px;
}
.logo-sidebar {
  background-image: url("../assets/logo-small.png");
}
.sidebar-header-container {
  display: flex;
  align-items: center;
  gap: 16px;
}
.text-sidebar,
.text-avatar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sidebar-menu {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  scrollbar-face-color: var(--bs-primary); /* Firefox 63 compatibility */
  scrollbar-track-color: rgb(175, 175, 175); /* Firefox 63 compatibility */
  scrollbar-color: rgb(175, 175, 175) var(--bs-primary);
  scrollbar-width: thin;
}

.sidebar-menu::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.sidebar-menu::-webkit-scrollbar-track {
  background: var(--bs-primary);
}

/* Handle */
.sidebar-menu::-webkit-scrollbar-thumb {
  background: rgb(175, 175, 175);
}

/* Handle on hover */
.sidebar-menu::-webkit-scrollbar-thumb:hover {
  background: rgb(175, 175, 175);
}

.menu {
  width: 100%;
  margin: 4px 0;
  padding: 12px;
  text-decoration: none;
  color: var(--bs-light);
  text-align: left;
  transition: 0.15s;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.8625rem;
  border-radius: 0 0.75rem 0.75rem 0;
}
.menu.active {
  /* border-radius:12px 0 0 12px; */
  background: rgba(var(--bs-dark-rgb), 0.5);
}
.toggle-menu {
  background: var(--bs-primary);
  color: var(--bs-light);
  padding: 4px 12px 4px 12px;
  margin: 0 8px 0 0;
  border-radius: 0.25rem;
}
.navbar {
  border-top: 4px solid var(--bs-primary);
  z-index: 2;
}
#content-wrapper {
  background: #f4f4f4;
}
.icon {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  background: rgba(var(--bs-dark-rgb), 0.2);
  border-radius: 100%;
  border: 2px solid rgba(var(--bs-darkrgb), 0.5);
}
.icon i {
  font-size: 0.75rem;
}
.close-menu {
  position: absolute;
  right: 0;
  background: var(--bs-light);
  color: var(--bs-primary);
  width: 32px;
  height: 32px;
  padding: 4px 4px;
  border-radius: 100%;
  border: 4px solid var(--bs-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: 0.5s;
}
.active-nav .close-menu {
  right: -16px;
}
.logo-modal-top {
  height: 3rem;
}
.network-alert {
  position: fixed;
  z-index: 4;
  top: -10vh;
  width: calc(100% - 1.5rem);
  margin: 0.75rem;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
}
.network-alert img {
  height: 2rem;
}
.network-alert.show {
  top: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
