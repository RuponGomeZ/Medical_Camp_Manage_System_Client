# 🏥 Medico+ Frontend — Medical Campaign Web Application

This is the frontend for **Medico+**, a Campaign sharing web application that allows users to create, manage, book, and update Campaign. Built with Express.js and MongoDB, this RESTful API supports[...]

## 🌐 Live Demo

The frontend application is live at: https://medical-camp-management-dda87.web.app/

## 📦 Features

- 🔐 **JWT Authentication**
  - Secure login/logout via cookies
  - Protected routes using middleware
- 🛠️ **Service Management**
  - Add, Update, Delete camps
- 🛍️ **Booking System**
  - Book any Camp
  - View all booked camps
  - Update camp payment status (`Pending`, `Paid`)
  - Update camp Confirmation status (`Pending`, `Confirmed`)
- 🔍 **Search Functionality**
  - Search services by name, date, location
- 🧪 RESTful API
  - Clean, predictable endpoints
  - Consistent JSON responses
  - Error handling with status codes

---

## 🧰 Technologies Used

| Category       | Technology                            |
| -------------- | ------------------------------------- |
| Backend        | Node.js, Express.js                   |
| Database       | MongoDB Atlas                         |
| Authentication | JWT (JSON Web Tokens)                 |
| Deployment     | Vercel                                |
| Utilities      | Mongoose, Cors, Dotenv, Cookie Parser |

---

## 📦 Dependencies

### Frontend Framework & UI
| Package | Version | Purpose |
| --- | --- | --- |
| **react** | ^19.1.0 | Core React framework |
| **react-dom** | ^19.1.0 | React DOM rendering |
| **@headlessui/react** | ^2.2.4 | Headless UI components |
| **@heroicons/react** | ^2.2.0 | Beautiful icon set |
| **daisyui** | ^5.0.43 | Tailwind CSS component library |

### Styling & Design
| Package | Version | Purpose |
| --- | --- | --- |
| **tailwindcss** | ^3.4.17 | Utility-first CSS framework |
| **@tailwindcss/vite** | ^4.1.11 | Tailwind CSS Vite plugin |
| **postcss** | ^8.5.6 | CSS post-processor |
| **autoprefixer** | ^10.4.21 | CSS vendor prefixes |

### Form & State Management
| Package | Version | Purpose |
| --- | --- | --- |
| **react-hook-form** | ^7.60.0 | Performant form handling |
| **@tanstack/react-query** | ^5.83.0 | Server state management |

### Routing & Navigation
| Package | Version | Purpose |
| --- | --- | --- |
| **react-router-dom** | ^7.6.3 | Client-side routing |

### API & HTTP
| Package | Version | Purpose |
| --- | --- | --- |
| **axios** | ^1.10.0 | HTTP client |

### Payments
| Package | Version | Purpose |
| --- | --- | --- |
| **@stripe/react-stripe-js** | ^3.9.0 | Stripe React integration |
| **@stripe/stripe-js** | ^7.8.0 | Stripe.js library |

### UI Components & Effects
| Package | Version | Purpose |
| --- | --- | --- |
| **react-datepicker** | ^8.4.0 | Date picker component |
| **react-paginate** | ^8.3.0 | Pagination component |
| **react-icons** | ^5.5.0 | Icon library |
| **swiper** | ^11.2.10 | Touch slider carousel |
| **recharts** | ^3.1.1 | Data visualization charts |
| **lottie-react** | ^2.4.1 | Animation library |

### Notifications & Alerts
| Package | Version | Purpose |
| --- | --- | --- |
| **react-hot-toast** | ^2.5.2 | Toast notifications |
| **react-toastify** | ^11.0.5 | Toast notifications |
| **sweetalert2** | ^11.22.2 | Beautiful alerts |

### Meta & Head Management
| Package | Version | Purpose |
| --- | --- | --- |
| **react-helmet** | ^6.1.0 | Dynamic meta tags |

### Backend & Firebase
| Package | Version | Purpose |
| --- | --- | --- |
| **firebase** | ^11.10.0 | Authentication & hosting |

