const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productSchema = new Schema(
{
firstName: {
    type: String,
    required: [true, "firstName is required."],
},
lastName: {
    type: String,
    required: [true, "lastName is required."],
},
email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
},
password: {
    type: String,
    required: [true, "Password is required."],
},
comment: {
    type: [Schema.Types.ObjectId ]

    },

},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
}
);

const Product = model("Product", productSchema);

module.exports = Product;
