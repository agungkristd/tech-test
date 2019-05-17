
exports.up = function(knex, Promise) {
    return knex.schema.createTable("customers", table => {
        table.increments("customer_id").primary();
        table.string("email").notNullable().unique().index();
        table.string("password").notNullable();
        table.string("first_name");
        table.string("last_name");
        table.timestamps(true, true);
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("customers");
};
