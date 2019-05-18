const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get idColumn() {
    return "user_id";
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      
      properties: {
        user_id: { type: "integer", maxlength: 17 },
        email: { type: "email" },
        password: { type: "string", minlength: 1, maxlength: 255 }
      }
    };
  }
  
  
  
  static relationMappings() {
    // Import models here to prevent require loops.
    const Profile = require("./profile");
    return {
      profile: {
        relation: Model.HasOneRelation,
        modelClass: Profile,
        join: {
          from: "users.user_id",
          to: "profiles.user_id"
        }
      }
    };
  }
}
module.exports = User;
