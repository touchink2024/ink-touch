'use strict';
import { cloudinary } from '../configs/index.js';
import { Conflict, HttpError } from '../middlewares/index.js';
import { sendMail } from '../utils/index.js';
import { asyncHandler } from '../helper/index.js';
import bcrypt from 'bcryptjs';
import {
  User,
  Product,
  RequestProduct,
  Wastage,
  Return,
} from '../models/index.js';
import {
  productSchema,
  addUserSchema,
  updateProfileSchema,
} from '../schema/index.js';
import {
  sanitizeObject,
  welcomeEmail,
  approveEmail,
  accountStatusMail,
  requestUpdateMail,
  wasteUpdateMail,
  updateProfile,
  returnUpdateMail,
  getAvailableMaterials,
  getRequestedMaterials,
  getWastedMaterials,
  getReturnedMaterials,
} from '../utils/index.js';

export const adminIndex = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  const requestProducts = await RequestProduct.countDocuments();
  const wastage = await Wastage.countDocuments();
  const totalRequestProducts = await RequestProduct.countDocuments({
    request_status: 'Accept',
  });
  const totalWastage = await Wastage.countDocuments({
    waste_status: 'Approved',
  });

  res.render('admin/index', {
    user,
    allProducts: results,
    currentPage,
    totalPages,
    totalRequestProducts,
    totalWastage,
    requestProducts,
    wastage,
  });
});

export const uploadAdminImage = asyncHandler(async (req, res) => {
  const user = req.currentUser;

  const file = req.file;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded.',
    });
  }

  const cloudinaryResult = await cloudinary.uploader.upload(file.path);

  const image = {
    imageId: cloudinaryResult.public_id,
    imageUrl: cloudinaryResult.secure_url,
  };
  user.image = image;
  await user.save();
  const callbackUrl = '/admin/index';
  return res.status(200).json({
    callbackUrl,
    success: true,
    message: 'Image uploaded successfully',
  });
});

export const allUser = (req, res) => {
  const user = req.currentUser;

  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/all-user', {
    user,
    users: results,
    currentPage,
    totalPages,
  });
};

export const addUser = (req, res) => {
  const user = req.currentUser;
  res.render('admin/add-user', { user });
};

export const addUserPost = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = addUserSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const { name, email, phone_number, address, city, state, password, role } =
    value;
  const user = await User.findOne({
    $or: [{ email: email }, { phone_number: phone_number }],
  });

  if (user) {
    if (user.email === email) {
      throw new Conflict('Email already exists');
    }
    if (user.phone_number === phone_number) {
      throw new Conflict('Number already registered', 409);
    }
  }

  const newUser = new User({
    name,
    email,
    phone_number,
    address,
    city,
    state,
    password,
    role,
    isVerified: true,
  });

  await newUser.save();

  const emailContent = welcomeEmail(newUser);
  await sendMail(emailContent);

  const redirectUrl = `/admin/all-user`;
  res
    .status(200)
    .json({ redirectUrl, success: true, message: 'Registeration successful' });
});

export const updateAccountStatus = asyncHandler(async (req, res) => {
  const { userId, accountStatus } = req.body;
  const validStatuses = ['Active', 'Locked'];

  if (!validStatuses.includes(accountStatus)) {
    throw new HttpError(400, 'Invalid account status.');
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.accountStatus = accountStatus;
  user.failedLoginAttempts = 0;
  await user.save();

  const emailContent = accountStatusMail(user);
  await sendMail(emailContent);

  res.status(200).json({ message: 'Status updated successfully' });
});

export const verifyAccount = asyncHandler(async (req, res) => {
  const { userId, verifyStatus } = req.body;
  const validStatuses = ['false', 'true'];

  if (!validStatuses.includes(verifyStatus)) {
    throw new HttpError(400, 'Invalid account status.');
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.isVerified = verifyStatus;
  await user.save();

  const emailContent = approveEmail(user);
  await sendMail(emailContent);

  res.status(200).json({ message: 'Access updated successfully' });
});

export const viewUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({ success: true, userInfo: user });
});

