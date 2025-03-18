const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const CustomerSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    validate: {
      validator: function (val) {
        return val.toString().length === 9;
      },
      message: (val) => `${val.value} has to be 9 digits`,
    },
  },
  name: { type: String, maxLength: 255 },
  dob: Date,
  gender: { type: String, maxLength: 1 },
});

// CustomerSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Customer", CustomerSchema);
