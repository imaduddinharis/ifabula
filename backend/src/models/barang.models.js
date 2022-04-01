module.exports = (table) => ({
  find: async function (queryParam) {
    try {
      let query;
      if (queryParam.deleted) {
        query = await table("barang");
      } else {
        query = await table("barang").where({ deleted_at: null });
      }
      return query;
    } catch (error) {
      return error;
    }
  },
  findById: async function (id) {
    try {
      let query = await table("barang").where("id", "=", id);
      return query;
    } catch (error) {
      return error;
    }
  },
  create: async function (body) {
    try {
      let query = await table("barang").insert(body);
      return query;
    } catch (error) {
      return error;
    }
  },
  update: async function (id, body) {
    try {
      let query = await table("barang").where("id", "=", id).update(body);
      return query;
    } catch (error) {
      return error;
    }
  },
});
