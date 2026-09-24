# Jayamahesh Ayurveda & Wellness Center

> **Authentic Kerala Ayurveda & Classical Panchakarma Platform**  
> A premium, patient-first healthcare and retreat web application combining classical Ayurvedic medicine with modern clinical scheduling and staff operations.

---

## 🌿 Overview

**Jayamahesh Ayurveda & Wellness Center** is designed to build trust and reverence through authentic Kerala heritage aesthetics, unhurried physician consultations, and clinical excellence.

The platform includes:
- A luxury public website explaining traditional treatments, retreat programs, and Vaidya profiles.
- A smart appointment booking engine with real-time slot availability, holiday exclusions, and instant WhatsApp confirmations.
- A secure, role-based staff operations portal (`/admin`) for reviewing enquiries, managing schedules, blocking dates, and maintaining internal patient records.
- A dual-mode data persistence architecture that works seamlessly out-of-the-box (local persistence) and easily syncs with **Google Firebase** (Auth & Cloud Firestore).

---

## ✨ Key Features

### 1. Public Visitor & Patient Experience
- **Hero & Trust Strip**: Kerala sanctuary aesthetics, authentic heritage visuals, and core clinical pillars (*Authentic Ayurveda, Personalized Care, Experienced Vaidyas, Holistic Wellness*).
- **About Jayamahesh (`/about`)**: Chronicles the center's lineage, the Tridosha (*Vata, Pitta, Kapha*) and Prakriti philosophy, Nadi Pariksha (pulse reading) diagnosis, and in-house herbal pharmacy.
- **Therapies & Treatments (`/treatments`)**: Filterable catalog (*Panchakarma, Pain Management, Detox & Agni Care, Rejuvenation, Stress & Lifestyle*) with detailed clinical modals detailing preparation, benefits, and aftercare.
- **Physicians & Vaidyas (`/doctors`)**: Profiles of senior BAMS & MD doctors and therapists with qualifications, years of experience, languages, and doctor-specific booking triggers.
- **Curated Retreat Programs (`/programs`)**: Multi-day immersions (*Reset & Restore 7-day*, *Panchakarma Journey 14-day*, *Rejuvenate 5-day*) with daily healing rhythms and inclusions.
- **Photo Gallery (`/gallery`)**: Categorized photography with an interactive full-screen lightbox viewer.
- **Contact & Appointment Desk (`/contact`)**: Official contacts, interactive Google Maps directions, arrival & parking info, FAQs accordion, and an in-page booking form.
- **Sticky Booking CTA**: Floating booking button and WhatsApp quick-chat bubble for mobile and desktop.

### 2. Smart Clinical Appointment Engine
- **Step-by-Step Flow**: Guest information, service & doctor selection, date selection, available slot picker, and health concern notes.
- **Dynamic Slot Availability**: Automatically calculates available slots (*9:00 AM – 6:00 PM*, excluding 1:00 – 2:00 PM lunch break, center holidays, and staff-blocked slots).
- **Provisional Status & Reference ID**: Generates an official reference code (e.g. `APT-2026-001`) with clear notice that the slot is a request until confirmed by the clinical desk.
- **Instant WhatsApp Verification**: Pre-fills patient details and reference ID directly to the center's WhatsApp number.

### 3. Staff & Administrative Portal (`/admin`)
- **Role-Based Authentication**: Secure login supporting three operational tiers:
  - **Admin**: Full access including staff management, system settings, and record deletion.
  - **Manager**: Access to appointment scheduling, calendar slot management, and content.
  - **Staff**: Front-desk operations, viewing appointments, and updating confirmation statuses.
