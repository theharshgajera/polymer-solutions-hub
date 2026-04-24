import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ImageKit from 'imagekit';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Use multer for handling file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Admin authentication middleware
const requireAdmin = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// 1. Fetch all images in a specific folder
app.get('/api/images', async (req, res) => {
  try {
    const { folder } = req.query;
    if (!folder) return res.status(400).json({ error: 'Folder query param is required' });
    
    const folderPath = folder.startsWith('/') ? folder : `/${folder}`;

    const files = await imagekit.listFiles({
      path: folderPath
    });
    
    res.json(files);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: error.message });
  }
});

// 1.5 Fetch ALL product images grouped by product
app.get('/api/images/all', async (req, res) => {
  try {
    const files = await imagekit.listFiles({
      path: '/products'
    });
    
    // Group by folder
    const grouped = {};
    files.forEach(file => {
      // The folderPath in ImageKit is usually something like '/products/ptfe/'
      // Let's extract the last part
      const parts = file.folderPath.split('/').filter(Boolean);
      if (parts.length >= 2 && parts[0] === 'products') {
        const productId = parts[1];
        if (!grouped[productId]) grouped[productId] = [];
        grouped[productId].push(file.url);
      }
    });
    
    res.json(grouped);
  } catch (error) {
    console.error("Error fetching all images:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Upload multiple images
app.post('/api/images/upload', requireAdmin, upload.array('files'), async (req, res) => {
  try {
    const { folder } = req.body;
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files provided' });
    if (!folder) return res.status(400).json({ error: 'Folder is required' });

    const folderPath = folder.startsWith('/') ? folder : `/${folder}`;

    const uploadPromises = req.files.map(file => {
      return imagekit.upload({
        file: file.buffer, // Buffer
        fileName: file.originalname,
        folder: folderPath,
        useUniqueFileName: true
      });
    });

    const uploadResponses = await Promise.all(uploadPromises);

    res.json(uploadResponses);
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Delete image
app.delete('/api/images/:fileId', requireAdmin, async (req, res) => {
  try {
    const { fileId } = req.params;
    await imagekit.deleteFile(fileId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Serve the compiled React frontend for production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ImageKit Backend running on port ${PORT}`);
});
