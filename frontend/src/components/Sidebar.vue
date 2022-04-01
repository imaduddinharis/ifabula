<template>
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
        class="
          footer-item
          d-flex
          flex-column
          align-items-start
          justify-content-start
        "
      >
        <span class="small">&COPY; 2020 - {{ new Date().getFullYear() }}</span>
        <span class="small">{{ titleApp }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isLogin: {
      required: true,
    },
    titleApp: {
      required: true,
      type: String,
    },
    menu: {
      required: true,
      type: Array,
    },
    menuFooter: {
      required: true,
      type: Array,
    },
    toggleMenu: {
      type: Function,
      required: true,
    },
  },
  methods: {
    isActive: function (id) {
      if (this.$route.meta.active == id) {
        return "active";
      }
    },
    accountName: (name) => {
      let limit = 15;
      return name.length > limit ? `${name.substring(0, limit)}...` : name;
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
.side-navbar {
  height: 100%;
  position: fixed;
  background: rgba(var(--bs-primary-rgb), 1);
  transition: 0.5s;
  z-index: 3;
  color: #fff;
  font-weight: bold;
  padding: 16px;
  border-radius: 0 0.75rem 0.75rem 0;
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
.active-nav > .close-menu {
  right: -16px;
}
</style>
