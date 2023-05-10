const { Comment, Article } = require("../models");
const { findByPk } = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
// async function showComment(req, res) {
//   const comments = await Comment.findAll({ include: { all: true } });
//   res.render("article", { comments });
// }

//===> creo el controller de posteo de comentarios
/*async function create(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(articleId);
  return res.render("/articulos/:id", article);
}*/

// Store a newly created resource in storage.
async function store(req, res) {
  const articleId = req.params.id;

  const newComment = await Comment.create({
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    comment: req.body.comment,
    articleId: articleId,
  });

  return res.redirect(`/articulos/${articleId}`);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  // showComment,
  //create,
  store,
  edit,
  update,
  destroy,
};
