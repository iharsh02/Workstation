import express from "express";

export const workstation = express.Router();

workstation.get("/" , (req , res)=>{
    res.json({
        message : "hello from workstation route"
    })
})



