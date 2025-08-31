# Get Me a Chai – Crowdfunding Platform for Creators

Get Me a Chai is a modern crowdfunding platform for creators, enabling fans and followers to support their favorite creators with small payments (“buying a chai”). The platform is built using the latest full-stack JavaScript technologies, with robust authentication, secure payments, and a scalable, production-ready deployment setup on a self-managed VPS.

---

## Project Video :-



---

## 🚩 Features

- **Creator Profiles:** Creators can sign up, set up their profile, and receive contributions.
- **Crowdfunding:** Supporters can send payments along with messages to creators.
- **Payment Gateway Integration:** Secure payments via Razorpay.
- **Authentication:** GitHub OAuth login for creators and users.
- **User Dashboard:** Update personal information, profile/covers, Razorpay API keys, and view supporter stats.
- **Leaderboard:** Showcases top supporters and payment history.
- **Responsive UI:** Built with Next.js and Tailwind CSS for a sleek, adaptive interface.

---

## 🛠️ Tech Stack

- **Frontend:** React (Next.js 14)
- **Backend:** Next.js API routes, Node.js 21.7.3
- **Database:** MongoDB Atlas (Cloud Hosted)
- **ORM:** Mongoose
- **Authentication:** next-auth (with GitHub)
- **Payments:** Razorpay
- **Process Management:** PM2
- **Web Server / Proxy:** Nginx
- **SSL:** Let’s Encrypt
- **Styling:** Tailwind CSS, PostCSS

---

## 🌍 Production Hosting Infrastructure

### 1. VPS Server Details
- **Provider:** Self-managed Cloud VPS
- **Operating System:** Ubuntu/Debian (Linux)
- **Domain:** [arpit-project-getmeachai.in](https://arpit-project-getmeachai.in)

### 2. Application Process Management (PM2)
- **App Name:** `my-nextjs-app`
- **Runs in cluster mode** for better performance and resilience
- **Auto-restart** on crashes or server reboot
- **Startup managed by**: `ecosystem.config.js`
- **Memory Guard:** Automatic restart if memory exceeds 1GB
- **Logs:**
  - Error: `/root/.pm2/logs/my-nextjs-app-error-0.log`
  - Output: `/root/.pm2/logs/my-nextjs-app-out-0.log`
  - Real-time monitoring available

### 3. Web Server (Nginx)
- **Reverse proxy** on ports 80 (HTTP) and 443 (HTTPS)
- **Configuration File:** `/etc/nginx/sites-available/default`
- **Purpose:** Securely routes all traffic to Next.js app running on internal port 3000

### 4. SSL & HTTPS
- **Provider:** Let’s Encrypt (free SSL)
- **Certificate Location:** `/etc/letsencrypt/live/arpit-project-getmeachai.in/`
- **Auto-renewal:** Configured for uninterrupted HTTPS security

### 5. Database & External Services
- **Database:** MongoDB Atlas cluster (`arpit.oozkclx.mongodb.net`)
- **Authentication:** GitHub OAuth
- **Payments:** Razorpay integration

### 6. Architecture Diagram

```
Internet → Domain (arpit-project-getmeachai.in)
          ↓
       Nginx (80/443 → SSL Termination)
          ↓
   Reverse Proxy (localhost:3000)
          ↓
      PM2 (Node.js, Next.js app)
          ↓
   MongoDB Atlas (Cloud DB)
```

### 7. Production-Ready Features
- SSL/HTTPS on all endpoints
- Reverse proxy for performance and security
- Auto-restart & memory monitoring (PM2)
- Automatic SSL renewal
- Environment variable management (.env.local)

### 8. Monitoring
- **PM2** real-time process and resource monitors
- **Log files** track app errors and output

---

## 🚀 Development Setup

1. **Clone the repo:**
```bash
git clone https://github.com/[yourusername]/get-me-a-chai.git
cd get-me-a-chai
```
2. **Install dependencies:**
```bash
npm install
```
3. **Set up environment variables:** (see `.env.local`)
   - Example entries:
     - `MONGODB_URI=...`
     - `NEXTAUTH_URL=http://localhost:3000`
     - `RAZORPAY_ID=...`
     - `RAZORPAY_SECRET=...`
4. **Start dev server:**
```bash
npm run dev
```
5. **Visit:** [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment (Production)

- App is deployed on a Linux VPS using PM2, served by Nginx, with SSL via Let’s Encrypt.
- Environment variables are set for production in `.env.local`.
- MongoDB Atlas is used for cloud-hosted data storage.
- Automatic restarts and log monitoring keep the app stable.
- SSL certificates auto-renew for continuous HTTPS.

---

## 🙌 Contributing

Pull requests and issues are welcome! For significant changes, please open an issue first to discuss what you would like to change.

---
