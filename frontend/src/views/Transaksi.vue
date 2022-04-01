<template>
  <div id="transaksi" class="d-flex flex-column">
    <div class="p-3">
      <button
        class="btn btn-sm btn-primary float-end"
        @click="modalTambah.show()"
      >
        Tambah
      </button>
      <button class="btn btn-sm btn-success float-end me-3" @click="download">
        <i class="fas fa-download"></i>
      </button>
    </div>
    <div class="d-flex justify-content-center" v-if="loading.transaksi">
      <img :src="LOADING" alt="Loading ..." class="loading-tambah" />
    </div>
    <div
      class="text-center"
      v-else-if="transaksi.length == 0 && !loading.transaksi"
    >
      <h5 class="text-muted">belum ada transaksi</h5>
    </div>
    <div
      class="accordion accordion-flush"
      id="accordionFlush"
      v-else-if="transaksi.length > 0 && !transaksi.barang"
    >
      <div class="accordion-item" v-for="item of transaksi" :key="item.id">
        <h2 class="accordion-header" :id="`flush-heading${item.id}`">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#flush-collapse${item.id}`"
            aria-expanded="false"
            :aria-controls="`flush-collapse${item.id}`"
          >
            {{ item.nama_barang }}
          </button>
        </h2>
        <div
          :id="`flush-collapse${item.id}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`flush-heading${item.id}`"
          data-bs-parent="#accordionFlush"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Kode Barang</small>
                <small>{{ item.kode_barang }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Nama Barang</small>
                <small>{{ item.nama_barang }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Harga Barang</small>
                <small>{{ item.harga_barang }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Sisa Stock</small>
                <small>{{ item.sisa_stock }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Kode Perusahaan</small>
                <small>{{ item.kode_perusahaan }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Nama Perusahaan</small>
                <small>{{ item.nama_perusahaan }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">
                  dibuat tanggal : {{ item.created_at }}
                </small>
                <small class="text-muted">
                  <em
                    >*) data perusahaan, barang, dan sisa stock merupakan data
                    saat transaksi dibuat</em
                  >
                </small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div
      class="modal fade"
      id="tambahTransaksi"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="tambahTransaksiLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tambahTransaksiLabel">
              Tambah Transaksi
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-if="err.length > 0">
              {{ err[0] }}
            </div>
            <form v-on:submit.prevent="submitTambah">
              <div class="mb-3">
                <label for="perusahaanSelect" class="form-label required">
                  Perusahaan
                </label>
                <select
                  id="perusahaanSelect"
                  class="form-select"
                  aria-label="Default select example"
                  @change="formHandler"
                  v-model="transaksiModel.kode_perusahaan"
                  required
                >
                  <option value="">Pilih Satu</option>
                  <option
                    :value="item.kode_perusahaan"
                    v-for="item of perusahaan"
                    :key="item.kode_perusahaan"
                  >
                    {{ item.nama_perusahaan }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="barangSelect" class="form-label required">
                  Barang
                </label>
                <select
                  id="barangSelect"
                  class="form-select"
                  aria-label="Default select example"
                  @change="formHandler"
                  v-model="transaksiModel.kode_barang"
                  required
                >
                  <option value="">Pilih Satu</option>
                  <option
                    :value="item.id"
                    v-for="item of barang"
                    :key="item.id"
                  >
                    {{ item.nama }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="stockInput" class="form-label required">
                  Total Barang
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="stockInput"
                  v-model="transaksiModel.total_barang"
                  min="1"
                  @keyup="formHandler"
                  required
                />
              </div>
              <div class="d-flex justify-content-center" v-if="loading.tambah">
                <img :src="LOADING" alt="Loading ..." class="loading-tambah" />
              </div>
              <div class="d-flex justify-content-end gap-2" v-else>
                <button
                  type="button"
                  class="btn btn-sm btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-sm btn-primary">
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Barang, Transaksi, Perusahaan } from "@/models";
export default {
  name: "Barang",
  setup() {
    const { LOADING } = require("@/helper/assets.helper");
    return { LOADING };
  },
  data() {
    return {
      barang: [],
      perusahaan: [],
      transaksi: [],
      transaksiModel: {
        kode_barang: "",
        kode_perusahaan: "",
        total_barang: 1,
      },
      loading: {
        tambah: false,
        update: false,
        transaksi: false,
      },
      err: [],
      modalTambah: undefined,
      modalUpdate: undefined,
    };
  },
  methods: {
    getBarang: function () {
      Barang.getList()
        .then(() => {
          this.barang = Barang.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPerusahaan: function () {
      Perusahaan.getList()
        .then(() => {
          this.perusahaan = Perusahaan.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList: function () {
      this.loading.transaksi = true;
      Transaksi.getList()
        .then(() => {
          this.transaksi = Transaksi.list;
          this.loading.transaksi = false;
        })
        .catch((err) => {
          this.loading.transaksi = false;
          console.log(err);
        });
    },
    submitTambah: function () {
      this.loading.tambah = true;
      Transaksi.setList(this.transaksiModel)
        .then(() => {
          this.loading.tambah = false;
          this.transaksiModel = {
            kode_barang: "",
            kode_perusahaan: "",
            total_barang: 1,
          };
          this.getList();
          this.modalTambah.hide();
        })
        .catch((err) => {
          this.err[0] = err;
          this.loading.tambah = false;
        });
    },
    formHandler: function () {
      this.err = [];
    },
    download: function () {
      window.open(
        `${process.env.VUE_APP_API_ENDPOINT}/transaksi?download=true`
      );
    },
  },
  created() {
    let that = this;
    this.getList();
    this.getPerusahaan();
    this.getBarang();

    this.$nextTick(function () {
      const bootstrap = require("bootstrap");
      let options = {
        backdrop: "static",
        focus: true,
      };
      this.modalTambah = new bootstrap.Modal(
        document.getElementById("tambahTransaksi"),
        options
      );
    });
  },
  mounted() {},
};
</script>
<style scoped>
.list-group-item {
  cursor: pointer;
}
.accordion-body {
  padding: 0;
}
</style>
