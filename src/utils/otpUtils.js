import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import { RequestProduct } from '../models/index.js';

const hashFunction = async (data) => {
  const saltRounds = 10; 
  return bcrypt.hash(data, saltRounds);
};

export const generateOTP = async () => {
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const hashedOTP = await hashFunction(otp);
  return { otp, hashedOTP };
};

export const generateUniqueRef = async () => {
  let isUnique = false;
  let ref;

  while (!isUnique) {
    const randomNumber = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    ref = `INV-${randomNumber}`;

    const existingRequest = await RequestProduct.findOne({ ref });
    if (!existingRequest) {
      isUnique = true;
    }
  }

  return ref;
};
