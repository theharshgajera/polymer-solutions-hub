import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ImageKit from 'imagekit';
import multer from 'multer';
import mongoose from 'mongoose';
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

// ---------------------------------------------------------------------------
// MongoDB (dedicated database for this project on the shared Atlas cluster)
// ---------------------------------------------------------------------------
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log(`MongoDB connected (db: ${mongoose.connection.name})`))
    .catch((err) => console.error('MongoDB connection error:', err.message));
} else {
  console.warn('MONGODB_URI not set — blog endpoints will not work.');
}

const blogSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    text: { type: String, default: '' },
    tags: { type: [String], default: [] },
    image: { type: String, default: '' },     // ImageKit URL
    imageFileId: { type: String, default: '' } // ImageKit fileId (for deletion)
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

// Parse a tags value that may arrive as a JSON array, comma string, or array
const parseTags = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map((t) => String(t).trim()).filter(Boolean);
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map((t) => String(t).trim()).filter(Boolean);
  } catch {
    // not JSON — fall through to comma-splitting
  }
  return String(raw)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
};

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

// ---------------------------------------------------------------------------
// Blog endpoints
// ---------------------------------------------------------------------------

// List all blogs (newest first)
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog
app.get('/api/blogs/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a blog (admin) — optional image upload to ImageKit
app.post('/api/blogs', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const { heading, text } = req.body;
    if (!heading || !heading.trim()) {
      return res.status(400).json({ error: 'Heading is required' });
    }

    let image = '';
    let imageFileId = '';
    if (req.file) {
      const uploaded = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/blogs',
        useUniqueFileName: true
      });
      image = uploaded.url;
      imageFileId = uploaded.fileId;
    }

    const blog = await Blog.create({
      heading: heading.trim(),
      text: text || '',
      tags: parseTags(req.body.tags),
      image,
      imageFileId
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a blog (admin) — optional new image replaces the old one
app.put('/api/blogs/:id', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const { heading, text } = req.body;
    if (heading !== undefined) blog.heading = heading.trim();
    if (text !== undefined) blog.text = text;
    if (req.body.tags !== undefined) blog.tags = parseTags(req.body.tags);

    if (req.file) {
      const uploaded = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/blogs',
        useUniqueFileName: true
      });
      // Best-effort cleanup of the previous image
      if (blog.imageFileId) {
        try {
          await imagekit.deleteFile(blog.imageFileId);
        } catch (e) {
          console.warn('Could not delete old blog image:', e.message);
        }
      }
      blog.image = uploaded.url;
      blog.imageFileId = uploaded.fileId;
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog (admin) — also removes its ImageKit image
app.delete('/api/blogs/:id', requireAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (blog.imageFileId) {
      try {
        await imagekit.deleteFile(blog.imageFileId);
      } catch (e) {
        console.warn('Could not delete blog image:', e.message);
      }
    }

    await blog.deleteOne();
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: error.message });
  }
});

// ---------------------------------------------------------------------------
// Dynamic sitemap.xml (static pages + blog posts) — defined before static
// serving so it always wins over any file in /dist or /public.
// ---------------------------------------------------------------------------
const SITE_URL = 'https://multitechpolymers.in';

app.get('/sitemap.xml', async (req, res) => {
  try {
    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'weekly' },
      { loc: '/about', priority: '0.8', changefreq: 'monthly' },
      { loc: '/products', priority: '0.9', changefreq: 'weekly' },
      { loc: '/industries', priority: '0.7', changefreq: 'monthly' },
      { loc: '/blogs', priority: '0.7', changefreq: 'weekly' },
      { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
    ];

    let blogs = [];
    try {
      blogs = await Blog.find().select('_id updatedAt').sort({ createdAt: -1 });
    } catch {
      // DB unavailable — still return the static sitemap
    }

    const urls = [
      ...staticPages.map(
        (p) =>
          `  <url><loc>${SITE_URL}${p.loc}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
      ),
      ...blogs.map(
        (b) =>
          `  <url><loc>${SITE_URL}/blogs/${b._id}</loc><lastmod>${new Date(
            b.updatedAt
          ).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
      ),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
      '\n'
    )}\n</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// 4. Serve the compiled React frontend for production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

// SPA fallback — Express 5 requires a named wildcard ('*' alone is invalid)
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ImageKit Backend running on port ${PORT}`);
});
