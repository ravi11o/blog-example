var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: { type: String,  required: true, trim: true },
  description: {
    type: String,
    required: true,
    minlength: 26,
  },
  tags: [{
    type: String,
    }],
  likes: { type: Number, default: 0 },
  published: { type: String, default: false },
}, { timestamps: true })

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;

