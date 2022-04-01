import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "@/models";
import { default as RoutingHelper } from "@/helper/routing.helper";

let routeHelper = new RoutingHelper();
/** override default routing */
routeHelper.initDefault();

const routes = routeHelper.getRoute();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedin = Auth.isLogin();
  // const loggedin = true;
  
  if (to.meta.authRequired && loggedin) {
    next();
  } else if (to.meta.authRequired && !loggedin) {
    next('/login');
  } else if (to.path == '/login' && loggedin) {
    next('/');
  } else {
    next();
  }
});

export default router;
