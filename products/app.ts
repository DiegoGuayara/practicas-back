import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10102;

app.use(express.json());
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
