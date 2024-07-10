import mongoose from "mongoose"

const partnershipSchema = new mongoose.Schema({
  businessId1: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  businessId2: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  status: { type: String, enum: ['pending', 'active', 'rejected'], default: 'pending' },
  initiatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.models.Partnership || mongoose.model("Partnership", partnershipSchema)