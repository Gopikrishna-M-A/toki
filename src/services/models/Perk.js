import mongoose from "mongoose"

const perkSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    title: { type: String, required: true },
    description: { type: String },
    specialInstructions: { type: String },
    noteForPartner: { type: String },
    dealModes: {
      sms: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
      website: { type: Boolean, default: false }
    },
    newCustomerRestriction: { 
      type: String, 
      enum: ['existing', 'new'], 
      default: 'existing' 
    },
    validUntil: { type: Date }
  }, { timestamps: true });

export default mongoose.models.Perk || mongoose.model("Perk", perkSchema)
