import dbConnect from './db';
import Analytics from './models/Analytics';

export async function incrementPerkClicks(perkId, businessId) {
  await dbConnect();

  const updatedAnalytics = await Analytics.findOneAndUpdate(
    { perkId, businessId },
    { $inc: { clicks: 1 } },
    { upsert: true, new: true }
  ).lean();

  return JSON.parse(JSON.stringify(updatedAnalytics));
}

export async function getAnalyticsByPerkId(perkId) {
  await dbConnect();

  const analytics = await Analytics.findOne({ perkId }).lean();

  return analytics ? JSON.parse(JSON.stringify(analytics)) : null;
}

export async function getAnalyticsByBusinessId(businessId) {
  await dbConnect();

  const analytics = await Analytics.find({ businessId })
    .populate('perkId')
    .lean();

  return JSON.parse(JSON.stringify(analytics));
}

export async function getOverallAnalytics(businessId) {
  await dbConnect();

  const analytics = await Analytics.aggregate([
    { $match: { businessId } },
    {
      $group: {
        _id: null,
        totalClicks: { $sum: "$clicks" },
        totalRedemptions: { $sum: "$redemptions" }
      }
    }
  ]);

  return analytics.length > 0 ? analytics[0] : { totalClicks: 0, totalRedemptions: 0 };
}