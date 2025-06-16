const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    firebaseUID: { type: String, required: true, unique: true },

    
    studioName: { type: String, required: true },
    caption: { type: String },
    logoUrl: { type: String }, //  Cloudinary URL
    website: { type: String },

    
    phone2: { type: String }, // optional 
    socialLinks: {
      instagram: { type: String },
      facebook: { type: String },
      youtube: { type: String },
    },

    // Address
    address: {
      d_address:{type: String},
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },

    
    policies: { type: String },
    notes: { type: String },

    // SaaS Related
    plan: { type: String, default: "Basic" },
    credits: { type: Number, default: 10 },
    total_estimates: { type: Number, default: 10 },
    total_clients: { type: Number, default: 0 },
    credits_left: { type: Number, default: 0 },
    totalturnover: { type: Number, default: 0 },


    isSuspended: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
