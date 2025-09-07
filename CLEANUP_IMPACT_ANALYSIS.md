# WordPress Cleanup Impact Analysis & GitHub Pages Solutions

## Images & Assets That Will Be Affected

### 1. **Plugin-dependent Images**
- **Location**: `wp-content/plugins/thrive-visual-editor/editor/css/images/featured_image.png`
- **Impact**: Used as fallback for featured images in CSS variables
- **GitHub Solution**: Replace with local placeholder image or remove fallback entirely

### 2. **Gravatar Profile Images** 
- **Location**: `https://secure.gravatar.com/avatar/[hash]`
- **Impact**: Author profile images in testimonials/comments
- **GitHub Solution**: Replace with local default avatar image in wp-content/uploads/

### 3. **Thrive Theme Assets**
- **Location**: `wp-content/themes/thrive-theme/`
- **Impact**: Theme-specific styling and functionality
- **Status**: Already locally downloaded - no action needed

## Functionality That Will Be Affected

### 1. **Email Subscription Forms** ⚠️ HIGH IMPACT
- **Current**: Uses Thrive Leads plugin with WordPress AJAX
- **Affects**: Newsletter signups, lead generation forms
- **GitHub Solution Options**:
  - **Option A**: Replace with Netlify Forms (if using Netlify)
  - **Option B**: Replace with Formspree integration
  - **Option C**: Use Mailchimp embed forms
  - **Option D**: Create simple mailto: links as fallback

### 2. **Mobile Menu Functionality** ✅ ALREADY FIXED
- **Previous**: Relied on Thrive Visual Editor menu.min.js
- **Current**: Now uses our custom `mobile-menu.js`
- **Status**: No further action needed

### 3. **Video Background Controls**
- **Current**: Uses `wp-content/plugins/thrive-visual-editor/editor/js/dist/modules/video.min.js`
- **Affects**: Hero video on homepage (wind turbines)
- **GitHub Solution**: Simple HTML5 video controls or custom JS

### 4. **Dropdown Menu Functionality** 
- **Current**: Uses `dropdown.min.js` from Thrive
- **Affects**: "Use Cases" dropdown menu
- **GitHub Solution**: Already covered by our mobile-menu.js

### 5. **Lead Generation Pop-ups/Forms**
- **Current**: Uses `lead-generation.min.js`
- **Affects**: Newsletter subscription modals
- **GitHub Solution**: Remove or replace with simple forms

### 6. **Social Share Buttons**
- **Current**: Uses `social-share.min.js` 
- **Affects**: Social sharing functionality
- **GitHub Solution**: Replace with simple share URLs or remove

## Files That Need Manual Review

### 1. **Critical Pages with Form Dependencies**:
- `index.html` - Main newsletter signup form
- `events.html` - Event registration forms
- All pages with newsletter sidebars

### 2. **Pages with Potential Slideshow Issues**:
- `carbon-accounting.html` - Carbon accounting slideshow
- `supply-chain.html` - Supply chain slideshow  
- `renewable-energy.html` - Renewable energy slideshow
- `monitoring-reporting-verification.html` - MRV slideshow

### 3. **Navigation-Critical Pages**:
- All pages - ensure mobile menu still works
- Test dropdown functionality on all pages

## GitHub Pages Compatible Replacements

### For Email Forms:
```html
<!-- Replace WordPress forms with simple HTML -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" placeholder="Enter your email" required>
  <button type="submit">Subscribe</button>
</form>
```

### For Social Sharing:
```html
<!-- Simple social share URLs -->
<a href="https://twitter.com/intent/tweet?text=Check%20out%20Unlocking%20Climate%20Solutions&url=https://yoursite.com" target="_blank">Share on Twitter</a>
<a href="https://www.linkedin.com/sharing/share-offsite/?url=https://yoursite.com" target="_blank">Share on LinkedIn</a>
```

### For Video Controls:
```html
<!-- Simple HTML5 video with proper attributes -->
<video autoplay muted loop playsinline>
  <source src="wp-content/uploads/2024/02/wind-turbines-and-a-sunset.mp4" type="video/mp4">
</video>
```

## Testing Checklist After Cleanup

- [ ] All images load properly 
- [ ] Mobile navigation works on all pages
- [ ] Hero video plays automatically
- [ ] Newsletter forms work (or are replaced)
- [ ] Social sharing works (or is removed)
- [ ] All internal links function
- [ ] Slideshow images display correctly
- [ ] Dark mode styling preserved
- [ ] Responsive design intact
- [ ] Site loads quickly without broken resource requests

## Recommended Implementation Order

1. **First**: Run cleanup script on non-critical pages
2. **Second**: Test each page individually 
3. **Third**: Replace broken functionality with GitHub-compatible solutions
4. **Fourth**: Clean up critical pages (index.html last)
5. **Fifth**: Remove unused WordPress directories entirely