// Update with your config settings.

module.exports = {

  development: {
    client: "postgresql",
    connection: {
      database: "tech_test",
      user: "postgres",
      password: "password",
      host: "localhost",
      port: 5432
    },
    pool: {
      min: 10,
      max: 100
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },


  production: {
    client: "postgresql",
    connection: {
      database: "d4fjevfd7itfqj",
      user: "otevddhlzznnrr",
      password: "aeaa8710f325e42697ac9bf6b460c102e3e62572946587e83e9ce1604b33d339",
      host: "ec2-75-101-147-226.compute-1.amazonaws.com",
      port: 5432
    },
    pool: {
      min: 10,
      max: 100
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
