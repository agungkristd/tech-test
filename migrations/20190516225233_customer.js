
exports.up = function(knex, Promise) {
    return knex.schema.createTable("customers", table => {
        table.increments("customer_id").primary();
        table.string("email").unique();
        table.string("password");
        table.string("first_name");
        table.string("last_name");
        table.timestamps(true, true);
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("customers");
};
