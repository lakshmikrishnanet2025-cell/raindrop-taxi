const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const SITE_FILE = path.join(__dirname, 'site.json');
const ASSETS = path.join(__dirname, 'public', 'assets');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// GET site content
app.get('/api/content', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(SITE_FILE, 'utf8'));
    res.json({ok:true, data});
  } catch (e) {
    res.status(500).json({ok:false, error: e.message});
  }
});

// Simple auth middleware
function checkAuth(req, res, next){
  const token = req.headers['x-admin-token'] || req.query.token;
  if(token && token === ADMIN_TOKEN) return next();
  return res.status(401).json({ok:false, error:'Unauthorized - missing or invalid admin token'});
}

// Update site content (JSON)
app.post('/api/update', checkAuth, (req, res) => {
  try {
    const body = req.body;
    // Basic validation
    const allowed = ['brand','driver_name','driver_phone','upi','description','logo','car_image','driver_image'];
    const current = JSON.parse(fs.readFileSync(SITE_FILE, 'utf8'));
    for(const k of allowed){
      if(typeof body[k] !== 'undefined') current[k] = body[k];
    }
    fs.writeFileSync(SITE_FILE, JSON.stringify(current, null, 2), 'utf8');
    res.json({ok:true, data: current});
  } catch (e) {
    res.status(500).json({ok:false, error: e.message});
  }
});

// Image upload endpoint
const storage = multer.diskStorage({
  destination: function(req, file, cb){ cb(null, ASSETS); },
  filename: function(req, file, cb){
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

app.post('/api/upload', checkAuth, upload.single('image'), (req, res) => {
  if(!req.file) return res.status(400).json({ok:false, error:'No file'});
  const rel = path.join('assets', req.file.filename).replace(/\\/g,'/');
  res.json({ok:true, path:rel});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
