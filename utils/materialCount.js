'use strict';

import cron from 'node-cron';
import { sendMail, requestReminderMail } from '../utils/index.js';
import {
  User,
  Product,
  RequestProduct,
  Wastage,
  Return,
} from '../models/index.js';

async function getMaterialCounts(model, category, quantityField) {
  const data = await model.aggregate([
    { $match: { category: { $regex: new RegExp(category, 'i') } } },
    { $group: { _id: '$size', totalQuantity: { $sum: `$${quantityField}` } } },
  ]);

  const materialCounts = {};
  data.forEach((item) => {
    materialCounts[item._id] = item.totalQuantity;
  });

  return materialCounts;
}

// Functions for each model
export async function getAvailableMaterials(category) {
  return getMaterialCounts(Product, category, 'totalQuantity');
}

export async function getRequestedMaterials(category) {
  return getMaterialCounts(RequestProduct, category, 'quantity_requested');
}

export async function getWastedMaterials(category) {
  return getMaterialCounts(Wastage, category, 'waste_quantity');
}

export async function getReturnedMaterials(category) {
  return getMaterialCounts(Return, category, 'return_quantity');
}

// Check every minute for expired requests
cron.schedule('* * * * *', async () => {
  const now = new Date();

  const expiredRequests = await RequestProduct.find({
    request_status: 'Accept',
    expiryTime: { $lte: now },
  });

  for (const request of expiredRequests) {
    const user = await User.findById(request.userId);
    if (user) {
      const emailContent = requestReminderMail(
        request.adminEmail,
        user,
        request
      );
      await sendMail(emailContent);

      console.log(`Sent reminder to admin for request ${request._id}`);

      await request.save();
    }
  }
});
