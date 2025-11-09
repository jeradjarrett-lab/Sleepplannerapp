# Admin Panel Guide

## Overview

The EyeLoveSleep admin panel allows you to manage advertisements and custom scripts (like Google Analytics) without modifying the code directly.

## Accessing the Admin Panel

1. **Via Footer Link**: Click the "Admin" link in the footer (appears dimmed, hover to see it)
2. **Via Direct URL**: Navigate to `#admin` in your browser URL

## Default Login Credentials

- **Password**: `admin123`

⚠️ **Important**: Change this password immediately after your first login!

## Features

### 1. Ad Settings Tab

Manage all advertisement placements on your site:

#### Global Ad Control
- Toggle to enable/disable all ads site-wide
- Useful for testing or temporarily removing ads

#### Individual Ad Placements

**Header Ad**
- Displayed below the navigation menu
- Best for leaderboard or banner ads
- Can be enabled/disabled independently

**Medium Ad**
- Displayed in the middle of content sections
- Ideal for medium rectangle ads (300x250)
- Multiple instances throughout the site

**Large Ad**
- Displayed at the bottom of sections
- Works well for larger ad formats
- Can be enabled/disabled independently

#### How to Add Your Ads

1. Get your ad code from Google AdSense or your ad provider
2. Copy the entire `<script>` and `<ins>` tags
3. Paste into the appropriate ad placement field
4. Click "Save Changes"

**Example Google AdSense Code:**
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### 2. Custom Scripts Tab

Add tracking, analytics, or other custom scripts:

#### Adding a New Script

1. Click "Add Script" button
2. Name your script (e.g., "Google Analytics")
3. Choose placement:
   - **Head**: Scripts that need to load early (analytics, fonts)
   - **Body**: Scripts that can load after page content
4. Paste your script code
5. Toggle the switch to enable/disable
6. Click "Save Changes"

#### Example: Google Analytics 4

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Example: Facebook Pixel

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### 3. Security Tab

#### Change Admin Password

1. Enter new password (minimum 6 characters)
2. Confirm password
3. Click "Update Password"
4. You'll be prompted to log in again with the new password

#### Security Best Practices

The current implementation uses browser-based authentication for demonstration. For production:

- ✅ Use a proper backend authentication system
- ✅ Store passwords securely with hashing (bcrypt, etc.)
- ✅ Implement HTTPS for all admin pages
- ✅ Add rate limiting and CSRF protection
- ✅ Use environment variables for sensitive data
- ✅ Implement session timeouts
- ✅ Add two-factor authentication

## Saving Changes

1. Make your changes in any tab
2. Yellow warning bar appears: "You have unsaved changes"
3. Click "Save Changes" button
4. Page will reload automatically to apply changes
5. Changes are stored in browser localStorage

## Resetting to Defaults

1. Click "Reset to Defaults" button
2. Confirm the action
3. All settings return to default configuration
4. Must click "Save Changes" to apply

## Tips & Best Practices

### Ad Management
- Test ads on different devices before going live
- Monitor ad performance and adjust placements
- Ensure ads don't interfere with user experience
- Keep ad code updated from your provider

### Script Management
- Only add scripts from trusted sources
- Test thoroughly before enabling in production
- Disable unused scripts to improve performance
- Document what each script does

### Performance
- Minimize the number of scripts
- Use async/defer attributes when possible
- Monitor page load times
- Consider ad/script loading strategies

## Troubleshooting

### Ads Not Showing
1. Check if global ads are enabled
2. Verify specific ad placement is enabled
3. Check ad code is correctly formatted
4. Ensure you've saved changes
5. Clear browser cache and reload

### Scripts Not Working
1. Check browser console for errors
2. Verify script placement (head vs body)
3. Ensure script is enabled
4. Check for syntax errors in code
5. Test in incognito mode

### Login Issues
1. Default password: `admin123`
2. Check if you changed the password
3. Clear browser data and try default password
4. Session expires when browser closes

### Changes Not Saving
1. Check browser console for errors
2. Ensure localStorage is enabled
3. Try a different browser
4. Check if browser has storage quota

## Data Storage

All admin configuration is stored in browser localStorage:
- `eyeLoveSleep_adminConfig` - Configuration data
- `eyeLoveSleep_adminPassword` - Encrypted password
- `eyeLoveSleep_adminAuth` - Session authentication

⚠️ **Important**: Data is stored locally in your browser. If you clear browser data or use a different browser, you'll need to reconfigure settings.

## Migration to Production

When moving to production, consider:

1. **Backend API**: Create endpoints for saving/loading config
2. **Database**: Store configuration in a database
3. **Authentication**: Implement proper auth with JWT/sessions
4. **Multi-user**: Add role-based access control
5. **Audit Logs**: Track who changed what and when
6. **Backup**: Implement configuration backup/restore
7. **CDN**: Host scripts and ads on CDN for better performance

## Support

For issues or questions:
- Check browser console for errors
- Review this documentation
- Test in incognito mode to rule out caching issues
- Ensure you're using a modern, up-to-date browser

## Version History

- **v1.0.0** - Initial admin panel release
  - Ad management
  - Custom scripts
  - Password protection
  - localStorage-based configuration
