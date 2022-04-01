const { responseHandler } = require("@/helper/response.helper");

export const Perusahaan = {
  list: [],
  getList: async function () {
    this.list = [];
    const requestOptions = {
      method: "GET",
    };
    const result = fetch(
      `${process.env.VUE_APP_API_ENDPOINT}/perusahaan`,
      requestOptions
    ).then(responseHandler);

    result
      .then((result) => {
        result.result.map((item) => {
          this.list.push({
            kode_perusahaan: item.kode_perusahaan,
            nama_perusahaan: item.nama_perusahaan,
            created_at: getFullDate(item.created_at),
            updated_at:
              item.updated_at != null ? getFullDate(item.updated_at) : "-",
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
      `${process.env.VUE_APP_API_ENDPOINT}/perusahaan`,
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
      `${process.env.VUE_APP_API_ENDPOINT}/perusahaan/${list.kode_perusahaan}`,
      requestOptions
    ).then(responseHandler);

    return await result;
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
