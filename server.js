require("dotenv").config();

const express = require("express");
const flash = require("express-flash");
const routes = require("./routes");

const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const methodOverride = require("method-override");
const { makeUserAvailableInViews } = require("./middleware/auth");

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(flash());

//------------------------------------------------

//Passport

const { passport, session, passportConfig } = require("./config/passport");

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());
passportConfig();

app.use(makeUserAvailableInViews);

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
