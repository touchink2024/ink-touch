import cloudinary from 'cloudinary';
import { config } from './config.js';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiName,
  api_secret: config.cloudinarySecretName,
});

export { cloudinary };
