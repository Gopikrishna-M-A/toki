import mongoose from "mongoose"

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    types: [String],
    description: String,
    address: String,
    latitude: Number,
    longitude: Number,
    phone:String,
    mapUri: String,
    website: String,
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    images: [String],
    placeId:String,
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
