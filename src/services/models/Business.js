import mongoose from "mongoose"

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    contactInfo: {
      phone: String,
      email: String,
    },
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    logoUrl: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.models.Business ||
  mongoose.model("Business", businessSchema)
