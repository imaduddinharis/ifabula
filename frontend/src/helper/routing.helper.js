/** Abstract */
import { URL } from "./url.helper";
import { COMPONENT } from "./component.helper";
import { META } from "./meta.helper";

class RoutingHelper {
  route = [];
  constructor() {}
  parent(obj) {
    this.route.push(obj);
  }
  children(parent, children) {
    let index = this.route.findIndex((route) => route.parent === parent);
    this.route[index].children.push(children);
  }
  getRoute() {
    return this.route;
  }

  /** Init Default URL */
  initDefault() {
    let parent = "parentMain";
    let routingParent = {
      path: URL.DEFAULT,
      parent: parent,
      component: COMPONENT.DEFAULT,
      children: [],
    };
    this.parent(routingParent);

    let routingChildren = [
      {
        name: "TransaksiRouteIndex",
        path: URL.DEFAULT,
        component: COMPONENT.TRANSAKSI,
        meta: META.DEFAULT,
      },
      {
        name: "TransaksiRoute",
        path: URL.TRANSAKSI,
        component: COMPONENT.TRANSAKSI,
        meta: META.TRANSAKSI,
      },
      {
        name: "PerusahaanRoute",
        path: URL.PERUSAHAAN,
        component: COMPONENT.PERUSAHAAN,
        meta: META.PERUSAHAAN,
      },
      {
        name: "BarangRoute",
        path: URL.BARANG,
        component: COMPONENT.BARANG,
        meta: META.BARANG,
      },
    ];
    routingChildren.map((route) => {
      this.children(parent, route);
    });

    let routingLogin = {
      name: "LoginRoute",
      path: URL.LOGIN,
      component: COMPONENT.LOGIN,
      meta: META.LOGIN,
    };
    this.parent(routingLogin);
  }
}

export default RoutingHelper;
