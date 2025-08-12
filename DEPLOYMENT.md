# Deployment Guide - Vercel

This guide will help you deploy the Branded Content Briefing Dashboard to Vercel for use by your sales team.

## Prerequisites

1. **GitHub Account**: Your code needs to be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Branded Content Briefing Dashboard"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com](https://github.com) and create a new repository
   - Follow GitHub's instructions to push your local code

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/branded-content-briefing-dashboard.git
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Web Interface (Recommended)

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Sign In**: Use your GitHub account to sign in
3. **Import Project**: 
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository
4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (default)
5. **Deploy**: Click "Deploy" button

### Option B: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   
3. **Follow prompts**:
   - Login with your Vercel account
   - Confirm project settings
   - Deploy

## Step 3: Configuration

The application is pre-configured for Vercel with:
- ✅ `vercel.json` - Deployment configuration
- ✅ `next.config.js` - Next.js optimization settings
- ✅ `.gitignore` - Proper file exclusions
- ✅ App Router - Modern Next.js architecture

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Domains" tab
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Example domains**:
   - `content-briefing.yourcompany.com`
   - `sales-tools.yourcompany.com`

## Step 5: Team Access

1. **Invite Team Members**:
   - In Vercel dashboard, go to project settings
   - Click "Members" 
   - Invite sales team members
   - Set appropriate permissions

## Step 6: Updates and Maintenance

### Automatic Deployments
- Every push to `main` branch triggers new deployment
- Preview deployments for pull requests
- Rollback capability through Vercel dashboard

### Manual Deployment
```bash
# Make changes to your code
git add .
git commit -m "Update: your changes"
git push origin main
# Vercel automatically deploys
```

## Performance & Features

### What's Included:
- ✅ **Responsive Design**: Works on desktop, tablet, mobile
- ✅ **PDF Export**: Generate professional client presentations
- ✅ **Fast Loading**: Optimized for global CDN delivery
- ✅ **Professional UI**: Sales-team ready interface
- ✅ **Comprehensive Blueprints**: 7-section strategic analysis

### Expected Performance:
- **Load Time**: < 2 seconds globally
- **Form Completion**: 3-5 minutes
- **Blueprint Generation**: Instant (3 seconds with animation)
- **PDF Export**: 2-3 seconds for complete document

## URLs After Deployment

- **Production**: `https://your-project-name.vercel.app`
- **Custom Domain**: `https://your-custom-domain.com` (if configured)
- **Preview**: Unique URLs for each pull request

## Sales Team Usage

Once deployed, share the URL with your sales team. They can:

1. **Access Immediately**: No login required
2. **Generate Blueprints**: Complete form in 3-5 minutes
3. **Export for Clients**: PDF download and clipboard copy
4. **Mobile Access**: Use on phones/tablets during client meetings

## Troubleshooting

### Common Issues:

**Build Failures**:
- Check that all dependencies install correctly
- Ensure TypeScript types are valid
- Verify Tailwind CSS configuration
- If you see "Couldn't find any pages or app directory" error, ensure the `app` folder exists

**Deployment Issues**:
- Confirm GitHub repository is public or Vercel has access
- Check build logs in Vercel dashboard
- Verify `next.config.js` settings
- Make sure all files are committed to Git before deployment

**Performance Issues**:
- Monitor usage in Vercel analytics
- Consider upgrading Vercel plan for high traffic
- Check browser console for JavaScript errors

### Support:
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Create issues in your repository

## Security & Privacy

- **No Data Storage**: All processing happens client-side
- **No User Tracking**: Privacy-focused design
- **HTTPS**: Automatic SSL certificates
- **CDN**: Global edge network for fast, secure delivery

## Cost Considerations

### Vercel Pricing:
- **Hobby Plan**: Free for small teams
- **Pro Plan**: $20/month for larger teams
- **Enterprise**: Custom pricing for large organizations

### Usage Estimates:
- **Small Sales Team** (5 users): Hobby plan sufficient
- **Medium Sales Team** (20+ users): Pro plan recommended
- **Large Organization**: Enterprise plan with custom features

Your application is now ready for professional sales team use!