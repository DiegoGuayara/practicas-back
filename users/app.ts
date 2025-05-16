import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import productRouter from "./routes/product.routes";

const app = express();
const PORT = process.env.PORT || 10101;

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
