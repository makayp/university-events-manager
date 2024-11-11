import { v2 as cloudinary } from 'cloudinary';

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.log('failed to launch cloudinary', error);
}

export async function uploadImage({
  image,
  folder,
}: {
  image: File;
  folder: string;
}) {
  try {
    const imageData = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(imageData).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: `eventhub/${folder}`,
    });

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);

    throw new Error('Failed to upload image to Cloudinary');
  }
}

export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
}
