import mongoose from "mongoose"

const analyticsSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  partneredWith: { type: Number, default: 0 },
  newCustomers: { type: Number, default: 0 },
  period: { type: String, required: true } // Format: "YYYY-MM"
}, { timestamps: true });

export default mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema)