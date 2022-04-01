/** Interface Component */
export const COMPONENT = {
  DEFAULT: () =>
    import(/* webpackChunkName: "chunk-main-component" */ "@/views/Index.vue"),
  TRANSAKSI: () =>
    import(/* webpackChunkName: "chunk-transaksi-view" */ "@/views/Transaksi.vue"),
  PERUSAHAAN: () =>
    import(/* webpackChunkName: "chunk-perusahaan-view" */ "@/views/Perusahaan.vue"),
  BARANG: () =>
    import(/* webpackChunkName: "chunk-barang-view" */ "@/views/Barang.vue"),
  LOGIN: () =>
    import(/* webpackChunkName: "chunk-login-view" */ "@/views/Login.vue"),
};
