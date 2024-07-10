import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    emailVerified: Date,
    role: {
      type: String,
      enum: ["business_owner", "admin", "user"],
      default: "user",
    },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
