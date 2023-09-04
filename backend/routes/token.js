const express = require("express");
const router=express.Router()
const {createToken,stkPush}= require("../controller/token")



module.exports=router