const { Article } = require("../models");
const { format } = require("date-fns");
const formidable = require("formidable");

//creo controlador para la ruta admin
async function showAdmin(req, res) {
  const articles = await Article.findAll({ include: { all: true } });

  const formattedArticles = articles.map((article) => {
    const dateToFormat = article.createdAt;
    const formattedDate = format(dateToFormat, "yyyy-MM-dd hh:mm:ss");
    return { ...article, createdAt: formattedDate };
  });

  return res.render("admin", { articles: formattedArticles });
}

//crear articulo
async function showNewArticle(req, res) {
  res.render("newArticle");
}

//mostrar articulo
async function showArticle(req, res) {
  const articleId = req.params.id;
  const article = await Article.findOne({
    where: { id: articleId },
    include: "user",
  });
  //console.log(article);

  return res.render("article", { article });
}

//editar articulo
async function edit(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(articleId, { include: "user" });

  // console.log(article);

  return res.render("editArticle", { article });
}
//editar articulo post
async function update(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const article = await Article.update(
      {
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
      },
      { where: { id: req.params.id } },
    );
    return res.redirect("/admin");
  });
}

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.

// Update the specified resource in storage.

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  showAdmin,
  showNewArticle,
  showArticle,
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
