
exports.up = function(knex, Promise) {
    return knex.schema.createTable("profiles", table => {
        table.increments("profile_id").primary();
        table
        .integer("user_id")
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .notNullable()
        .index();
        table.string("first_name");
        table.string("last_name");
        table.biginteger("phone_number");
        table.timestamps(true, true);
    })
    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("profiles");
};
