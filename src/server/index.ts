import cookieParser from "cookie-parser";
import express from "express";

import { serverRenderer } from "./render";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("build"));
app.use(cookieParser());
app.use(serverRenderer());

app.listen(PORT, () => {
  console.log(`Application listening on: http://localhost:${PORT}`);
});
