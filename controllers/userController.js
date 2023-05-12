const { levelPermisionAdmin } = require("../middleware/auth");
const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

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
async function update(req, res) {
  const { levelPermission } = req.body;
  const user = await User.update(
    {
      levelPermission,
    },
    { where: { id: req.params.id } },
  );
  return res.redirect("back");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  await user.destroy();
  return res.redirect("back");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
