import otpGenerator from 'otp-generator';
import { RequestProduct } from '../models/index.js';

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
