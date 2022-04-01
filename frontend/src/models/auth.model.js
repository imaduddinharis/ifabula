var CryptoJS = require("crypto-js");
var loginStorageKey = CryptoJS.MD5(
  process.env.VUE_APP_STORAGE_KEY_LOGIN
).toString();
const { responseHandler } = require("@/helper/response.helper");
export const Auth = {
  isLogin: function () {
    return localStorage.getItem(loginStorageKey) ? true : false;
  },
  login: async function (data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const result = fetch(
      `${process.env.VUE_APP_API_ENDPOINT}/login`,
      requestOptions
    ).then(responseHandler);
    return await result;
  },
};
