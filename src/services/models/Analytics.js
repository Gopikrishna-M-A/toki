import mongoose from "mongoose"

const AnalyticsSchema = new mongoose.Schema({
  perkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Perk', required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  clicks: { type: Number, default: 0 },
  redemptions: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema)