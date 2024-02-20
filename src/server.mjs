import app from "./app.mjs";
import "./db/config.mjs";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
