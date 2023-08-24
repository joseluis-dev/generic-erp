import { v2 as cloudinary } from 'cloudinary'

// Confing
cloudinary.config({
  cloud_name: 'jl-img-store',
  api_key: '645658438189963',
  api_secret: 'adhST1zwTj5QpsnIw7Qu6xIV3K4'
})

// Upload
export async function uploadCloudImage (filePath: string): Promise<any> {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'ProfileImages'
  })
}

// Generate
export async function generateCloudImage (publicID: string): Promise<any> {
  return cloudinary.url(publicID, {
    width: 100,
    height: 150,
    Crop: 'fill'
  })
}

export async function generateCloudCropImage (publicID: string): Promise<any> {
  return cloudinary.url(publicID, {
    transformation: [
      { gravity: 'face', height: 800, width: 800, crop: 'crop' },
      { radius: 'max' },
      { width: 200, crop: 'scale' },
      { fetch_format: 'auto' }
    ],
    secure: true
  })
}

// Delete
export async function deleteCloudImage (publicID: string): Promise<any> {
  return await cloudinary.uploader.destroy(publicID)
}
