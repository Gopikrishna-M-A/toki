import dbConnect from './db';
import Perk from './models/Perk';
import Business from './models/Business';
import { incrementPerkClicks } from './analyticsServices';

export async function createPerk(perkData) {
  await dbConnect();

  const perk = new Perk(perkData);
  const savedPerk = await perk.save();

  return JSON.parse(JSON.stringify(savedPerk));
}

export async function getAllPerks() {
  await dbConnect();

  const Perks = await Perk.find().populate('businessId')

  return JSON.parse(JSON.stringify(Perks));
}

export async function getPerksByBusinessId(businessId) {
  await dbConnect();

  const perks = await Perk.find({ businessId }).populate('businessId').lean();

  return JSON.parse(JSON.stringify(perks));
}

export async function getPerkById(perkId) {
  await dbConnect();

  const perk = await Perk.findById(perkId).lean();

  if (perk) {
    await incrementPerkClicks(perkId, perk.businessId);
  }

  return perk ? JSON.parse(JSON.stringify(perk)) : null;
}

export async function updatePerk(perkId, updates) {
  await dbConnect();

  const updatedPerk = await Perk.findByIdAndUpdate(
    perkId,
    { $set: updates },
    { new: true, runValidators: true, lean: true }
  );

  return updatedPerk ? JSON.parse(JSON.stringify(updatedPerk)) : null;
}

export async function deletePerk(perkId) {
  await dbConnect();

  const deletedPerk = await Perk.findByIdAndDelete(perkId).lean();

  return deletedPerk ? JSON.parse(JSON.stringify(deletedPerk)) : null;
}