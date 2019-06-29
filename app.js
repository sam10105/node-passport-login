const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, console.log(`Server started on port ${port}...`));