### Utilities
| Package | Version | Purpose |
| --- | --- | --- |
| **date-fns** | ^4.1.0 | Date manipulation |
| **localforage** | ^1.10.0 | Offline storage |
| **match-sorter** | ^8.0.3 | Sorting & filtering |
| **sort-by** | ^1.2.0 | Array sorting utility |

### Dev Dependencies
| Package | Version | Purpose |
| --- | --- | --- |
| **vite** | ^7.0.0 | Build tool & dev server |
| **@vitejs/plugin-react** | ^4.5.2 | React plugin for Vite |
| **eslint** | ^9.29.0 | Code linter |
| **@eslint/js** | ^9.29.0 | ESLint rules |
| **eslint-plugin-react-hooks** | ^5.2.0 | React hooks linting |
| **eslint-plugin-react-refresh** | ^0.4.20 | React refresh linting |
| **@types/react** | ^19.1.8 | React TypeScript types |
| **@types/react-dom** | ^19.1.6 | React DOM TypeScript types |
| **globals** | ^16.2.0 | Global variables |

---

## 🌐 Base URL

All API requests should be made to:

```
https://medicalcampmanagesystemserver-70oakl2as-rupongomezs-projects.vercel.app/
```

---

## 🛠️ Core API Endpoints

### Camps

| Method | Route               | Description                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/addCamp`          | Add new camp                |
| GET    | `/camps`            | Get all camps (search/sort) |
| GET    | `/camp-details/:id` | Get single camp details     |
| PATCH  | `/update-camp/:id`  | Update camp                 |
| DELETE | `/delete-camp/:id`  | Delete camp                 |

### Registrations

| Method | Route                   | Description                      |
| ------ | ----------------------- | -------------------------------- |
| POST   | `/registrations/:email` | Register for camp                |
| GET    | `/registered-camps`     | Get user's registrations         |
| PATCH  | `/order-confirm`        | Confirm registration (organizer) |
| DELETE | `/cancel/:id`           | Cancel registration              |

### Payments

| Method | Route                    | Description           |
| ------ | ------------------------ | --------------------- |
| POST   | `/create-payment-intent` | Create payment intent |
| POST   | `/order`                 | Save payment          |

### Authentication

| Method | Route     | Description       |
| ------ | --------- | ----------------- |
| POST   | `/jwt`    | Login (get token) |
| GET    | `/logout` | Logout            |

### Feedback

| Method | Route       | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/feedback` | Submit feedback   |
| GET    | `/feedback` | Get all feedbacks |

> **Note**: Most routes require JWT authentication. Organizer-only routes are marked.

Authentication is handled using middleware: `verifyToken`,`verifyOrganizer`.

---

## 📁 Sample Request Format

### Add a New Service

```json
POST /addCamp

{
    "_id": "6624f8c5a182d48ce5cb3521",
    "campName": "ShutterStock Health Camp",
    "date": "2025-11-15T09:00:00.000Z",
    "description": "Comprehensive health screening camp with expert doctors",
    "image": "https://i.ibb.co.com/MYfWt2C/shutterstock-1474280513-1-1572933671.jpg",
    "location": "Downtown Community Center",
    "participantCount": 45,
    "campFees": 75,
    "healthCareProfessional": "Dr. Sarah Johnson",
    "organizerEmail": "organizer@gmail.com"
  }
```

---

## 🔐 JWT Authentication Flow

1. After logging in via Firebase on the frontend, user email is sent to:
   ```
   POST https://medicalcampmanagesystemserver-70oakl2as-rupongomezs-projects.vercel.app/jwt
   ```
2. Server generates a JWT token and sets it as a secure HTTP-only cookie.
3. Token is sent with every request to protected routes.
4. On logout, the cookie is cleared:
   ```
   GET https://medicalcampmanagesystemserver-70oakl2as-rupongomezs-projects.vercel.app/logout
   ```

---

## 🔒 Security & Deployment

- **Environment Protection**: All secrets stored in `.env` (never in code)
- **Strict CORS**: Whitelisted origins only
- **Secure Cookies**: HTTP-only, SameSite=None with Secure flag
- **Database**: MongoDB Atlas (fully managed cloud)
- **Hosting**: Live on Vercel with edge optimization
