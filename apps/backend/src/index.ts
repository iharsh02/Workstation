import { Request, Response } from "express";
import express from "express";
import { router } from "./router/route";
import cors from "cors";

const app = express();
const corsOption = {
  origin: "*",
  methods: "GET POST",
};

app.use(cors(corsOption));
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
