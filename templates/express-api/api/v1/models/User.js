const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roles = require("../enums/userRoles")

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: roles.guest
    },

  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

UserSchema.methods.getPublicFields = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    created_at: this.created_at,
    updated_at: this.updated_at
  };
};

module.exports = mongoose.model("User", UserSchema);
