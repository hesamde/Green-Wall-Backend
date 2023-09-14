require("dotenv").config();
require("./db")
const express = require("express");

const PORT = process.env.PORT || 5005;
const app = express();

require("./config")(app);


const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/product", productRoutes);

const commentRoutes = require("./routes/comment.route");
app.use("/comment", commentRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    });


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
