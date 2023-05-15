const { findByPk } = require("../models/User");
const {Article, Comment} = require("../models/index")

function isNotLector (req, res, next){
    if (req.user.role.role !== "Lector"){
        next();
    }else {
        req.flash("perms", "No tiene los permisos para ingresar a Admin");
        return res.redirect("/");
    }
}
function isNotWriter (req, res, next){
    if (req.user.role.role !== "Escritor"){
        next();
    }else {
        req.flash("perms", "No tiene los permisos para ingresar a Admin");
        return res.redirect("/");
    }
}
function onlyAdmin (req,res,next){
    if (req.user.role.role === "Administrador"){
        next();
    }else{
        req.flash("perms", "No tiene los permisos para ingresar al sitio");
        return res.redirect("back");
    }
}
function onlyWriter (req,res,next){
    if (req.user.role.role === "Administrador"){
        next();
    }else{
        req.flash("perms", "No tiene los permisos para ingresar al sitio");
        return res.redirect("back");
    }
}
async function editArticles (req, res, next){
 const { userId } = await Article.findByPk(req.params.id);   
if (req.user.id === userId){
    next();
}else if(req.user.role.role === "Editor" || req.user.role.role === "Administrador"){
    next();
}else{
    req.flash("perms", "No tiene los permisos para ingresar al sitio");
    return res.redirect("back");
}
}
async function deleteArticles (req, res, next){
    const { userId } = await Article.findByPk(req.params.id);   
   if (req.user.id === userId){
       next();
   }else if(req.user.role.role === "Administrador"){
       next();
   }else{
       req.flash("perms", "No tiene los permisos para eliminar el archivo");
       return res.redirect("back");
   }
   }
   async function manageComment (req, res, next){
    const id = req.params.id;
    const comment = await Comment.findOne({where:{id:id}});

    if(comment && req.user.roleId > 2){
        next();
    }else{
        req.flash("perms", "No tiene los permisos para editar comentarios o el comentario no existe");
        return res.redirect("/");
    }
   }   
module.exports = {
    isNotLector,
    isNotWriter,
    onlyAdmin,
    onlyWriter,
    editArticles,
    deleteArticles,
    manageComment,
}