export const paginatedResults = (model, getFilter = () => ({})) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = 6;

      const filter = getFilter(req);

      const totalItems = await model.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / perPage);

      const results = await model
        .find(filter)
        .sort({ date_added: -1 })
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
