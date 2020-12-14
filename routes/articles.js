var express = require('express');
var router = express.Router();

var Article = require('../models/Article');
var Comment = require('../models/Comment');

// render article form
router.get("/new", (req, res) => {
  // send new article form
  res.render("addArticleForm");
})

// create article
router.post("/", (req, res, next) => {
  Article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect("/articles")
  })
})

// find list of all articles
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("listArticles", { articles })
  })

})

// find a single article
// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Article.findById(id, (err, article) => {
//     if (err) return next(err);
//     Comment.find({ articleId: id }, (err, comments) => {
//       if (err) return next(err);
//       res.render("articleDetails", { article, comments })
//     })
//   })
// })

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id).populate("comments").exec((err, article) => {
    if(err) return next(err);
    res.render("articleDetails", { article })
  })
})

// render update form 
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    console.log(article)
      if (err) return next(err);
      res.render("editArticle", { article })
  })
})

// update an article
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, {
    new: true
  }, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect(`/articles/${id}`)
  })
})

// delete an article
router.get("/:id/delete", (req, res, next) => {
  Article.findOneAndDelete({
    _id: req.params.id
  }, (err, deletedArticle) => {
    if (err) return next(err);
    res.redirect("/articles");
  })
});

router.post("/:articleId/comments", (req, res, next) => {
  var articleId = req.params.articleId;
  req.body.articleId = articleId;
  Comment.create(req.body, (err, comment) => {
    if(err) return next(err);
    Article.findByIdAndUpdate(articleId, { $push: {comments: comment._id}}, (err, article) => {
      if(err) return next(err);
      res.redirect("/articles/" + articleId)
    })
  })
})
module.exports = router;


