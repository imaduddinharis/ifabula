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
    <div class="d-flex justify-content-center" v-if="loading.perusahaan">
      <img :src="LOADING" alt="Loading ..." class="loading-tambah" />
    </div>
    <div class="text-center" v-else-if="perusahaan.length == 0 && !loading.perusahaan">
      <h5 class="text-muted">belum ada perusahaan</h5>
    </div>
    <div
      class="accordion accordion-flush"
      id="accordionFlush"
      v-else-if="perusahaan.length > 0 && !loading.perusahaan"
    >
      <div class="accordion-item" v-for="item of perusahaan" :key="item.kode_perusahaan">
        <h2 class="accordion-header" :id="`flush-heading${item.kode_perusahaan}`">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#flush-collapse${item.kode_perusahaan}`"
            aria-expanded="false"
            :aria-controls="`flush-collapse${item.kode_perusahaan}`"
          >
            {{ item.nama_perusahaan }}
          </button>
        </h2>
        <div
          :id="`flush-collapse${item.kode_perusahaan}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`flush-heading${item.kode_perusahaan}`"
          data-bs-parent="#accordionFlush"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Kode perusahaan</small>
                <small>{{ item.kode_perusahaan }}</small>
              </li>
              <li class="list-group-item d-flex flex-column">
                <small class="text-muted">Nama perusahaan</small>
                <small>{{ item.nama_perusahaan }}</small>
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
                  @click="update(item.kode_perusahaan)"
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
      id="tambahPerusahaan"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="tambahPerusahaanLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tambahPerusahaanLabel">Tambah perusahaan</h5>
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
                <label for="kodeInput" class="form-label"> Kode Perusahaan </label>
                <input
                  type="text"
                  class="form-control"
                  id="kodeInput"
                  v-model="modelTambah.kode_perusahaan"
                  @keyup="formHandler"
                />
              </div>
              <div class="mb-3">
                <label for="namaInput" class="form-label"> Nama Perusahaan </label>
                <input
                  type="text"
                  class="form-control"
                  id="namaInput"
                  v-model="modelTambah.nama_perusahaan"
                  @keyup="formHandler"
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
      id="updatePerusahaan"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="updatePerusahaanLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updatePerusahaanLabel">Update perusahaan</h5>
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
                <label for="kodeInput" class="form-label required"> Kode Perusahaan </label>
                <input
                  type="text"
                  class="form-control"
                  id="kodeInput"
                  v-model="modelUpdate.kode_perusahaan"
                  @keyup="formHandler"
                  maxlength="10"
                  disabled
                  required
                />
                <label for="kodeInput" class="small text-muted">kode perusahaan tidak dapat di update</label>
              </div>
              <div class="mb-3">
                <label for="namaInput" class="form-label required"> Nama Perusahaan </label>
                <input
                  type="text"
                  class="form-control"
                  id="namaInput"
                  v-model="modelUpdate.nama_perusahaan"
                  @keyup="formHandler"
                  maxlength="100"
                  required
                />
              </div>
              <div class="d-flex justify-content-center" v-if="loading.update">
                <img :src="LOADING" alt="Loading ..." class="loading-update" />
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
import { Perusahaan } from "@/models";
export default {
  name: "Perusahaan",
  setup() {
    const { LOADING } = require("@/helper/assets.helper");
    return { LOADING };
  },
  data() {
    return {
      perusahaan: [],
      modelTambah: {},
      modelUpdate: {},
      loading: {
        tambah: false,
        update: false,
        perusahaan: false,
      },
      err: [],
      modalTambah: undefined,
      modalUpdate: undefined,
    };
  },
  methods: {
    getList: function () {
      this.loading.perusahaan = true;
      Perusahaan.getList()
        .then((result) => {
          this.perusahaan = Perusahaan.list;
          this.loading.perusahaan = false;
        })
        .catch((err) => {
          this.loading.perusahaan = false;
        });
    },
    submitTambah: function () {
      this.loading.tambah = true;
      Perusahaan.setList(this.modelTambah)
        .then(() => {
          this.loading.tambah = false;
          this.modelTambah = {};
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
      let getPerusahaan = this.perusahaan.filter((item) => item.kode_perusahaan === id);
      this.modelUpdate = {
        kode_perusahaan: getPerusahaan[0].kode_perusahaan,
        nama_perusahaan: getPerusahaan[0].nama_perusahaan,
      };
      this.modalUpdate.show();
    },
    submitUpdate: function () {
      this.loading.update = true;
      Perusahaan.updateList(this.modelUpdate)
        .then(() => {
          this.loading.update = false;
          this.modelUpdate = {};
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
        document.getElementById("tambahPerusahaan"),
        options
      );
      this.modalUpdate = new bootstrap.Modal(
        document.getElementById("updatePerusahaan"),
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
