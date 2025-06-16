const express = require("express");
const router = express.Router();
const updateTotalTurnoverForUser = require("../utils/calculateTurnover");

router.get("/debug-turnover/:uid", async (req, res) => {
  try {
    await updateTotalTurnoverForUser(req.params.uid);
    res.json({ success: true, message: "Turnover updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
