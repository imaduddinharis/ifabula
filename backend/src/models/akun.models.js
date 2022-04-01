module.exports = (table) => ({
  login: async function (akun) {
    try {
      let query = table("akun").where(akun);
      return query;
    } catch (error) {
      return error;
    }
  },
});
