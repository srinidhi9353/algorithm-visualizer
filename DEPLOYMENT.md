# Deployment Guide

This guide will help you deploy the Algorithm Learning Platform to GitHub and Netlify.

## 📋 Prerequisites

- [Git](https://git-scm.com/) installed on your computer
- [Node.js](https://nodejs.org/) (version 18 or higher)
- A [GitHub](https://github.com/) account
- A [Netlify](https://www.netlify.com/) account (free tier available)

## 🔧 Step 1: Initialize Git Repository

If you haven't already, initialize git in your project:

```bash
cd project-main
git init
git add .
git commit -m "Initial commit: Algorithm Learning Platform"
```

## 🐙 Step 2: Push to GitHub

### Option A: Create Repository via GitHub Website

1. Go to [GitHub](https://github.com/) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Enter repository name (e.g., `algorithm-learning-platform`)
5. Choose public or private
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

8. Copy the repository URL and run these commands:

```bash
git remote add origin https://github.com/yourusername/algorithm-learning-platform.git
git branch -M main
git push -u origin main
```

### Option B: Create Repository via GitHub CLI

```bash
gh repo create algorithm-learning-platform --public --source=. --remote=origin
git push -u origin main
```

## 🚀 Step 3: Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Sign in to Netlify**
   - Go to [netlify.com](https://www.netlify.com/)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repositories
   - Select your `algorithm-learning-platform` repository

3. **Configure Build Settings**
   - Netlify will auto-detect settings from `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Wait for Deployment**
   - Netlify will build and deploy your site
   - Once complete, you'll get a URL like: `https://random-name-123456.netlify.app`

5. **Custom Domain (Optional)**
   - Go to "Site settings" → "Domain management"
   - Click "Add custom domain"
   - Follow instructions to configure your domain

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify project
netlify init

# Deploy to production
netlify deploy --prod
```

## 🔄 Continuous Deployment

Once connected, Netlify will automatically:
- Deploy whenever you push to the main branch
- Create preview deployments for pull requests
- Run build commands defined in `netlify.toml`

## ⚙️ Environment Variables (if needed)

If your app needs environment variables:

1. In Netlify Dashboard:
   - Go to "Site settings" → "Environment variables"
   - Add your variables (e.g., API keys)

2. In your code, access them with:
   ```typescript
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

3. For local development, create a `.env.local` file:
   ```
   VITE_API_KEY=your_key_here
   ```

## 🎯 Post-Deployment Checklist

- [ ] Verify the site loads correctly
- [ ] Test all major features
- [ ] Check responsive design on mobile
- [ ] Test light/dark mode toggle
- [ ] Verify all algorithms visualize properly
- [ ] Test game functionality
- [ ] Check AI chat interface
- [ ] Verify data structure interactions

## 🔧 Troubleshooting

### Build Fails

- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version matches (18+)
- Run `npm run build` locally to test

### 404 on Refresh

- Ensure `netlify.toml` has the SPA redirect rule
- Check that `publish` directory is set to `dist`

### Assets Not Loading

- Check that asset paths are relative
- Verify Vite base configuration in `vite.config.ts`

## 📊 Monitoring

- **Netlify Analytics**: Enable in site settings for traffic insights
- **Deploy Logs**: Check build and deploy logs for issues
- **Error Tracking**: Consider integrating Sentry or similar

## 🔐 Security Best Practices

- Never commit `.env` files to Git
- Use environment variables for sensitive data
- Keep dependencies updated (`npm audit`)
- Enable Netlify's security headers (already configured in `netlify.toml`)

## 📝 Updating Your Site

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

Netlify will automatically rebuild and deploy!

## 🆘 Getting Help

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community Forums](https://answers.netlify.com/)
- [GitHub Issues](https://github.com/yourusername/algorithm-learning-platform/issues)

---

Happy deploying! 🎉
