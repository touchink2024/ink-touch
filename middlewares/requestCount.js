import { RequestProduct, Return, Wastage } from '../models/index.js';

export const addRequestCountToLocals = async (req, res, next) => {
  try {
    const requestCount = await RequestProduct.countDocuments({
      request_status: 'Pending',
    });
    res.locals.requestCount = requestCount;
    next();
  } catch (error) {
    next(error);
  }
};

export const addReturnCountToLocals = async (req, res, next) => {
  try {
    const returnCount = await Return.countDocuments({
      return_status: 'Pending',
    });
    res.locals.returnCount = returnCount;
    next();
  } catch (error) {
    next(error);
  }
};

export const addWasteCountToLocals = async (req, res, next) => {
  try {
    const wasteCount = await Wastage.countDocuments({
      waste_status: 'Pending',
    });
    res.locals.wasteCount = wasteCount;
    next();
  } catch (error) {
    next(error);
  }
};
