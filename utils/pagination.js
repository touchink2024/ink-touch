export const paginatedResults = (model, getFilter = () => ({})) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = 6;

      // const filter = getFilter(req);

      // Get the filter based on request and add custom filters if needed
      const filter = { ...getFilter(req), ...req.customFilter };

      const totalItems = await model.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / perPage);

      const results = await model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      res.paginatedResults = {
        results,
        currentPage: page,
        totalPages,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};

export const userRequestFilter = (req) => {
  if (req.currentUser) {
    return { userId: req.currentUser._id };
  }
  return {};
};

export const pendingRequestFilter = () => {
  return { request_status: 'Pending' };
};

export const rejectedRequestFilter = () => {
  return { request_status: 'Declined' };
};

export const acceptRequestFilter = () => {
  return { request_status: 'Accept' };
};

export const pendingReturnFilter = () => {
  return { return_status: 'Pending' };
};

export const acceptReturnFilter = () => {
  return { return_status: 'Approved' };
};

export const rejectedReturnFilter = () => {
  return { return_status: 'Rejected' };
};

export const pendingWasteFilter = () => {
  return { waste_status: 'Pending' };
};

export const acceptWasteFilter = () => {
  return { waste_status: 'Approved' };
};

export const rejectedWasteFilter = () => {
  return { waste_status: 'Rejected' };
};
