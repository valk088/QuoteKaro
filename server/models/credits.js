const mongoose = require("mongoose");
const creditsSchema = new mongoose.Schema({
  _id: ObjectId,
  userId: ObjectId, 
  totalCredits: Number,
  history: [
    {
      amount: Number,
      type: "add" | "use",
      purpose: String,
      createdAt: Date,
    },
  ],
  updatedAt: Date,
});

module.exports = mongoose.model("Credits", creditsSchema);
