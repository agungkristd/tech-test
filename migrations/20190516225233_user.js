
exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", table => {
        table.increments("user_id").primary();
        table.string("email").notNullable().unique().index();
        table.string("password").notNullable();
        table.timestamps(true, true);
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};
