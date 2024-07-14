import mongoose from "mongoose"

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, enum: ['pending', 'active', 'rejected', 'paused'], required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const partnershipSchema = new mongoose.Schema({
  businessId1: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  businessId2: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  status: { type: String, enum: ['pending', 'active', 'rejected'], default: 'pending' },
  initiatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  statusHistory: [statusHistorySchema]
}, { timestamps: true });

export default mongoose.models.Partnership || mongoose.model("Partnership", partnershipSchema)