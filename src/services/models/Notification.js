import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
  senderBusinessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  receiverBusinessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  type: { type: String, enum: ['PARTNERSHIP_REQUEST'], required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema)
