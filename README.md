# 💼 Jobify – Gamified Career & Recruitment Platform

**Live Demo:** [https://jobifyweb.vercel.app](https://jobifyweb.vercel.app)  
**GitHub Repo:** [https://github.com/Shubhangshuklaa/Jobify-](https://github.com/Shubhangshuklaa/Jobify-)

---

## 📌 Project Overview

**Jobify** is a gamified recruitment platform built for students, recruiters, and admins.  
Students earn points by completing career-enhancing tasks, apply to jobs, and view leaderboards.  
Recruiters post jobs and manage applications, while admins manage platform-wide operations.

---

## 🧪 Tech Stack

- **Frontend:** React, TypeScript, Vite  
- **State Management:** Context API  
- **Authentication:** Firebase Auth  
- **Hosting:** Vercel  
- **Database & Storage:** Firebase Firestore (if used)  
- **Styling:** Tailwind CSS  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shubhangshuklaa/Jobify-.git
cd Jobify-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root and add:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> 🔒 **Ensure `.env` is in `.gitignore` to avoid exposing secrets.**

---

## 👥 User Roles

| Role      | Permissions |
|-----------|-------------|
| **Student**  | Login, apply for jobs, complete tasks, earn points, view leaderboard |
| **Recruiter**| Post/manage jobs, view applicants |
| **Admin**    | Manage tasks, jobs, referrals, user roles, and leaderboard |

---

## 🌐 Main Features

- 🔐 **Auth System:** Firebase-based login/signup  
- 📄 **Job Board:** Browse and apply to jobs  
- ✅ **Task List:** Earn points through career-based tasks  
- 👥 **Role-Based Dashboard:** Dynamic routes based on user roles  
- 🧠 **Leaderboard:** Top students ranked by points  
- 📤 **Referrals:** Users refer friends for extra points  
- 🛠️ **Admin Panel:** Create/edit tasks, assign roles, view reports  

---

## 🧠 Context API Structure

- `AuthContext.tsx`:  
  Handles authentication, stores user info, detects role-based access, provides login/logout methods.

- `TaskContext.tsx`:  
  Manages user tasks, task completion, and progress (optional depending on implementation).

---

## 🗃️ Data Models (Simplified)

### 👤 User
```ts
{
  id: string,
  name: string,
  email: string,
  role: 'student' | 'recruiter' | 'admin',
  points: number
}
```

### 📌 Task
```ts
{
  id: string,
  title: string,
  description: string,
  points: number,
  deadline: Date
}
```

### 🧾 Referral
```ts
{
  id: string,
  referredBy: userId,
  referredUser: email,
  status: 'pending' | 'joined'
}
```

### 💼 Job
```ts
{
  id: string,
  title: string,
  company: string,
  description: string,
  postedBy: recruiterId
}
```

### 📄 Application
```ts
{
  id: string,
  userId: string,
  jobId: string,
  status: 'applied' | 'accepted' | 'rejected'
}
```

---

## ⚙️ Role Handling (Auth)

- Firebase Auth manages sessions.  
- User roles stored in Firestore or Firebase Custom Claims.  
- Role is consumed from context and used to control access on routes like:

```ts
<Route path="/admin" element={user?.role === 'admin' ? <AdminPanel /> : <Unauthorized />} />
```

---

## ☁️ AWS Integrations

> ❌ No AWS services used in this project. Firebase handles backend, auth, and hosting logic.

---

## ⚠️ Challenges Faced

| Problem | Solution |
|--------|----------|
| Managing multiple user roles | Context API + Firebase claims for role-based UI and routes |
| Securely managing environment variables | `.env` and `.gitignore` setup |
| Dynamic dashboards | Used layout components and conditional rendering |
| Hosting with clean custom name | Used Vercel CLI to rename project to `jobify` and redeploy |

---

## 📈 Future Improvements

- Email verification & password reset  
- Admin analytics dashboard  
- Notifications (Firebase Cloud Messaging)  
- Resume upload & parsing  

---

## ✅ Submission Requirements Covered

- ✅ Public GitHub Repo with meaningful commits  
- ✅ Live Demo on Vercel: [jobifyweb.vercel.app](https://jobifyweb.vercel.app)  
- ✅ Roles: Student, Recruiter, Admin  
- ✅ Tasks, Referrals, Job Board, Leaderboard  
- ✅ README with Setup, Env, Context, Roles  
- ✅ Write-Up on Models, Auth, Challenges  

---

## 👨‍💻 Author

**Shubhang Shukla**  
[GitHub](https://github.com/Shubhangshuklaa) | [LinkedIn](https://www.linkedin.com/in/shubhangshuklaa)
