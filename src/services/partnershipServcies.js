import dbConnect from './db';
import Partnership from './models/Partnership';

export async function getPartnership(partnershipId) {
  await dbConnect();

  const partnership = await Partnership.findById(partnershipId)
    .populate('businessId1')
    .populate('businessId2')
    .populate('initiatedBy')
    .lean();

  return partnership ? JSON.parse(JSON.stringify(partnership)) : null;
}

export async function createPartnership(partnershipData) {
  await dbConnect();

  const newPartnership = new Partnership(partnershipData);
  const savedPartnership = await newPartnership.save();

  return JSON.parse(JSON.stringify(savedPartnership));
}

export async function updatePartnershipStatus(partnershipId, status) {
  await dbConnect();

  const updatedPartnership = await Partnership.findByIdAndUpdate(
    partnershipId,
    { $set: { status } },
    { new: true, runValidators: true, lean: true }
  );

  return updatedPartnership ? JSON.parse(JSON.stringify(updatedPartnership)) : null;
}

export async function deletePartnership(partnershipId) {
  await dbConnect();

  const deletedPartnership = await Partnership.findByIdAndDelete(partnershipId).lean();

  return deletedPartnership ? JSON.parse(JSON.stringify(deletedPartnership)) : null;
}

export async function getPartnershipsByBusiness(businessId) {
  await dbConnect();

  const partnerships = await Partnership.find({
    $or: [{ businessId1: businessId }, { businessId2: businessId }]
  })
    .populate('businessId1')
    .populate('businessId2')
    .populate('initiatedBy')
    .lean();

  return JSON.parse(JSON.stringify(partnerships));
}

export async function getPendingPartnerships() {
  await dbConnect();

  const pendingPartnerships = await Partnership.find({ status: 'pending' })
    .populate('businessId1')
    .populate('businessId2')
    .populate('initiatedBy')
    .lean();

  return JSON.parse(JSON.stringify(pendingPartnerships));
}