'use strict';
import { Product, RequestProduct, Wastage, Return } from '../models/index.js';

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
