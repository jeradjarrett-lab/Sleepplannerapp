# 🚀 START HERE - Database Setup Required

## What You're Seeing

Your admin page shows "Loading configuration..." because the database tables haven't been created yet.

## Quick Fix (30 Seconds)

### Step 1: Open SQL Editor
Click this link: **https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/sql/new**

### Step 2: Copy SQL
Open the file `/database-schema.sql` in this project and copy ALL of it.

### Step 3: Run It
- Paste the SQL into the Supabase SQL Editor
- Click **RUN** (or press Cmd+Enter / Ctrl+Enter)
- Wait for "Success. No rows returned"

### Step 4: Refresh
Refresh your admin page - it will now work!

---

## What This Does

Creates 3 tables:
- `admin_users` - Your admin account (password: admin123)
- `admin_sessions` - Login sessions
- `admin_config` - All your settings (ads, SEO, scripts)

---

## Alternative: View Setup Screen

If you refresh your admin page now, you should see a friendly blue setup screen instead of "Loading configuration...". It has buttons to do all this for you.

---

## After Setup

1. Login with password: `admin123`
2. **IMMEDIATELY** change this password in Security Settings
3. Configure your Google AdSense codes
4. Customize your SEO settings
5. You're done!

---

**This is a ONE-TIME setup. After running the SQL, you'll never see this message again.**
