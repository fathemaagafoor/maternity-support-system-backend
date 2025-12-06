# Maternity Support System - API Routes

## Base URL
```
http://localhost:3000/api
```

## Admin Panel
```
http://localhost:3000/admin
```
Default login: admin@gmail.com / admin123 (change in .env file!)

---

## 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/signup` | No | Create new account |
| POST | `/signin` | No | Login to account |
| GET | `/me` | Yes | Get current user info |
| PUT | `/change-password` | Yes | Change password |

### Signup Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "mother"  // or "caregiver" or "doctor"
}
```

### Signin Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 👩 Mother Routes (`/api/mother`)
*All routes require authentication*

### Profile Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create mother profile |
| GET | `/me/profile` | Get my profile |
| PUT | `/me/profile` | Update my profile |
| GET | `/all` | Get all mothers (admin) |
| GET | `/:id` | Get one mother |

### Emergency Contacts (SOS)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me/emergency-contacts` | Get emergency contacts |
| POST | `/me/emergency-contacts` | Add emergency contact |
| DELETE | `/me/emergency-contacts/:contact_id` | Remove emergency contact |

### Pregnancy Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me/pregnancy-progress` | Get pregnancy progress (weeks, milestones) |
| POST | `/me/mark-delivery` | Mark baby as delivered |
| GET | `/me/weight-logs` | Get all weight logs |
| POST | `/me/weight-logs` | Log weight |
| GET | `/me/symptom-logs` | Get all symptom logs |
| POST | `/me/symptom-logs` | Log symptoms |
| GET | `/me/kick-counts` | Get all kick counts |
| POST | `/me/kick-counts` | Log baby kicks |
| GET | `/me/mood-logs` | Get all mood logs |
| POST | `/me/mood-logs` | Log mood |
| GET | `/me/checkups` | Get all checkup logs |
| POST | `/me/checkups` | Log doctor checkup |

### Create Profile Request Body:
```json
{
  "name": "Fathima",
  "phone_no": "9876543210",
  "age": 28,
  "is_pregnant": true,
  "expected_delivery_date": "2025-06-15",
  "address": "123 Main St, City"
}
```

### Emergency Contact Request Body:
```json
{
  "name": "Husband Name",
  "phone": "9876543211",
  "relation": "husband"
}
```

### Weight Log Request Body:
```json
{
  "weight": 65.5,
  "notes": "Feeling good"
}
```

### Symptom Log Request Body:
```json
{
  "symptoms": ["nausea", "fatigue", "back_pain"],
  "severity": "mild",
  "notes": "Morning sickness"
}
```
Severity options: `mild`, `moderate`, `severe`

### Kick Count Request Body:
```json
{
  "kicks": 10,
  "duration_minutes": 60,
  "notes": "Baby very active after lunch"
}
```

### Mood Log Request Body:
```json
{
  "mood": "happy",
  "notes": "Feeling positive today"
}
```
Mood options: `happy`, `calm`, `anxious`, `sad`, `tired`, `irritable`, `excited`

### Checkup Log Request Body:
```json
{
  "doctor_name": "Dr. Sharma",
  "venue": "City Hospital",
  "weight": 66,
  "blood_pressure": "120/80",
  "notes": "All normal, baby growing well"
}
```

### Mark Delivery Request Body:
```json
{
  "delivery_date": "2025-06-10",
  "delivery_type": "normal",
  "notes": "Healthy delivery, no complications"
}
```
Delivery type options: `normal`, `cesarean`

---

## 👶 Baby Routes (`/api/baby`)
*All routes require authentication*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Add a baby |
| GET | `/my-babies` | Get all my babies |
| GET | `/all` | Get all babies (admin) |
| GET | `/:id` | Get one baby |
| PUT | `/:id` | Update baby info |
| POST | `/:id/feeding` | Log feeding |
| GET | `/:id/feeding` | Get feeding logs |
| POST | `/:id/sleep` | Log sleep |
| GET | `/:id/sleep` | Get sleep logs |
| POST | `/:id/diaper` | Log diaper change |
| GET | `/:id/diaper` | Get diaper logs |
| POST | `/:id/vaccination` | Add vaccination record |
| GET | `/:id/vaccination` | Get vaccination records |

### Create Baby Request Body:
```json
{
  "name": "Baby Name",
  "gender": "female",
  "birth_weight": 3200,
  "birth_date": "2025-01-15"
}
```

### Feeding Log Request Body:
```json
{
  "type": "breast",  // breast, bottle, formula, solid
  "start_time": "2025-01-20T10:30:00",
  "duration_minutes": 15,
  "notes": "Fed well"
}
```

### Sleep Log Request Body:
```json
{
  "start_time": "2025-01-20T14:00:00",
  "end_time": "2025-01-20T16:00:00",
  "quality": "good",
  "notes": "Slept peacefully"
}
```

