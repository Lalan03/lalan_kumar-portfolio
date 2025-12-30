# Lalan Kumar — Full Stack Developer Portfolio

- A modern, high-performance personal portfolio built with Next.js (App Router) showcasing my work as a Full Stack Developer & AI/ML Engineer.
Includes an admin dashboard, secure contact system, analytics tracking, and polished UI/UX.

- 🔗 Live Demo: https://your-domain.vercel.app

- 📄 Resume: Downloadable with analytics tracking

## ✨ Features
### 🌐 Public Website
- Responsive hero section with smooth animations (GSAP)
- About, Skills, Projects, Experience & Contact sections
- Dark / Light theme toggle
- Scroll progress indicator
- Mobile-first design
- Lighthouse-optimized performance

### 📬 Contact System
- Contact form with validation
- Cloudflare Turnstile CAPTCHA (bot protection)
- Email notifications
- Toast-based success & error feedback
- Rate limiting & server-side validation

### 🔐 Admin Dashboard
- Secure admin login
- View all contact messages
- Delete individual messages
- Logout functionality
- Protected routes using middleware

### 📊 Analytics & Tracking (Vercel Analytics)
- Resume download tracking
- Social link tracking (LinkedIn / GitHub)
- Device & visitor tracking
- Conversion insights

### 🛠 Tech Stack
#### Frontend
- Next.js 15 (App Router)
- React 18
- Tailwind CSS
- GSAP & Framer Motion
- React Icons

#### Backend
- Next.js Route Handlers
- MongoDB + Mongoose
- Cloudflare Turnstile
- Middleware-based auth
- Rate limiting

#### Tooling
- Vercel Analytics
- ESLint
- TypeScript
- Git & GitHub


## 📁 Project Structure
.
├── app
│   ├── admin
│   │   ├── login
│   │   └── page.tsx
│   ├── api
│   │   ├── admin
│   │   │   ├── login
│   │   │   ├── logout
│   │   │   └── messages/[id]
│   │   └── contact
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Toast.tsx
│   └── ScrollProgress.tsx
│
├── lib
│   ├── db.ts
│   ├── mail.ts
│   └── ratelimit.ts
│
├── models
│   └── Contact.ts
│
├── public
│   ├── profile.jpg
│   ├── resume.pdf
│   └── og.jpg
│
├── middleware.ts
├── .env.local
└── README.md


## 🔐 Environment Variables
- MONGODB_URI=your_mongodb_connection_string
- ADMIN_PASSWORD=your_admin_password

- NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
- TURNSTILE_SECRET_KEY=your_turnstile_secret_key

- EMAIL_USER=your_email
- EMAIL_PASS=your_email_password

## ▶️ Getting Started
### 1️⃣ Clone the Repository
- `git clone https://github.com/your-username/portfolio.git`
- `cd portfolio`

### 2️⃣ Install Dependencies
- `npm install`

### 3️⃣ Run Development Server
- `npm run dev`

- Open👉 `http://localhost:3000`


## 🔐 Admin Access
- Admin page: /admin
- Login protected via middleware
- Messages fetched server-side
- Individual delete supported

## 📊 Analytics Events
Tracked using @vercel/analytics

| Event Name        | Properties               |
| ----------------- | ------------------------ |
| `resume_download` | source, device, visitor  |
| `social_click`    | platform, source, device |


- View events in:
      Vercel → Project → Analytics → Events

## ⚡ Performance & SEO
- Optimized images (next/image)
- Dynamic metadata & Open Graph
- CSP headers configured
- Lighthouse score focused
- Minimal JS payload

## 🧠 Security Measures
- Cloudflare Turnstile CAPTCHA
- Rate-limited contact API
- Server-side validation
- Protected admin routes
- Secure headers

## 📌 Future Improvements
- Pagination in admin dashboard
- Soft delete / archive messages
- Project filtering by tech
- CMS integration
- Blog section


## 👤 Author
Lalan Kumar
- Full Stack Developer · AI/ML Engineer

- GitHub: https://github.com/Lalan03

- LinkedIn: https://www.linkedin.com/in/lalan-kumar-5177b6259/

- Email: lk180186@gmail.com

## 📄 License
- This project is personal & proprietary.
- All rights reserved © 2025 Lalan Kumar.

