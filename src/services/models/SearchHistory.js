import mongoose from "mongoose"

const searchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  query: { type: String, required: true },
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }]
}, { timestamps: true });

export default mongoose.models.SearchHistory || mongoose.model("SearchHistory", searchHistorySchema)