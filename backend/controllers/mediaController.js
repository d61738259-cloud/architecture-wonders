import { cloudinary, isConfigured } from '../config/cloudinary.js';
import Media from '../models/Media.js';

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload.' });
    }

    const { folder = 'architecture-wonders', altText = '', tags = '' } = req.body;
    const tagList = tags ? tags.split(',').map((t) => t.trim()) : [];

    if (isConfigured) {
      // Upload buffer directly to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ success: false, message: error.message });
          }

          const media = await Media.create({
            originalFilename: req.file.originalname,
            url: result.secure_url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
            folder,
            altText,
            tags: tagList,
          });

          return res.status(201).json({
            success: true,
            message: 'Image uploaded to Cloudinary successfully.',
            media,
          });
        }
      );

      uploadStream.end(req.file.buffer);
    } else {
      // Graceful Base64/Data URI fallback until Cloudinary API keys are supplied
      const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      const media = await Media.create({
        originalFilename: req.file.originalname,
        url: base64Data,
        secureUrl: base64Data,
        publicId: `local-${Date.now()}`,
        format: req.file.mimetype.split('/')[1] || 'jpeg',
        bytes: req.file.size,
        folder,
        altText,
        tags: tagList,
      });

      return res.status(201).json({
        success: true,
        message: 'Image uploaded successfully (Local buffer storage). Configure Cloudinary credentials in .env to stream directly to Cloudinary CDN.',
        media,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getMediaList = async (req, res, next) => {
  try {
    const { page = 1, limit = 24 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Media.countDocuments();
    const media = await Media.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.json({
      success: true,
      count: media.length,
      total,
      media,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found.' });
    }

    if (isConfigured && media.publicId && !media.publicId.startsWith('local-')) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (e) {
        console.warn(`[Cloudinary destroy error] ${e.message}`);
      }
    }

    await Media.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Media record removed.',
    });
  } catch (error) {
    next(error);
  }
};
