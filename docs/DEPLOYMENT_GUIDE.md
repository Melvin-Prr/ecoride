# 🚀 EcoRide Platform - Deployment Guide

**Version**: 1.0.0  
**Date**: February 2026  
**Target**: Production Deployment

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All code committed and pushed to GitHub
- [ ] All tests passing (if implemented)
- [ ] Environment variables documented in .env.example
- [ ] Database migrations ready
- [ ] Seed data prepared
- [ ] README.md updated with deployment info

### Production Services
- [ ] GitHub repository is PUBLIC
- [ ] PostgreSQL database deployed (Supabase/Neon)
- [ ] MongoDB database deployed (MongoDB Atlas)
- [ ] Application deployed (Vercel)
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)

### Post-Deployment
- [ ] Test registration flow
- [ ] Test authentication
- [ ] Test carpool creation
- [ ] Test booking flow
- [ ] Test admin dashboard
- [ ] Verify email delivery
- [ ] Check logging functionality

---

## Step 1: Prepare GitHub Repository

### 1.1 Make Repository Public

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll to "Danger Zone"**
4. **Click "Change visibility"**
5. **Select "Make public"**
6. **Confirm** by typing repository name

### 1.2 Verify Repository Structure

```bash
# Your repository should contain:
.
├── .gitignore
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   ├── DATABASE_DOCUMENTATION.md
│   ├── UML_DIAGRAMS.md
│   ├── TECHNICAL_DOCUMENTATION.md
│   ├── USER_MANUAL.md
│   └── BRAND_GUIDELINES.md
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
└── public/
```

### 1.3 Push All Changes

```bash
git add .
git commit -m "chore: prepare for production deployment"
git push origin develop
git checkout main
git merge develop
git push origin main
```

---

## Step 2: Deploy PostgreSQL Database

### Option A: Supabase (Recommended)

#### 2.1 Create Supabase Account
1. Visit https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Verify email

#### 2.2 Create New Project
1. Click "New Project"
2. **Organization**: Create new or select existing
3. **Name**: ecoride-production
4. **Database Password**: Generate strong password (save it!)
5. **Region**: Choose closest to your users (Europe West recommended for France)
6. **Pricing Plan**: Free tier (sufficient for student projects)
7. Click "Create new project" (wait ~2 minutes)

#### 2.3 Get Database Connection String
1. Go to **Project Settings** (gear icon)
2. Click **Database** tab
3. **Connection string** section
4. Select **"Node.js"**
5. **Copy the connection string**:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
6. **Replace `[YOUR-PASSWORD]`** with the password you created
7. **Save this** - you'll need it for Vercel

#### 2.4 Run Database Migrations

**Option 1: Using Prisma (Recommended)**
```bash
# Set DATABASE_URL temporarily
$env:DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

**Option 2: Using SQL Script**
1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New query**
3. Copy content from `database/schema.sql`
4. Click **Run**
5. Repeat with `database/seed.sql`

---

### Option B: Neon (Alternative)

1. Visit https://neon.tech
2. Sign up with GitHub
3. Click "Create a project"
4. **Name**: ecoride-production
5. **Region**: Europe
6. **PostgreSQL version**: 16
7. Copy **Connection String** (Pooled connection recommended)
8. Run migrations as above

---

### Option C: Railway (Alternative)

1. Visit https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Click database → **Connect** tab
5. Copy **DATABASE_URL**
6. Run migrations as above

---

## Step 3: Deploy MongoDB Database

### 3.1 Create MongoDB Atlas Account
1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with Google or email
4. Complete registration

### 3.2 Create Free Cluster
1. Click "Build a Database"
2. **Choose deployment**: Shared (FREE tier)
3. **Cloud Provider**: AWS (or Google Cloud/Azure)
4. **Region**: Choose closest (eu-west-1 for France)
5. **Cluster Name**: ecoride-cluster (or leave default)
6. Click "Create"

### 3.3 Create Database User
1. **Security** section appears
2. **Authentication Method**: Username and Password
3. **Username**: `ecoride-admin`
4. **Password**: Generate secure password (save it!)
5. Click "Create User"

### 3.4 whitelist IP Address
1. **Network Access** section
2. Click "Add IP Address"
3. **Add current IP**: Click "Add Current IP Address"
4. **Allow from anywhere** (for Vercel):
   - Click "Allow Access from Anywhere"
   - IP: `0.0.0.0/0`
   - Description: "Vercel deployment"
5. Click "Confirm"

### 3.5 Get Connection String
1. Click "Connect" on your cluster
2. Select "Connect your application"
3. **Driver**: Node.js
4. **Version**: 6.0 or later
5. **Copy connection string**:
   ```
   mongodb+srv://ecoride-admin:<password>@ecoride-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>`** with your database user password
