const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const db = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Start the API server
db.sequelize.sync().then(function() {
    app.listen(PORT, () =>
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
    );
})