- **Operations Dashboard**: Summary metrics (*Pending Enquiries, Today's Consultations, Confirmed Bookings, Free Slots*) and an urgent pending queue.
- **Appointment Management**: Filter by status (*pending, confirmed, rescheduled, completed, cancelled, declined*), search by patient or phone, assign staff, reschedule dates/slots, and append timestamped internal notes.
- **Calendar & Availability Controls**: Inspect day-by-day bookings, block/unblock individual hourly slots, and toggle center-wide holidays.
- **Staff Directory**: Active accounts overview with role badges and a permission matrix.
- **Settings & Firebase Assistant**: View connection status and input Firebase Web App credentials (`apiKey`, `projectId`, etc.) directly from the browser.

---

## 🎨 Visual Identity & Design System

The application strictly reflects authentic Kerala Ayurveda visual direction:

| Token | Color | Hex Code | Usage |
|---|---|---|---|
| **Deep Forest Green** | Dark Green | `#173A30` | Primary brand headers, hero accents |
| **Forest Deep** | Deepest Green | `#0C2B24` | Backgrounds, dark navigation bars |
| **Turmeric Gold** | Rich Warm Gold | `#C69A45` | Key CTA buttons, dividers, borders |
| **Warm Gold** | Soft Light Gold | `#E4C078` | Typography highlights, badges, icons |
| **Warm Cream** | Cream Surface | `#F4F0E8` | Secondary cards, subtle backgrounds |
| **Paper White** | Natural White | `#FBFAF7` | Primary surface background |

- **Headings**: *Playfair Display* (Serif elegance with emotional italic styling)
- **Body**: *DM Sans* (Clean, modern, and highly legible healthcare typography)

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Backend / Database**: [Firebase](https://firebase.google.com/) (Cloud Firestore & Authentication) with local storage fallback bridge.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone or open the repository:
   ```bash
   cd jayamahesh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at: **`http://localhost:5173/`**

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔐 Demo Staff Accounts

You can test the Staff Portal at **`http://localhost:5173/admin`** using one-click preset buttons on the login screen or with these credentials:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Admin (Dr. Ananya Mahesh)** | `admin@jayamahesh.com` | `admin123` | Full access (Staff, Calendar, Settings, Deletion) |
| **Manager (Meera Nair)** | `manager@jayamahesh.com` | `manager123` | Calendar, Appointments, Center Hours |
| **Staff (Arun Varma)** | `staff@jayamahesh.com` | `staff123` | Front desk & Appointment confirmations |

---

## ☁️ Firebase Setup (Optional)

The application functions completely out-of-the-box with persistent demo data. When you are ready to connect a live Firebase project:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password) and **Cloud Firestore**.
3. Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
   *Alternatively*, you can enter these keys directly in the app at **Staff Portal → Settings & Firebase** without restarting the server.

---

## 📂 Project Structure

```text
jayamahesh/
├── public/
│   └── images/                # High-resolution Kerala Ayurveda photography
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Header with utility bar and mobile drawer
│   │   ├── Footer.jsx         # Heritage footer with timings and contacts
│   │   ├── BookModal.jsx      # Multi-step global appointment booking modal
│   │   ├── TreatmentDetailModal.jsx # Clinical indications & preparation modal
│   │   └── StickyBookingCTA.jsx # Floating booking button & WhatsApp widget
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication & role-based permission provider
│   │   └── AppointmentContext.jsx # Booking engine & slot availability provider
│   ├── pages/
│   │   ├── Home.jsx           # Hero, treatments, wellness retreats, testimonials
│   │   ├── About.jsx          # Philosophy, Tridoshas, and center lineage
│   │   ├── Treatments.jsx     # Clinical therapies with category filters
│   │   ├── Doctors.jsx        # Senior Vaidyas and therapist directory
│   │   ├── Programs.jsx       # Curated inpatient wellness retreats
│   │   ├── Gallery.jsx        # Image gallery with lightbox interaction
│   │   ├── Contact.jsx        # Directions, in-page booking, and FAQs
│   │   └── admin/
│   │       ├── AdminLayout.jsx      # Admin sidebar and role indicators
│   │       ├── AdminLogin.jsx       # Staff login with quick-fill presets
│   │       ├── AdminDashboard.jsx   # Metrics overview & pending queue
│   │       ├── AdminAppointments.jsx # Full management & internal notes
│   │       ├── AdminCalendar.jsx    # Hourly slot & holiday blocking
│   │       ├── AdminStaff.jsx       # Staff accounts & permission matrix
│   │       └── AdminSettings.jsx    # Center info & Firebase assistant
│   ├── services/
│   │   ├── firebase.js        # Firebase SDK initialization & auth helpers
│   │   ├── storageService.js  # Persistence bridge (Firestore + LocalStorage)
│   │   └── initialData.js     # Classical seed data & configurations
│   ├── App.jsx                # Application routes and protected guards
│   ├── index.css              # Master Kerala Ayurveda design system & tokens
│   └── main.jsx               # Application entry point
├── index.html                 # Google Fonts preconnect & metadata
├── package.json
└── vite.config.js
```

---

## 📄 License & Credits

- Built for **Jayamahesh Ayurveda & Wellness Center**, Kalpathy, Palakkad, Kerala.
- All treatments and clinical workflows are structured in accordance with classical Ayurvedic treatises (*Charaka Samhita* and *Ashtanga Hridaya*).
