<template>
  <div id="main-component">
    <div class="container">
      <div id="appBar">
        <div class="container">
          <span class="h5">{{ $route.meta.dn }}</span>
        </div>
      </div>
      <div id="contentWrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
      <div id="bottomNavBar">
        <div class="container d-flex justify-content-between">
          <div
            class="bottom-nav-item"
            :class="isActive(menu.active) ? 'active' : ''"
            v-for="menu of menus"
            :key="menu.id"
            @click="$router.push(menu.route)"
          >
            <i :class="menu.icon"></i>
            <span class="title"> {{ menu.name }} </span>
          </div>
          <div class="bottom-nav-item" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="title"> Logout </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MainComponent",
  component: {},
  setup() {
    const { BG, LOGO, LOADING } = require("@/helper/assets.helper");
    const CryptoJS = require("crypto-js");
    const loginStorageKey = CryptoJS.MD5(
      process.env.VUE_APP_STORAGE_KEY_LOGIN
    ).toString();
    return { BG, LOGO, LOADING, CryptoJS, loginStorageKey };
  },
  data() {
    return {
      menus: [
        {
          id: 1,
          name: "Transaksi",
          icon: "fas fa-chart-bar",
          active: "transaksi",
          route: {
            name: "TransaksiRoute",
          },
        },
        {
          id: 2,
          name: "Barang",
          icon: "fas fa-box",
          active: "barang",
          route: {
            name: "BarangRoute",
          },
        },
        {
          id: 3,
          name: "Perusahaan",
          active: "perusahaan",
          icon: "fas fa-building",
          route: {
            name: "PerusahaanRoute",
          },
        },
      ],
    };
  },
  methods: {
    isActive: function (active) {
      return this.$route.meta.active == active;
    },
    logout: function () {
      localStorage.removeItem(this.loginStorageKey);
      this.$router.push("/login");
    },
  },
  created() {
    document.title = `${process.env.VUE_APP_TITLE} | ${this.$route.meta.dn}`;
  },
  mounted() {},
  watch: {},
};
</script>

<style scoped>
#appBar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: white;
  z-index: 2;
}
#appBar .container {
  height: 5ch;
  background: var(--bs-primary);
  color: white;
  padding: 1ch;
  border-radius: 0 0 0.25rem 0.25rem;
}
@media (max-width: 575.98px) {
  .container {
    padding: unset;
  }
}

.container {
  padding: unset;
}

#contentWrapper {
  margin-bottom: 10ch;
  margin-top: 5ch;
}
#bottomNavBar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 4px;
  background: white;
}
.bottom-nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  color: black;
  cursor: pointer;
}
.bottom-nav-item.active {
  background: var(--bs-primary);
  color: white;
  border-radius: 0.25rem;
}
</style>
