import { Request , Response } from "express";
import express from "express"
const app = express();

app.use(express.json());

const PORT = 3001

app.get("/" , (req : Request, res : Response)=>{
    res.json({
        message : "backend , hii"
    });
});


app.listen(PORT , ()=>{
    console.log(`Server is listing to ${PORT}`)
})