export const editUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const editUserInfo = await User.findById(userId);
  if (!editUserInfo) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({ success: true, editUserInfo });
});

export const editUserPost = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  const { name, email, phone_number, address, city, state, role } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name,
        email,
        phone_number,
        address,
        city,
        state,
        role,
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found or update failed',
    });
  }

  const redirectUrl = '/admin/all-user';
  res.status(201).json({
    user: updatedUser,
    redirectUrl,
    success: true,
    message: 'User successfully updated',
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const users = await User.findById(req.params.userId);
  if (!users) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  await User.findByIdAndDelete(req.params.userId);
  const redirectUrl = '/admin/all-user';
  res.status(201).json({
    redirectUrl,
    success: true,
    user,
    message: 'user deleted successfully',
  });
});

export const addProduct = (req, res) => {
  const user = req.currentUser;
  res.render('admin/add-product', { user });
};

export const addProductPost = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = productSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const category = value.newCategory || value.category;
  const size = value.newSize || value.size;
  const { totalQuantity, narration } = value;

  const existingProduct = await Product.findOne({ category, size });

  if (existingProduct) {
    existingProduct.totalQuantity = parseFloat(
      (existingProduct.totalQuantity + parseFloat(totalQuantity)).toFixed(2)
    );
    await existingProduct.save();

    return res.status(200).json({
      redirectUrl: '/admin/all-product',
      success: true,
      message: `Quantity added. The new total quantity for ${category} (${size}) is ${existingProduct.totalQuantity}.`,
    });
  } else {
    const newProduct = new Product({
      category,
      size,
      totalQuantity: parseFloat(totalQuantity.toFixed(2)),
      narration,
    });

    await newProduct.save();
    return res.status(200).json({
      redirectUrl: '/admin/all-product',
      success: true,
      message: `New product added successfully.`,
    });
  }
});

export const allProduct = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/all-product', {
    user,
    product: results,
    currentPage,
    totalPages,
  });
};

export const editProduct = asyncHandler(async (req, res) => {
  const proId = req.params.Id;
  const editProductInfo = await Product.findById(proId);
  if (!editProductInfo) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  res.status(200).json({ success: true, editProductInfo });
});

export const editProductPost = asyncHandler(async (req, res) => {
  const proId = req.params.Id;
  if (!proId) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  const { category, size, totalQuantity, narration } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    proId,
    {
      $set: {
        category,
        size,
        totalQuantity: parseFloat(totalQuantity).toFixed(2),
        narration,
      },
    },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found or update failed',
    });
  }

  const redirectUrl = '/admin/all-product';
  res.status(201).json({
    products: updatedProduct,
    redirectUrl,
    success: true,
    message: 'Product successfully updated',
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.Id;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  await Product.findByIdAndDelete(productId);
  const redirectUrl = '/admin/all-product';
  res.status(201).json({
    redirectUrl,
    success: true,
    message: 'Product deleted successfully',
  });
});

export const requestProduct = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;
  res.render('admin/request', {
    user,
    allRequest: results,
    currentPage,
    totalPages,
  });
});

export const requestProductPost = asyncHandler(async (req, res) => {
  const { requestId, request_status } = req.body;
  const validStatuses = ['Pending', 'Accept', 'Declined'];

  if (!validStatuses.includes(request_status)) {
    throw new HttpError(400, 'Invalid request status.');
  }

  const request = await RequestProduct.findById(requestId);
  if (!request) {
    return res
      .status(404)
      .json({ success: false, message: 'Request not found.' });
  }

  const user = await User.findById(request.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  if (request_status === 'Accept') {
    const product = await Product.findOne({
      category: request.category,
      size: request.size,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' });
    }

    const availableQuantity = parseFloat(product.totalQuantity.toFixed(2));
    const requestedQuantity = parseFloat(request.quantity_requested.toFixed(2));

    if (availableQuantity < requestedQuantity) {
      return res
        .status(400)
        .json({ success: false, message: 'Insufficient product quantity.' });
    }

    product.totalQuantity = availableQuantity - requestedQuantity;
    await product.save();

    request.request_status = 'Accept';
    await request.save();
  } else if (request_status === 'Declined') {
    request.request_status = 'Declined';
    await request.save();
  }

  const emailContent = requestUpdateMail(user, request, request_status);
  await sendMail(emailContent);

  return res.status(200).json({
    success: true,
    message: `Request ${request_status} successfully.`,
  });
});

export const acceptRequest = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/accept-request', {
    user,
    acptRequest: results,
    currentPage,
    totalPages,
  });
};

