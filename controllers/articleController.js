const { Article, User } = require("../models");
const { format } = require("date-fns");
const formidable = require("formidable");

//creo controlador para la ruta admin
async function showAdmin(req, res) {
  const articles = await Article.findAll({
    where: {
      userId: req.user.id,
    },
    include: "user",
  });

  const formattedArticles = articles.map((article) => {
    const dateToFormat = article.createdAt;
    const formattedDate = format(dateToFormat, "yyyy-MM-dd hh:mm:ss");
    return { ...article, createdAt: formattedDate };
  });

  return res.render("admin", { articles: formattedArticles });
}

//crear articulo

//mostrar articulo

// Show the form for editing the specified resource.
async function edit(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(articleId, { include: "user" });

  return res.render("editArticle", { article });
}
// Update the specified resource in storage.
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
async function create(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const newArticle = await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      userId: req.user.id,
    });

    return res.redirect("/admin");
  });
}

// Store a newly created resource in storage.

async function store(req, res) {}

/*
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const article = await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.name,
    });

    return res.redirect("/admin");
  });
}
*/
// Remove the specified resource from storage.
async function destroy(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(articleId);

  await article.destroy();

  return res.redirect("/admin");
  /*
  const articleId = req.params.id;
  const article = await Article.destroy({ where: { id: articleId } });

  return res.redirect("/admin", { article });
*/
}

// Otros handlers...
// ...

module.exports = {
  showAdmin,
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
