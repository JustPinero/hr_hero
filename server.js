const express = require("express");
const PATH = require("PATH")
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const db = require("./models")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(PATH.join(__dirname, "frontend", "hrhero", "build")))
app.use(routes);

// Start the API server
db.sequelize.sync().then(function() {
    app.listen(PORT, () =>
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
    );
})