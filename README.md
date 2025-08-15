# 🏥 Medico+ Frontend — Medical Campaign Web Application

This is the frontend for **Medico+**, a Campaign sharing web application that allows users to create, manage, book, and update Campaign. Built with Express.js and MongoDB, this RESTful API supports JWT-based authentication and secure CRUD operations.

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
