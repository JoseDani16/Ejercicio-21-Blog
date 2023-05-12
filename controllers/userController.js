const { Article, User, Role } = require("../models");
const { findAll } = require("../models/User");

// Display a listing of the resource.
async function adminIndex(req, res) {
  const users = await User.findAll();
  const roles = await Role.findAll();
  res.render("permisos",{users, roles})
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstname,
        lastname,
        password,
      },
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

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

async function changePerms(req, res) {
  const {id, role} = req.body
  await User.update(
    {
    roleId: role
  },
  {
    where: {id:id}
}
)
return res.redirect("/admin")
}

async function adminDestroy(req, res) {
  const id = req.query.id*1;
  const user = await User.findByPk(id, { include: ["articles"] });
  
  for (article of user.articles){
    await Article.destroy({where:{id: article.id}})
  }

  await User.destroy({where:{id:id}})

  return res.redirect("/admin")
}


// Otros handlers...
// ...

module.exports = {
  adminIndex,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  changePerms,
  adminDestroy,
};
