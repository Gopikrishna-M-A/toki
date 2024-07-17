import mongoose from "mongoose"

const RedemptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    perkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Perk', required: true },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    redeemedAt: { type: Date, default: Date.now },
  }, { timestamps: true });

export default mongoose.models.Redemption || mongoose.model("Redemption", RedemptionSchema)