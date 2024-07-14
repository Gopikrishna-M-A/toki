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
    website: String,
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    images: [String],
    photos: [{
      name: String,
      widthPx: Number,
      heightPx:Number,
      authorAttributions:[
        {
          displayName:String,
          uri:String,
          photoUri:String
        }
      ]
    }],
    logo:String,
    placeId:String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "User",
    },
    partners: [{
      partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
      status: { type: String, enum: ['pending', 'active', 'rejected', 'paused'] }
    }]
  },
  { timestamps: true }
)

export default mongoose.models.Business ||
  mongoose.model("Business", businessSchema)
