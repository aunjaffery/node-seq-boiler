const port = 8080;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const models = require("./models");
const fileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  exphbs({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    safeFileNames: true,
  })
);
const Routes = require("./routes/index");
app.use("/api/", Routes);

models.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => console.log(`database listening to port ${port}`));
  })
  .catch((err) => console.log(err));