export const rejectRequest = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/reject-request', {
    user,
    rjtRequest: results,
    currentPage,
    totalPages,
  });
};

export const returnProduct = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/all-return', {
    user,
    returnProd: results,
    currentPage,
    totalPages,
  });
};

export const returnProductPost = asyncHandler(async (req, res) => {
  const { returnId, return_status } = req.body;
  const validStatuses = ['Pending', 'Approved', 'Rejected'];

  if (!validStatuses.includes(return_status)) {
    throw new HttpError(400, 'Invalid request status.');
  }

  const returned = await Return.findById(returnId);
  if (!returned) {
    return res
      .status(404)
      .json({ success: false, message: 'Return not found.' });
  }

  const user = await User.findById(returned.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  if (return_status === 'Approved') {
    const product = await Product.findOne({
      category: returned.category,
      size: returned.size,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' });
    }

    const totalQuantity = parseFloat(product.totalQuantity.toFixed(2));
    const returnQuantity = parseFloat(returned.return_quantity.toFixed(2));

    product.totalQuantity = parseFloat(
      (totalQuantity + returnQuantity).toFixed(2)
    );
    await product.save();

    returned.return_status = 'Approved';
    await returned.save();
  } else if (return_status === 'Rejected') {
    returned.return_status = 'Rejected';
    await returned.save();
  }

  const emailContent = returnUpdateMail(user, returned, return_status);
  await sendMail(emailContent);

  return res.status(200).json({
    success: true,
    message: `Return ${return_status} successfully.`,
  });
});

export const acceptReturnProduct = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/accept-return', {
    user,
    acptRequest: results,
    currentPage,
    totalPages,
  });
};

export const rejectReturnProduct = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/reject-return', {
    user,
    rjtReturn: results,
    currentPage,
    totalPages,
  });
};

export const allWastages = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/all-wastage', {
    user,
    allWaste: results,
    currentPage,
    totalPages,
  });
};

export const allWastagesPost = asyncHandler(async (req, res) => {
  const { wasteId, waste_status } = req.body;
  const validStatuses = ['Pending', 'Approved', 'Rejected'];

  if (!validStatuses.includes(waste_status)) {
    throw new HttpError(400, 'Invalid request status.');
  }

  const waste = await Wastage.findById(wasteId);
  if (!waste) {
    return res
      .status(404)
      .json({ success: false, message: 'Waste not found.' });
  }

  const user = await User.findById(waste.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  if (waste_status === 'Approved') {
    const product = await Product.findOne({
      category: waste.category,
      size: waste.size,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' });
    }

    waste.waste_status = 'Approved';
    await waste.save();
  } else if (waste_status === 'Rejected') {
    waste.waste_status = 'Rejected';
    await waste.save();
  }

  const emailContent = wasteUpdateMail(user, waste, waste_status);
  await sendMail(emailContent);

  return res.status(200).json({
    success: true,
    message: `Waste ${waste_status} successfully.`,
  });
});

export const acceptWaste = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/accept-wastage', {
    user,
    acptWaste: results,
    currentPage,
    totalPages,
  });
};

export const rejectWaste = (req, res) => {
  const user = req.currentUser;
  if (!res.paginatedResults) {
    return res.status(404).json({
      success: false,
      message: 'Paginated results not found',
    });
  }
  const { results, currentPage, totalPages } = res.paginatedResults;

  res.render('admin/reject-wastage', {
    user,
    rjtWaste: results,
    currentPage,
    totalPages,
  });
};

export const adminProfile = (req, res) => {
  const user = req.currentUser;
  res.render('admin/profile', { user });
};

