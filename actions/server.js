const express = require("express");
const actions = {
  session: require("./actions/session"),
  vote: require("./actions/vote"),
};

const app = express();
app.use(express.json());

const actionNames = Object.keys(actions);
app.use(async (req, res, next) => {
  const actionName = req.body?.action?.name;
  if (!actionName || !actionNames.includes(actionName)) {
    return res.status(400).send("Invalid action name");
  }
  try {
    res.json(await actions[actionName](req, res));
  } catch (error) {
    next(error);
  }
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.PORT}`);
});
void server;
