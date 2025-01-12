import express from "express";
import cors from "cors";
import postRouter from "./routers/post.mjs";
import getRouter from "./routers/get.mjs";
import putRouter from "./routers/put.mjs";
import deleteRouter from "./routers/delete.mjs";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(getRouter);
app.use(postRouter);
app.use(putRouter);
app.use(deleteRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
