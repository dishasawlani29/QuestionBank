const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Test = new Schema({
  question_list: {
    type: Object,
  },
  user_id: {
    type: String,
  },
  test_type: {
    type: String,
  },
});

module.exports = mongoose.model("Test", Test);
