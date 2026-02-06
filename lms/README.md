# The Voices Of Future Rwanda - Learning Management System

A production-ready e-learning platform for The Voices Of Future Rwanda initiative, designed to deliver structured educational content, track student progress, and manage assessments.

## 🎓 Features

### For Students
- **Secure Authentication**: Login system with session management
- **Interactive Dashboard**: View course progress, upcoming assessments, and achievements
- **Course Content**: Access video lessons, reading materials, and practice exercises
- **Progress Tracking**: Monitor completion status across all courses and modules
- **Assessment Engine**: Take MCQ, True/False, and essay assessments with real-time feedback
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### For Administrators
- **Content Management**: Upload and organize course materials
- **Student Monitoring**: Track individual and cohort progress
- **Assessment Grading**: Review and grade essay submissions
- **User Management**: Manage student accounts and enrollments

## 🚀 Quick Start

### Demo Credentials

**Student Account:**
- Email: `student@vofrwanda.com`
- Password: `student123`

**Admin Account:**
- Email: `admin@vofrwanda.com`
- Password: `admin123`

### Installation

1. **Clone or download** this repository to your local machine or web server

2. **No build process required** - This is a static HTML/CSS/JavaScript application

3. **Open in browser**:
   ```
   Open lms/index.html in your web browser
   ```

4. **For local development**, use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then visit http://localhost:8000/lms/
   ```

## 📁 Project Structure

```
lms/
├── index.html                 # Login page
├── assets/
│   ├── css/
│   │   ├── design-system.css  # Core design tokens and styles
│   │   └── lms.css           # LMS-specific styles
│   ├── js/
│   │   ├── auth.js           # Authentication logic
│   │   ├── dashboard.js      # Dashboard functionality
│   │   └── assessment.js     # Assessment engine
│   ├── img/
│   │   └── logo.png          # Platform logo
│   └── videos/               # Course video files
├── dashboard/
│   └── index.html            # Student dashboard
├── courses/
│   ├── leadership-communication.html  # Course overview
│   └── lesson-9-4.html                # Sample lesson
├── assessments/
│   └── module-9.html         # Sample assessment
└── admin/
    └── index.html            # Admin dashboard
```

## 🎨 Design System

The platform maintains visual consistency with the main Voices of Future Rwanda website using:

- **Colors**: 
  - Agaciro Gold: `#C9A147`
  - Agaciro Burgundy: `#6B1C23`
  - Primary Blue: `#00A1DE`
  - Deep Blue: `#003D5C`

- **Typography**:
  - Primary: Poppins
  - Headings: Montserrat
  - Accent: Playfair Display

- **Components**: Buttons, cards, badges, and forms follow the established design patterns

## 📚 Course Structure

Courses are organized into:
- **Modules**: Major topic areas (e.g., Module 9: Advanced Public Speaking)
- **Lessons**: Individual learning units with video content and materials
- **Assessments**: End-of-module evaluations with multiple question types

## ✅ Assessment Types

1. **Multiple Choice Questions (MCQ)**: Select one correct answer from options
2. **True/False**: Binary choice questions
3. **Essay Questions**: Written responses with 250-word maximum limit

## 💾 Data Storage

Currently uses **localStorage** for:
- User authentication sessions
- Assessment progress and submissions
- Lesson completion tracking
- Practice exercise saves

### For Production Deployment

Replace localStorage with a backend database:
- **Recommended**: Supabase (PostgreSQL)
- **Alternatives**: Firebase, MongoDB, or custom REST API

## 🔒 Security Notes

⚠️ **Important**: The current authentication system is for demonstration purposes only.

For production deployment:
- Implement server-side authentication
- Use HTTPS for all connections
- Hash and salt passwords
- Implement CSRF protection
- Add rate limiting for login attempts

## 📹 Video Content

### Supported Formats
- MP4 (H.264 codec recommended)
- WebM
- OGG

### Recommended Specifications
- **Duration**: 5-10 minutes per lesson
- **Resolution**: 1080p (1920x1080) or 720p (1280x720)
- **File Size**: Optimized for web delivery (aim for <100MB, but platform supports larger files)
- **Bitrate**: 2-5 Mbps for good quality

### Video Hosting Options

1. **Self-Hosted** (current setup):
   - Place videos in `lms/assets/videos/`
   - Good for small deployments
   - Requires adequate server bandwidth

2. **Cloud Storage** (recommended for production):
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Blob Storage
   - Benefits: CDN delivery, better performance, scalability

3. **Video Platforms**:
   - YouTube (unlisted videos)
   - Vimeo
   - Wistia

## 🌐 Deployment

### Static Hosting (Recommended)

Deploy to any static hosting service:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd lms
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd lms
vercel --prod
```

**GitHub Pages:**
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch, /lms folder

### Traditional Web Hosting

Upload the `lms` folder to your web server via FTP/SFTP.

## 🔗 Integration with Main Website

The platform is designed to receive redirected users from the main registration page at `https://thevoicesoffuturerwanda.com/register.html`.

### Integration Steps:

1. **After Registration**: Redirect users to the LMS login page
2. **Pass Credentials**: Use secure token-based authentication
3. **Auto-Login**: Implement SSO (Single Sign-On) for seamless experience

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Mobile

## 🛠️ Customization

### Adding New Courses

1. Create a new HTML file in `lms/courses/`
2. Copy structure from `leadership-communication.html`
3. Update course details, modules, and lessons
4. Add to dashboard course grid

### Adding New Assessments

1. Create HTML file in `lms/assessments/`
2. Copy structure from `module-9.html`
3. Add questions (MCQ, True/False, Essay)
4. Update `assessment.js` with question count

### Modifying Design

Edit CSS variables in `assets/css/design-system.css`:
```css
:root {
  --agaciro-gold: #C9A147;
  --primary-blue: #00A1DE;
  /* ... other variables */
}
```

## 📊 Analytics & Tracking

To add analytics:

1. **Google Analytics**: Add tracking code to all HTML files
2. **Custom Events**: Track lesson completions, assessment submissions
3. **Progress Reports**: Export data from localStorage or backend

## 🤝 Support

For questions or issues:
- Email: thevoicesoffuturerwanda@gmail.com
- Phone: +250 786 948 770
- Website: https://thevoicesoffuturerwanda.com

## 📄 License

© 2026 The Voices Of Future Rwanda. All rights reserved.

## 🎯 Roadmap

Future enhancements:
- [ ] Real-time video conferencing for live classes
- [ ] Discussion forums for student collaboration
- [ ] Certificate generation and download
- [ ] Mobile app (iOS/Android)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (English, Kinyarwanda, French)
- [ ] Offline mode for limited connectivity
- [ ] Integration with payment systems for course purchases

---

**Built with ❤️ for The Voices Of Future Rwanda**