7. **Add database name** before `?`:
   ```
   mongodb+srv://ecoride-admin:password@ecoride-cluster.xxxxx.mongodb.net/ecoride?retryWrites=true&w=majority
   ```
8. **Save this** for Vercel configuration

### 3.6 Create Collections (Optional)
Collections are created automatically by the app, but you can pre-create them:

1. Go to **Database** → **Browse Collections**
2. Click "Add My Own Data"
3. **Database name**: ecoride
4. **Collection name**: logs
5. Repeat for "notifications" collection

---

## Step 4: Deploy to Vercel

### 4.1 Create Vercel Account
1. Visit https://vercel.com
2. Click "Sign Up"
3. **Choose "Continue with GitHub"** (recommended)
4. Authorize Vercel to access GitHub

### 4.2 Import Repository
1. Click "Add New..." → "Project"
2. **Import Git Repository** section
3. Find your `ecoride` repository
4. Click "Import"

### 4.3 Configure Project
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)
5. **Install Command**: `npm install` (default)

### 4.4 Configure Environment Variables

Click "Environment Variables" section and add:

```plaintext
# Database URLs
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
MONGODB_URI=mongodb+srv://ecoride-admin:password@cluster.xxxxx.mongodb.net/ecoride

# JWT Secret (generate new secure key)
JWT_SECRET=your-production-secret-minimum-32-characters-long-use-strong-random

# SMTP Configuration (Gmail recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# App URL (will be provided after deployment, update later)
NEXT_PUBLIC_APP_URL=https://ecoride.vercel.app
```

**How to get Gmail App Password**:
1. Go to Google Account → Security
2. Enable 2-Step Verification (required)
3. Search "App passwords"
4. Create app password for "Mail"
5. Copy the 16-character password
6. Use this as SMTP_PASS

### 4.5 Deploy
1. Click "Deploy"
2. **Wait 2-5 minutes** for build and deployment
3. **Success!** You'll see: 🎉 Congratulations

### 4.6 Get Deployment URL
- Your app is live at: `https://ecoride.vercel.app`
- Or custom: `https://your-project-name.vercel.app`

### 4.7 Update NEXT_PUBLIC_APP_URL
1. Go to Vercel Dashboard → Your Project
2. **Settings** → **Environment Variables**
3. Find `NEXT_PUBLIC_APP_URL`
4. Click **Edit**
5. **Value**: `https://ecoride.vercel.app` (your actual URL)
6. **Save**
7. **Redeploy**: Deployments tab → Latest → ⋯ → Redeploy

---

## Step 5: Post-Deployment Verification

### 5.1 Test Authentication
1. **Visit your deployment URL**
2. **Click "S'inscrire"** (Register)
3. **Create a test account**:
   - Email: test@example.com
   - Pseudo: TestUser
   - Password: TestPass123!
4. **Verify**:
   - ✅ Registration succeeds
   - ✅ Redirected to /carpools
   - ✅ User name appears in header
   - ✅ Credits show 20

### 5.2 Test Carpool Search
1. **Go to /carpools**
2. **Enter search**:
   - Départ: Paris
   - Arrivée: Lyon
   - Date: Tomorrow
3. **Click "Rechercher"**
4. **Verify**:
   - ✅ Results display
   - ✅ Seed data visible
   - ✅ Cards render correctly

