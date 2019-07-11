const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.json({
    msg: "Hello World"
  });
});

const users = require("./routes/users");
const contacts = require("./routes/contact");
const auth = require("./routes/auth");

app.use("/api/users", users);
app.use("/api/contacts", contacts);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on PORT : ${PORT}`));
