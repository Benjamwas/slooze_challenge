# 🧭 Commodities Management System (Role-Based Dashboard)

A **modern React + TypeScript dashboard application** built to manage commodities efficiently with **role-based access control (RBAC)**.  
This system provides different dashboard experiences for **admins, managers, and users**, ensuring secure and seamless data handling.

---

## 🚀 Features

### 🧑‍💻 Authentication & Authorization
- Secure login/logout system
- Role-based dashboard rendering (Admin, Manager, User)
- Persistent auth with context and localStorage

### 📊 Dashboard & Charts
- Real-time statistics visualization using **Recharts**
- Responsive dashboard layout for different screen sizes
- Animated page transitions using **Framer Motion**

### 🌗 Theme Switcher
- Toggle between **light** and **dark** themes
- Context-based theme management for consistency across components

### 📦 Products Management
- View, add, and manage product listings
- Integrated **Add Product Modal** with form validation
- JSON Server/REST API integration for CRUD operations

### 🧭 Sidebar & Navbar
- Fully responsive sidebar with **hide/show toggle**
- Clean and interactive navbar with user info, theme toggle, and logout button
- Smooth animations using Framer Motion

### 🧰 Tech Stack
- **React 18 + TypeScript**
- **Vite** (for fast dev and build)
- **Axios** (for API requests)
- **Tailwind CSS** (for modern styling)
- **Framer Motion** (for animations)
- **Lucide Icons** (for consistent icons)
- **JSON Server** (for local mock API)

---

## ⚙️ Installation & Setup

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Benjamwas/slooze_challenge.git
cd slooze_challenge
 INSTALLATION
npm install
npx json-server --watch db.json --port 5000 -RUN THE DB.JS
npm run dev - Run the application
Project structure
src/
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── charts/
│   └── modals/
├── context/
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── Login.tsx
├── utils/
│   └── roleUtils.ts
├── App.tsx
└── main.tsx