### Diaper Log Request Body:
```json
{
  "type": "wet",  // wet, dirty, both
  "time": "2025-01-20T11:00:00",
  "notes": ""
}
```

---

## 👩‍⚕️ Caregiver Routes (`/api/caregiver`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/all` | No | Get all approved caregivers |
| POST | `/create` | Yes | Create caregiver profile |
| GET | `/me/profile` | Yes | Get my caregiver profile |
| PUT | `/me/profile` | Yes | Update my profile |
| GET | `/:id` | Yes | Get one caregiver |

### Create Caregiver Profile Request Body:
```json
{
  "name": "Nurse Name",
  "phone_no": "9876543210",
  "age": 35,
  "experience_years": 5,
  "about": "Experienced in newborn care",
  "shift": "day",  // wholeday, day, night
  "amount": 2000
}
```

---

## 📅 Caregiver Booking Routes (`/api/caregiver-booking`)
*All routes require authentication*

### Mother Routes:
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create booking request |
| GET | `/my-bookings` | Get my bookings |
| PUT | `/:id/cancel` | Cancel booking |
| POST | `/:id/review` | Add review after completion |

### Caregiver Routes:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/for-me` | Get bookings assigned to me |
| PUT | `/:id/accept` | Accept booking |
| PUT | `/:id/reject` | Reject booking |
| PUT | `/:id/complete` | Mark as completed |

### Admin Routes:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/all` | Get all bookings |
| GET | `/:id` | Get one booking |

### Create Booking Request Body:
```json
{
  "caregiver_id": "caregiverId123",
  "start_date": "2025-02-01",
  "end_date": "2025-02-07",
  "shift": "wholeday",
  "accommodation": "with_food",
  "total_amount": 14000,
  "address": "123 Main St",
  "notes": "Need help with newborn care"
}
```

### Add Review Request Body:
```json
{
  "rating": 5,
  "comment": "Very helpful and caring"
}
```

---

## 🏥 Appointment Routes (`/api/appointment`)
*All routes require authentication*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create appointment |
| GET | `/my-appointments` | Get my appointments |
| GET | `/all` | Get all appointments (admin) |
| GET | `/:id` | Get one appointment |
| PUT | `/:id` | Update appointment |
| DELETE | `/:id` | Delete appointment |

### Create Appointment Request Body:
```json
{
  "title": "Monthly Checkup",
  "venue_type": "hospital",
  "venue_name": "City Hospital",
  "doctor_name": "Dr. Smith",
  "date": "2025-02-15",
  "time": "10:30 AM",
  "notes": ""
}
```

---

## 🏥 Hospital Routes (`/api/hospital`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Add hospital |
| GET | `/` | Get all hospitals |
| GET | `/:id` | Get one hospital |

---

## 👨‍⚕️ Doctor Routes (`/api/doctor`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Add doctor |
| GET | `/` | Get all doctors |
| GET | `/:id` | Get one doctor |

---

## 💉 Vaccine Routes (`/api/vaccine`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Add vaccine |
| GET | `/` | Get all vaccines |
| GET | `/:id` | Get one vaccine |

---

## 📚 Article Routes (`/api/article`) - Discover Tab
*Public routes - no authentication needed for reading*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all articles (with filters) |
| GET | `/featured` | Get 5 latest articles |
| GET | `/categories` | Get all categories with counts |
| GET | `/category/:category` | Get articles by category |
| GET | `/:id` | Get full article by ID |

### Query Parameters for GET `/`:
- `category` - Filter by category (meal_plan, tips, exercise, etc.)
- `stage` - Filter by stage (pregnancy, postpartum, both)
- `search` - Search in title/content/tags

### Categories:
| ID | Display Name |
|----|-------------|
| `meal_plan` | Meal Plans |
| `tips` | Tips & Tricks |
| `exercise` | Exercise |
| `mental_health` | Mental Health |
| `baby_care` | Baby Care |
| `nutrition` | Nutrition |
| `pregnancy` | Pregnancy |
| `postpartum` | After Delivery |

### Article Response Example:
```json
{
  "_id": "abc123",
  "title": "Healthy Eating During First Trimester",
  "summary": "Essential nutrition tips for the first 12 weeks",
  "category": "nutrition",
  "for_stage": "pregnancy",
  "image_url": "https://example.com/image.jpg",
  "tags": ["first_trimester", "diet", "vitamins"],
  "read_time_minutes": 5,
  "is_published": true,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Note**: Admin creates articles via AdminJS panel at `/admin`

---

## How to Use Authentication

1. Signup or Signin to get a token
2. Add token to all requests that need authentication:

```
Authorization: Bearer <your_token_here>
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (missing data) |
| 401 | Not Authorized (need to login) |
| 404 | Not Found |
| 500 | Server Error |
