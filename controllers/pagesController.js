/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).`
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { format } = require("date-fns");
const { Article } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
    include: "user",
  });
  res.render("home", { articles, format });
}

async function showArticle(req, res) {
  const id = req.params.id;
  const article = await Article.findByPk(id, { include: ["user", "comments"] });
  const comments = article.comments.sort((a, b) => b.createdAt - a.createdAt);
  //console.log(article);

  return res.render("article", { article, comments });
}

async function showNewArticle(req, res) {
  res.render("newArticle");
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function showRegister(req, res) {
  res.render("register");
}

async function showLogin(req, res) {
  return res.render("login");
}

module.exports = {
  showHome,
  showContact,
  showNewArticle,
  showAboutUs,
  showRegister,
  showLogin,
  showArticle,
};
