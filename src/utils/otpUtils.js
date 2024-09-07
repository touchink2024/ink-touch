import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';

const hashFunction = async (data) => {
  const saltRounds = 10; // Salt rounds for bcrypt
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
