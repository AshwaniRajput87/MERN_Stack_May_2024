  const mongoose = require('mongoose');

   // create a user schema object

   const userSchemaObj = {

    //   id: {
    //     type: mongoose.Types.ObjectId,
    //     minlength: 16
    //   },

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
        required: true,
        minlength: 8
      },

      confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function() {
            return this.password === this.confirmPassword
        }
      },

      createdAt: {
        type: Date,
        default: Date.now()
      }
   };

   const userSchema = new mongoose.Schema(userSchemaObj);

   const UserModel = mongoose.model("usermodel", userSchema);

   module.exports = UserModel;