### 5.3 Test Booking Flow
1. **Click on a carpool card**
2. **View detail page**
3. **Login** with test account (if not already)
4. **Click "Réserver"**
5. **Confirm booking**
6. **Verify**:
   - ✅ Booking succeeds
   - ✅ Credits deducted
   - ✅ Confirmation message shows
   - ✅ Email received (check spam folder)

### 5.4 Test Admin Dashboard
1. **Login with admin account**:
   - Email: admin@ecoride.com
   - Password: Password123!
2. **Go to /admin**
3. **Verify**:
   - ✅ Statistics display
   - ✅ Charts render
   - ✅ User table shows data

### 5.5 Test with Test Accounts

Use seed data accounts:

**Admin**:
```
Email: admin@ecoride.com
Password: Password123!
Role: ADMIN
URL: /admin
```

**Employee**:
```
Email: employee@ecoride.com
Password: Password123!
Role: EMPLOYEE
URL: /employee
```

**Driver**:
```
Email: driver@ecoride.com
Password: Password123!
Role: DRIVER
Test: Create carpool, start trip, complete trip
```

**Passenger**:
```
Email: passenger@ecoride.com
Password: Password123!
Role: PASSENGER
Test: Book carpool, cancel booking, leave review
```

---

## Step 6: Custom Domain (Optional)

### 6.1 Purchase Domain
- Namecheap, Google Domains, OVH, etc.
- Recommended: `ecoride. fr` or similar

### 6.2 Configure DNS
1. **Vercel Dashboard** → Project → **Settings** → **Domains**
2. **Add domain**: enter your domain
3. **Vercel provides DNS records**:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **Add these records** in your domain registrar's DNS settings
5. **Wait 24-48 hours** for propagation
6. **Verify**: Domain shows as "Valid" in Vercel

---

## Step 7: Monitoring & Maintenance

### 7.1 Vercel Analytics (Recommended)
1. **Vercel Dashboard** → Project → **Analytics**
2. **Enable Vercel Analytics** (free tier available)
3. Monitor:
   - Page views
   - User interactions
   - Performance metrics

### 7.2 Error Tracking
**Check Vercel Logs**:
1. **Deployments** tab
2. **Click latest deployment**
3. **View Function Logs**
4. **Monitor for errors**

**Optional: Sentry Integration**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### 7.3 Database Monitoring
**PostgreSQL (Supabase)**:
- Dashboard → Database → Logs
- Monitor query performance
- Check storage usage

**MongoDB (Atlas)**:
- Metrics tab
- Monitor connections
- Check collection sizes

### 7.4 Backups
**PostgreSQL**:
- Supabase: Automatic daily backups (7-day retention on free tier)
- Manual backup: Database → Backup → Create backup

**MongoDB**:
- Atlas: Automatic backups on paid tiers
- Free tier: Export data manually (Database → Collections → Export)

### 7.5 Clean Old Data
**MongoDB Logs** (run monthly):
```javascript
// Connect to MongoDB and run:
db.logs.deleteMany({ 
  timestamp: { 
    $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) 
  } 
});

// Or use the built-in function via API:
// POST /api/admin/logs/cleanup
```

---

## Step 8: Continuous Deployment

### 8.1 Automatic Deployments
Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to `develop`** → Preview deployment
- **Pull Requests** → Preview deployment per PR

### 8.2 Environment-Specific Deployments
1. **Production** (main branch):
   - URL: ecoride.vercel.app
   - Environment: Production variables

2. **Staging** (develop branch):
   - URL: ecoride-git-develop.vercel.app
   - Environment: Can use same or separate database

### 8.3 Deployment Protection
1. **Vercel Dashboard** → Settings → Deployment Protection
2. **Enable protection** for production
3. **Password protect** preview deployments (optional)

---

## Troubleshooting

### Build Failures

**Error: "Module not found"**
```bash
# Verify package.json includes all dependencies
npm install

# Check import paths are correct
# Ensure all files are committed
```

**Error: "Environment variable not defined"**
- Verify all variables in Vercel dashboard
- Check variable names match exactly
- Redeploy after adding variables