export const adminProfilePost = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const sanitizedBody = sanitizeObject(req.body);
  const {
    name,
    email,
    phone_number,
    current_password,
    new_password,
    address,
    city,
    state,
  } = sanitizedBody;

  const { error, value } = updateProfileSchema.validate(sanitizedBody, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const existingUser = await User.findById(user._id).select('+password');
  if (!existingUser) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  let updatedFields = {
    name,
    email,
    phone_number,
    address,
    city,
    state,
  };

  if (current_password && new_password) {
    const isPasswordMatch = await bcrypt.compare(
      current_password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    updatedFields.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, updatedFields, {
    new: true,
  });

  const emailContent = updateProfile(user, updatedUser);
  await sendMail(emailContent);

  const redirectUrl = '/admin/profile';
  return res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Profile updated successfully.',
  });
});

export const userReport = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const users = await User.find({}, 'name');
  if (!users || users.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: 'Users not found.' });
  }

  res.render('admin/user-report', { user, users });
});

export const getOperatorReport = asyncHandler(async (req, res) => {
  const { operator, event } = req.query;
  const page = parseInt(req.query.page) || 1;
  const perPage = 6; // Number of items per page

  let reportData;
  const filter = { operator };

  if (event === 'Requests') {
    reportData = await RequestProduct.find(filter);
  } else if (event === 'Wastages') {
    reportData = await Wastage.find(filter);
  } else if (event === 'Returns') {
    reportData = await Return.find(filter);
  }

  if (!reportData || reportData.length === 0) {
    return res.status(404).json({ error: 'No data found' });
  }

  const totalItems = reportData.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const paginatedData = reportData.slice((page - 1) * perPage, page * perPage);

  res.json({
    results: paginatedData,
    currentPage: page,
    totalPages,
    totalItems,
  });
});

export const materialReport = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.render('admin/material-report', { user });
});

export const getMaterialReport = asyncHandler(async (req, res) => {
  const { type, category } = req.query;

  let reportData = {
    Flex: {},
    SAV: {},
  };

  if (type === 'Available Materials') {
    reportData.Flex = await getAvailableMaterials('Flex');
    reportData.SAV = await getAvailableMaterials('Sav');
  } else if (type === 'Materials Wasted') {
    reportData.Flex = await getWastedMaterials('Flex');
    reportData.SAV = await getWastedMaterials('Sav');
  } else if (type === 'Materials Request') {
    reportData.Flex = await getRequestedMaterials('Flex');
    reportData.SAV = await getRequestedMaterials('Sav');
  } else if (type === 'Materials Returned') {
    reportData.Flex = await getReturnedMaterials('Flex');
    reportData.SAV = await getReturnedMaterials('Sav');
  }
  console.log('Report Data:', reportData);
  res.json(reportData);
});

export const searchReport = asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const users = await User.find({}, 'name');
  if (!users || users.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: 'Users not found.' });
  }
  res.render('admin/search-report', { user, users });
});

export const getMaterialsByDate = asyncHandler(async (req, res) => {
  const { fromdate, todate } = req.body;
  const page = parseInt(req.query.page) || 1;
  const perPage = 6;

  const startDate = new Date(fromdate);
  const endDate = new Date(todate);
  endDate.setHours(23, 59, 59, 999);

  const requestProducts = await RequestProduct.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const wastages = await Wastage.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const returns = await Return.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const allMaterials = [
    ...requestProducts.map((item) => ({ type: 'Request', ...item._doc })),
    ...wastages.map((item) => ({ type: 'Wastage', ...item._doc })),
    ...returns.map((item) => ({ type: 'Return', ...item._doc })),
  ];

  const sortedMaterials = allMaterials.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const totalItems = sortedMaterials.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const paginatedMaterials = sortedMaterials.slice(
    (page - 1) * perPage,
    page * perPage
  );

  res.json({
    results: paginatedMaterials,
    currentPage: page,
    totalPages,
    totalItems,
  });
});

export const adminLogout = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const logoutRedirectUrl = '/auth/login';

  res.setHeader('Clear-Site-Data', '"cookies"');
  res.clearCookie('accessToken');

  res
    .status(200)
    .json({ logoutRedirectUrl, success: true, message: 'You are logged out!' });
  res.end();
});
