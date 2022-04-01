/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const timestamps = (col, knex) => {
  col
    .dateTime("created_at")
    .notNullable()
    .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  col
    .dateTime("updated_at")
    .defaultTo(knex.raw("NULL ON UPDATE CURRENT_TIMESTAMP"));
  col.dateTime("deleted_at").defaultTo(knex.raw("NULL"));
  return col;
};
exports.up = function (knex) {
  return knex.schema
    .createTable("barang", function (col) {
      col.increments("id");
      col.string("nama", 100).notNullable();
      col.integer("harga").notNullable();
      col.integer("stock").notNullable();
      timestamps(col, knex);
    })
    .createTable("perusahaan", function (col) {
      col.string("kode_perusahaan", 10).primary();
      col.string("nama_perusahaan", 100).notNullable();
      timestamps(col, knex);
    })
    .createTable("transaksi", function (col) {
      col.increments("id");
      col.string("kode_perusahaan", 100).notNullable();
      col.string("nama_perusahaan", 100).notNullable();
      col.integer("kode_barang").unsigned().notNullable();
      col.string("nama_barang", 100);
      col.integer("total_barang");
      col.integer("harga_barang");
      col.integer("sisa_stock");
      timestamps(col, knex);

      col
        .foreign("kode_perusahaan")
        .references("kode_perusahaan")
        .inTable("perusahaan");
      col.foreign("kode_barang").references("id").inTable("barang");
    })
    .createTable("akun", function (col) {
      col.increments("id");
      col.string("username", 50).notNullable();
      col.string("password", 100).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("barang")
    .dropTableIfExists("perusahaan")
    .dropTableIfExists("transaksi")
    .dropTableIfExists("akun");
};

exports.config = { transaction: false };
