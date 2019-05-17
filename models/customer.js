const { Model } = require("objection");

class Customer extends Model {
    static get tableName() {
        return "customers";
    }
    static get idColumn() {
        return "customer_id";
    }

    static get jsonSchema() {
        return {
          type: "object",
    
          properties: {
            customer_id: { type: "integer", maxlength: 17 },
            email: { type: "email" },
            password: { type: "string", minlength: 1, maxlength: 255 },
            first_name: { type: "string", minlength: 1, maxlength: 255 },
            last_name: { type: "string", minlength: 1, maxlength: 255 }
          }
        };
    }



  static relationMappings() {
    // Import models here to prevent require loops.
    
  }
}
module.exports = Customer;
