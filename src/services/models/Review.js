import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  content: String
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema)