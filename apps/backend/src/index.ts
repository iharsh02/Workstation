import { Request, Response } from "express";
import express from "express";
import { router } from "./router/route";
const app = express();

app.use(express.json());
app.use("/api/v1", router);

const PORT = 3001;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "backend , hii",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listing to ${PORT}`);
});