### Database Connection Issues

**Error: "Connection refused"**
- Check DATABASE_URL format is correct
- Verify database is running (check Supabase/Atlas dashboard)
- Check IP whitelist includes `0.0.0.0/0` (MongoDB)

**Error: "SSL required"**
- For PostgreSQL, add `?sslmode=require` to connection string
- For MongoDB, ensure `retryWrites=true&w=majority` is present

### Email Not Working

**Error: "Invalid login"**
- Verify SMTP_USER and SMTP_PASS are correct
- Ensure you're using Gmail App Password, not regular password
- Check 2-Step Verification is enabled on Google account

**Emails in Spam**
- Normal for new domains
- Add SPF/DKIM records (advanced)
- Ask testers to mark as "Not Spam"

### Runtime Errors

**Check Vercel Function Logs**:
1. Deployment → Functions
2. Click on failing function
3. View logs for error details

**Common fixes**:
- Increase function timeout (Vercel Settings)
- Check API route error handling
- Verify environment variables in production

---

## Performance Optimization

### 1. Image Optimization
```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image 
  src="/hero.jpg" 
  alt="EcoRide" 
  width={1200} 
  height={600}
  priority  // For above-the-fold images
/>
```

### 2. Database Indexing
```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_carpools_search ON carpools(departure, destination, departureDate, status);
CREATE INDEX idx_bookings_carpool ON bookings(carpoolId);
```

### 3. Caching Headers
```typescript
// In API routes
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
    }
  });
}
```

### 4. Code Splitting
- Automatic with Next.js App Router
- Use dynamic imports for large components:
  ```typescript
  const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'));
  ```

---

## Security Checklist

- [ ] All environment variables use strong random values
- [ ] JWT_SECRET is at least 32 characters
- [ ] Database passwords are strong (20+ chars, random)
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] CORS is configured correctly
- [ ] Rate limiting implemented (planned feature)
- [ ] Input validation on all API routes
- [ ] SQL injection protection (Prisma ORM)
- [ ] XSS protection (React escaping)
- [ ] CSRF tokens (planned feature)

---

## Final Deployment Checklist

### Before Going Live
- [ ] All features tested
- [ ] Test accounts work
- [ ] Email delivery confirmed
- [ ] Admin dashboard accessible
- [ ] No console errors in browser
- [ ] All API endpoints working
- [ ] Mobile responsive verified
- [ ] Accessibility tested

### Documentation
- [ ] README.md updated with deployment URL
- [ ] .env.example complete and accurate
- [ ] API documentation current
- [ ] User manual includes deployment URL
- [ ] Test credentials documented

### Submission
- [ ] GitHub repository PUBLIC
- [ ] Deployment URL live and working
- [ ] All documentation committed
- [ ] Git history clean with conventional commits
- [ ] Tags created for versions

---

## Support Resources

**Vercel**:
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Support: support@vercel.com

**Supabase**:
- Documentation: https://supabase.com/docs
- Community: Discord server
- Support: support@supabase.com

**MongoDB Atlas**:
- Documentation: https://www.mongodb.com/docs/atlas/
- Community: MongoDB Community Forums
- Support: https://support.mongodb.com

**Next.js**:
- Documentation: https://nextjs.org/docs
- GitHub Issues: https://github.com/vercel/next.js/issues
- Community: Discord server

---

## Post-Deployment Next Steps

### 1. Share with Stakeholders
- Send deployment URL to evaluators
- Include test account credentials
- Provide access to documentation

### 2. Monitor Initial Usage
- Watch for errors in Vercel logs
- Monitor database performance
- Check email delivery success rate

### 3. Gather Feedback
- Test with real users (classmates, family)
- Note any bugs or usability issues
- Prioritize fixes if needed

### 4. Prepare for Evaluation
- Document any known limitations
- Prepare demo script
- Be ready to explain technical choices

---

**Deployment Guide Version**: 1.0.0  
**Last Updated**: February 2026  
**Maintained By**: EcoRide Development Team

**Good luck with your deployment! 🚀**
