var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  text: { type: String, required: true, minlength: 4},
  author: String,
  articleId: { type: Schema.Types.ObjectId, required: true , ref: "Article"},
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema);
