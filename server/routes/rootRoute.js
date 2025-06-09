const express = require('express');
const router = express.Router();

router.get("/" , (req,res)=>{
    res.send("QuoteKaro Backend is running")
});

module.exports = router;
