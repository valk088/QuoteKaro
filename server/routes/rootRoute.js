const express = require('express');
const router = express.Router();

router.get("/" , (res,req)=>{
    res.send("QuoteKaro Backend is running")
});

module.exports = router;
