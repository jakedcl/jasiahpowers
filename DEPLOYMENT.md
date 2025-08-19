# Jasiah Powers Portfolio - Deployment Guide

## 🚀 **Current Architecture (2024)**

### **Modern Stack:**
- **Frontend**: React 17 + Vite (hosted on Vercel)
- **Backend**: Serverless API Functions (Vercel Functions)
- **CMS**: Sanity Studio (headless CMS)
- **Images**: Sanity CDN (replaced Cloudinary)
- **Hosting**: Vercel (single deployment)
- **Source Control**: GitHub

### **Live URLs:**
- **Website**: https://jasiahpowers.vercel.app
- **GitHub**: https://github.com/jakedcl/jasiahpowers
- **CMS Studio**: https://jasiahpowers.sanity.studio/

---

## 📦 **Repository Structure**

```
jasiahpowers/
├── 📁 client/                    # React frontend (Vite)
├── 📁 api/                       # Vercel serverless functions
├── 📁 studio/                    # Sanity CMS studio
├── vercel.json                   # Deployment configuration
└── package.json                  # Root dependencies
```

---

## 🔄 **Deployment Process**

### **Automatic Deployment:**
1. Push code to GitHub: `git push`
2. Vercel automatically builds and deploys
3. Website updates in ~2 minutes

### **Manual Deployment:**
```bash
vercel --prod
```

---

## 🛠️ **Local Development**

### **Start All Services:**
```bash
# Frontend (React app)
cd client && npm run dev          # http://localhost:5174

# Sanity Studio (CMS)
cd studio && npm run dev          # http://localhost:3333

# Test production build
vercel dev                        # http://localhost:3000
```

---

## 🎨 **Content Management**

### **For Jasiah (Content Editor):**
1. Go to: https://jasiahpowers.sanity.studio/
2. Add/edit:
   - **Projects** (POLO, TELFAR, PUMA campaigns)
   - **Photos** (individual gallery images)
   - **Videos** (YouTube content)
   - **Site Settings** (logo, social links, contact)
3. Changes appear instantly on website

---

## 🔧 **API Endpoints**

All endpoints are serverless functions:
- `GET /api/projects` - All photography projects
- `GET /api/projects/[slug]` - Single project by slug
- `GET /api/photos` - Gallery photos
- `GET /api/videos` - YouTube videos
- `GET /api/site-settings` - Global site configuration
- `GET /api/homepage` - Homepage content

---

## 📱 **Components Architecture**

### **Pages:**
- **HomePage**: Featured video + navigation menu
- **ProjectsPage**: Brand campaign grid (POLO, TELFAR, etc.)
- **ProjectPage**: Individual project galleries
- **PhotosPage**: Personal photography gallery  
- **VideoPage**: YouTube video portfolio

### **Layout:**
- **Header**: Home + current page navigation
- **Footer**: Social media links + copyright
- **Layout**: Wrapper for inner pages (excludes homepage)

### **Styling:**
- **Framework**: Material-UI (MUI) v5
- **Theme**: Custom pink/beige aesthetic
- **Responsive**: Mobile-first design
- **Typography**: Helvetica-based font stack

---

## ⚙️ **Environment Variables**

### **Production (Vercel):**
- `VITE_BACKEND_URL` = `https://jasiahpowers.vercel.app`

### **Local Development:**
- `VITE_BACKEND_URL` = `http://localhost:5001` (for legacy testing)

---

## 📊 **Migration from Old Architecture**

### **Previous Setup (Deprecated):**
- ❌ Frontend: Hostinger (manual upload)
- ❌ Backend: Render (separate hosting)
- ❌ Images: Cloudinary (external service)
- ❌ Deployment: Manual build + upload process

### **Current Setup (Improved):**
- ✅ **Single Vercel deployment** (frontend + backend)
- ✅ **GitHub integration** (auto-deploy on push)
- ✅ **Sanity CMS** (better content management)
- ✅ **Serverless functions** (scalable backend)
- ✅ **Integrated CDN** (faster image delivery)

---

## 🚨 **Emergency Procedures**

### **Rollback Deployment:**
```bash
# Via Vercel dashboard or CLI
vercel rollback [deployment-url]
```

### **Content Issues:**
- Access Sanity Studio: https://jasiahpowers.sanity.studio/
- Check Sanity project: https://sanity.io/manage

### **Code Issues:**
- Check GitHub: https://github.com/jakedcl/jasiahpowers
- View build logs: https://vercel.com/dashboard

---

## 👥 **Access Credentials**

### **Development:**
- **GitHub**: jakedcl account
- **Vercel**: jakedcl account  
- **Sanity**: jasiahsteez@gmail.com

### **Content Management:**
- **Sanity Studio**: https://jasiahpowers.sanity.studio/
- **Account**: jasiahsteez@gmail.com

---

*Last updated: August 2024*
