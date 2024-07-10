import dbConnect from './db';
import Business from './models/Business';

export async function getBusiness(businessId) {
  await dbConnect();

  const business = await Business.findById(businessId).lean();

  return business ? JSON.parse(JSON.stringify(business)) : null;
}

export async function getAllBusiness() {
  await dbConnect();

  const businesses = await Business.find().lean();

  return businesses ? JSON.parse(JSON.stringify(businesses)) : null;
}

export async function createBusiness(businessData){
  await dbConnect();

  const newBusiness = new Business(businessData);
  const savedBusiness = await newBusiness.save();

  return JSON.parse(JSON.stringify(savedBusiness));
}

export async function updateBusiness(businessId, updates) {
  await dbConnect();

  const updatedBusiness = await Business.findByIdAndUpdate(
    businessId,
    { $set: updates },
    { new: true, runValidators: true, lean: true }
  );

  return updatedBusiness ? JSON.parse(JSON.stringify(updatedBusiness)) : null;
}

export async function deleteBusiness(businessId) {
  await dbConnect();

  const deletedBusiness = await Business.findByIdAndDelete(businessId).lean();

  return deletedBusiness ? JSON.parse(JSON.stringify(deletedBusiness)) : null;
}

export async function getBusinessByOwner(ownerId) {
  await dbConnect();

  const business = await Business.findOne({ ownerId }).lean();

  return JSON.parse(JSON.stringify(business));
}

export async function searchBusinesses(query) {
  await dbConnect();

  const businesses = await Business.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { type: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
    ]
  }).lean()
  return JSON.parse(JSON.stringify(businesses));
}