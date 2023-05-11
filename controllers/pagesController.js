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
const { Article, User } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
    include: "user",
  });
  res.render("home", { articles, format });
}

//creo api para articulos
async function showApi(req, res) {
  const articles = await Article.findAll({ include: { all: true } });

  return res.json({ articles });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function showNewArticle(req, res) {
  res.render("newArticle");
}

async function register(req, res) {
  res.render("register");
}

async function addUser(req, res) {
try{
  const { firstname, lastname, email, password } = req.body
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { 
      firstname,
      lastname,
      password
      }
  });

    if (created) {
    req.login(user, () => res.redirect("/"));
    } else {
    req.flash("falla", "el correo electronico ya está registrado");
    req.flash("firstname", firstname);
    req.flash("lastname", lastname);
    res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("back");
  }
}

async function showLogin(req, res) {
  return res.render("login");
}

// async function login(req, res) {
//   console.log("hasta aca llegamo");
// }

module.exports = {
  showHome,
  showApi,
  showContact,
  showAboutUs,
  register,
  addUser,
  showLogin,
};
