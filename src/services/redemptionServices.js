import dbConnect from './db';
import Redemption from './models/Redemption';
import Analytics from './models/Analytics';

export async function redeemPerk(userId, perkId, businessId) {
  await dbConnect();

  // Check if the user has already redeemed this perk
  const existingRedemption = await Redemption.findOne({ userId, perkId });
  if (existingRedemption) {
    throw new Error('User has already redeemed this perk');
  }

  // Create new redemption
  const redemption = new Redemption({ userId, perkId, businessId });
  const savedRedemption = await redemption.save();

  // Update analytics
  await Analytics.findOneAndUpdate(
    { perkId, businessId },
    { $inc: { redemptions: 1 } },
    { upsert: true, new: true }
  );

  return JSON.parse(JSON.stringify(savedRedemption));
}

export async function getRedemptionsByUserId(userId) {
  await dbConnect();

  const redemptions = await Redemption.find({ userId })
    // .populate('perkId')
    .populate('businessId')
    .lean();

  return JSON.parse(JSON.stringify(redemptions));
}

export async function getRedemptionsByPerkId(perkId) {
  await dbConnect();

  const redemptions = await Redemption.find({ perkId })
    .populate('userId')
    .populate('businessId')
    .lean();

  return JSON.parse(JSON.stringify(redemptions));
}