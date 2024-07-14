import dbConnect from './db';
import Notification from './models/Notification';

export async function getNotification(notificationId) {
  await dbConnect();
  const notification = await Notification.findById(notificationId).lean();
  return notification ? JSON.parse(JSON.stringify(notification)) : null;
}

export async function getAllNotifications() {
  await dbConnect();
  const notifications = await Notification.find().lean();
  return notifications ? JSON.parse(JSON.stringify(notifications)) : null;
}


export async function getNotificationStatus(senderBusinessId, receiverBusinessId, notificationType) {
  try {
    const notification = await Notification.findOne({
      senderBusinessId: senderBusinessId,
      receiverBusinessId: receiverBusinessId,
      type: notificationType
    }).sort({ createdAt: -1 }); 

    if (notification) {
      return notification.status;
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Error fetching notification status:', error);
    throw error;
  }
}

export async function createNotification(notificationData) {
  await dbConnect();
  const newNotification = new Notification(notificationData);
  const savedNotification = await newNotification.save();
  return JSON.parse(JSON.stringify(savedNotification));
}

export async function updateNotification(notificationId, updates) {
  await dbConnect();
  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    { $set: updates },
    { new: true, runValidators: true, lean: true }
  );
  return updatedNotification ? JSON.parse(JSON.stringify(updatedNotification)) : null;
}

export async function deleteNotification(notificationId) {
  await dbConnect();
  const deletedNotification = await Notification.findByIdAndDelete(notificationId).lean();
  return deletedNotification ? JSON.parse(JSON.stringify(deletedNotification)) : null;
}

export async function getNotificationsByReceiver(receiverBusinessId) {
  await dbConnect();
  const notifications = await Notification.find({ receiverBusinessId }).lean().populate('senderBusinessId')
  return JSON.parse(JSON.stringify(notifications));
}

export async function markNotificationAsRead(notificationId) {
  await dbConnect();
  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    { $set: { isRead: true } },
    { new: true, runValidators: true, lean: true }
  );
  return updatedNotification ? JSON.parse(JSON.stringify(updatedNotification)) : null;
}

export async function getUnreadNotificationsCount(receiverBusinessId) {
  await dbConnect();
  const count = await Notification.countDocuments({ receiverBusinessId, isRead: false });
  return count;
}