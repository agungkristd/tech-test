const { Model } = require("objection");

class Profile extends Model {
    static get tableName() {
        return "profiles";
    }
    static get idColumn() {
        return "profile_id";
    }
    
    static get jsonSchema() {
        return {
            type: "object",
            
            properties: {
                profile_id: { type: "integer", maxlength: 17 },
                user_id: { type: "integer", maxlength: 17 },
                first_name: { type: "string", minlength: 1, maxlength: 255 },
                last_name: { type: "string", minlength: 1, maxlength: 255 },
                phone_number: { type: "biginteger", maxlength: 17 }
            }
        };
    }
    
    
    
    static relationMappings() {
        // Import models here to prevent require loops.
        const User = require("./user");
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "profiles.user_id",
                    to: "users.user_id"
                }
            }
        };
    }
}
module.exports = Profile;
