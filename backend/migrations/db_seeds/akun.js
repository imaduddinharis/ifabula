/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const CryptoJS = require("crypto-js");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("akun").del();
  await knex("akun").insert([
    {
      username: "user-test",
      password: CryptoJS.MD5("password1234").toString(),
    },
  ]);
};
