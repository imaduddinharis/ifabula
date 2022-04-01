const { responseHandler } = require("@/helper/response.helper");

export const Transaksi = {
  list: [],
  getList: async function () {
    this.list = [];
    const requestOptions = {
      method: "GET",
    };
    const result = fetch(
      `${process.env.VUE_APP_API_ENDPOINT}/transaksi`,
      requestOptions
    ).then(responseHandler);

    result
      .then((result) => {
        result.result.map((item) => {
          this.list.push({
            id: item.id,
            kode_perusahaan: item.kode_perusahaan,
            nama_perusahaan: item.nama_perusahaan,
            kode_barang: item.kode_barang,
            nama_barang: item.nama_barang,
            total_barang: item.total_barang,
            harga_barang: this.formatRupiah(
              item.harga_barang.toString(),
              "Rp "
            ),
            total_harga: this.formatRupiah(item.total_harga.toString(), "Rp "),
            sisa_stock: item.sisa_stock,
            created_at: getFullDate(item.created_at),
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return await result;
  },
  setList: async function (list) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    };
    const result = fetch(
      `${process.env.VUE_APP_API_ENDPOINT}/transaksi`,
      requestOptions
    ).then(responseHandler);

    return await result;
  },
  updateList: async function (list) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    };
    const result = fetch(
      `${process.env.VUE_APP_API_ENDPOINT}/barang/${list.id}`,
      requestOptions
    ).then(responseHandler);

    return await result;
  },
  priceToString: function (num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "Q" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? `IDR ${
          (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        }`
      : "Free";
  },
  formatRupiah: function (angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? "Rp. " + rupiah : prefix + rupiah;
  },
};

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}
function getFullDate(date) {
  let datetime = new Date(date);
  datetime = convertTZ(datetime, "Asia/Jakarta");
  datetime = `${datetime.getDate()}/${
    datetime.getMonth() + 1
  }/${datetime.getFullYear()} ${datetime.getHours()}:${datetime
    .getMinutes()
    .toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  return datetime;
}
