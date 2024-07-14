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

  // Update both businesses' partner lists
  await Business.findByIdAndUpdate(partnershipData.businessId1, {
    $push: { partners: { partnerId: partnershipData.businessId2, status: savedPartnership.status } }
  });
  await Business.findByIdAndUpdate(partnershipData.businessId2, {
    $push: { partners: { partnerId: partnershipData.businessId1, status: savedPartnership.status } }
  });

  return JSON.parse(JSON.stringify(savedPartnership));
}

export async function updatePartnershipStatus(partnershipId, newStatus) {
  await dbConnect();
  const updatedPartnership = await Partnership.findByIdAndUpdate(
    partnershipId,
    { 
      $set: { status: newStatus },
      $push: { statusHistory: { status: newStatus } }
    },
    { new: true, runValidators: true, lean: true }
  );

  if (updatedPartnership) {
    // Update status in both businesses' partner lists
    await Business.updateOne(
      { _id: updatedPartnership.businessId1, 'partners.partnerId': updatedPartnership.businessId2 },
      { $set: { 'partners.$.status': newStatus } }
    );
    await Business.updateOne(
      { _id: updatedPartnership.businessId2, 'partners.partnerId': updatedPartnership.businessId1 },
      { $set: { 'partners.$.status': newStatus } }
    );
  }

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