<template>
  <div id="transaksi" class="d-flex flex-column">
    <div class="p-3">
      <button
        class="btn btn-sm btn-primary float-end"
        @click="modalTambah.show()"
      >
        Tambah
      </button>
    </div>
    <div class="d-flex justify-content-center" v-if="loading.barang">
      <img :src="LOADING" alt="Loading ..." class="loading-tambah" />
    </div>
    <div class="text-center" v-else-if="barang.length == 0 && !loading.barang">
      <h5 class="text-muted">belum ada barang</h5>
    </div>
    <div
      class="accordion accordion-flush"
      id="accordionFlush"
      v-else-if="barang.length > 0 && !loading.barang"
    >
      <div class="accordion-item" v-for="item of barang" :key="item.id">
        <h2 class="accordion-header" :id="`flush-heading${item.id}`">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#flush-collapse${item.id}`"
            aria-expanded="false"
            :aria-controls="`flush-collapse${item.id}`"
          >
            {{ item.nama }}
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
                <small>{{ item.id }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Nama Barang</small>
                <small>{{ item.nama }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Harga Barang</small>
                <small>{{ item.hargaString }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Stock Barang</small>
                <small>{{ item.stock }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">
                  dibuat tanggal : {{ item.created_at }}
                </small>
                <small class="text-muted">
                  terakhir diperbarui : {{ item.updated_at }}
                </small>
                <button
                  class="btn btn-sm btn-primary align-self-end"
                  @click="update(item.id)"
                >
                  Update
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div
      class="modal fade"
      id="tambahBarang"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="tambahBarangLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tambahBarangLabel">Tambah Barang</h5>
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
                <label for="namaInput" class="form-label required"> Nama </label>
                <input
                  type="text"
                  class="form-control"
                  id="namaInput"
                  aria-describedby="namaHelp"
                  v-model="barangModel.nama"
                  @keyup="formHandler"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="hargaInput" class="form-label required"> Harga </label>
                <input
                  type="number"
                  class="form-control"
                  id="hargaInput"
                  v-model="barangModel.harga"
                  min="0"
                  @keyup="formHandler"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="stockInput" class="form-label required"> Stock </label>
                <input
                  type="number"
                  class="form-control"
                  id="stockInput"
                  v-model="barangModel.stock"
                  min="0"
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

    <!-- Update Modal -->
    <div
      class="modal fade"
      id="updateBarang"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="updateBarangLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateBarangLabel">Update Barang</h5>
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
            <form v-on:submit.prevent="submitUpdate">
              <div class="mb-3">
                <label for="namaInput" class="form-label required"> Nama </label>
                <input
                  type="text"
                  class="form-control"
                  id="namaInput"
                  aria-describedby="namaHelp"
                  v-model="barangModel.nama"
                  @keyup="formHandler"
                  maxlength="100"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="hargaInput" class="form-label required"> Harga </label>
                <input
                  type="number"
                  class="form-control"
                  id="hargaInput"
                  v-model="barangModel.harga"
                  min="0"
                  @keyup="formHandler"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="stockInput" class="form-label required"> Stock </label>
                <input
                  type="number"
                  class="form-control"
                  id="stockInput"
                  v-model="barangModel.stock"
                  min="0"
                  @keyup="formHandler"
                  required
                />
              </div>
              <div class="d-flex justify-content-center" v-if="loading.update">
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
                  Update
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
import { Barang } from "@/models";
export default {
  name: "Barang",
  setup() {
    const { LOADING } = require("@/helper/assets.helper");
    return { LOADING };
  },
  data() {
    return {
      barang: [],
      barangModel: {},
      loading: {
        tambah: false,
        update: false,
        barang: false,
      },
      err: [],
      modalTambah: undefined,
      modalUpdate: undefined,
    };
  },
  methods: {
    getList: function () {
      this.loading.barang = true;
      Barang.getList()
        .then((result) => {
          this.barang = Barang.list;
          this.loading.barang = false;
        })
        .catch((err) => {
          this.loading.barang = false;
        });
    },
    submitTambah: function () {
      this.loading.tambah = true;
      Barang.setList(this.barangModel)
        .then(() => {
          this.loading.tambah = false;
          this.barangModel = {};
          this.getList();
          this.modalTambah.hide();
        })
        .catch((err) => {
          console.log(err);
          this.err[0] = err;
          this.loading.tambah = false;
        });
    },
    formHandler: function () {
      this.err = [];
    },
    update: function (id) {
      let getBarang = this.barang.filter((item) => item.id === id);
      this.barangModel = {
        id: id,
        nama: getBarang[0].nama,
        harga: getBarang[0].harga,
        stock: getBarang[0].stock,
      };
      this.modalUpdate.show();
    },
    submitUpdate: function () {
      this.loading.update = true;
      Barang.updateList(this.barangModel)
        .then(() => {
          this.loading.update = false;
          this.barangModel = {};
          this.getList();
          this.modalUpdate.hide();
        })
        .catch((err) => {
          console.log(err);
          this.err[0] = err;
          this.loading.update = false;
        });
    },
  },
  created() {
    let that = this;
    this.getList();

    this.$nextTick(function () {
      const bootstrap = require("bootstrap");
      let options = {
        backdrop: "static",
        focus: true,
      };
      this.modalTambah = new bootstrap.Modal(
        document.getElementById("tambahBarang"),
        options
      );
      this.modalUpdate = new bootstrap.Modal(
        document.getElementById("updateBarang"),
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
