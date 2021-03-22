const express = require("express");
const cookieParser = require("cookie-parser");
const routes = [require("./routes/next-auth"), require("./routes/hasura-auth-hook")];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(...routes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.PORT}`);
});
void server;
