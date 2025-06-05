# 📘 MathonGO Chapter Dashboard API

A robust RESTful API built using **Node.js**, **Express**, **MongoDB**, and **Redis (via Upstash)** to manage and track chapter progress for educational platforms. This backend service supports uploading, retrieving, and filtering chapter data.

---

## 🚀 Features

- Upload chapters in bulk via JSON file (Admin-only access).
- Filter chapters by subject, class, unit, status, and weakness.
- Get chapter details by ID.
- Caching with **Upstash Redis** for performance optimization.
- Admin authentication for protected endpoints.
- Rate limiting to prevent abuse.

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Upstash Redis (via REST API)**
- **Multer** (for file uploads)
- **dotenv** (for environment variables)
- **CORS** (for API access)
- **Postman** (for testing and collection sharing)

---

## 🗂️ Project Structure

```bash
mathongo-dashboard-api/
├── config/
│   ├── db.js              # MongoDB connection
│   └── upstash.js         # Upstash Redis handler
├── controllers/
│   └── chapter.controller.js
├── middleware/
│   ├── adminAuth.js
│   ├── cache.js
│   └── rateLimiter.js
├── models/
│   └── Chapter.js         # Mongoose schema
├── routes/
│   └── chapter.routes.js
├── uploads/               # Temp folder for uploads
├── .env
├── app.js
└── package.json
📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/mathongo-dashboard-api.git
cd mathongo-dashboard-api
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:

bash
Copy
Edit
touch .env
Sample .env file:
env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mathongo_dashboard

UPSTASH_REDIS_REST_URL=https://your-upstash-endpoint.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
▶️ Running the Server
bash
Copy
Edit
npm start
Server will run on:
📍 http://localhost:5000

📮 API Endpoints
📤 Upload Chapters (Admin Only)
http
Copy
Edit
POST /api/v1/chapters
Headers:

x-admin: true

Form-Data:

file: JSON file containing chapters

📥 Get All Chapters (Cached)
http
Copy
Edit
GET /api/v1/chapters
Query Parameters (optional):

class, unit, status, subject, weakChapters=true|false, page, limit

🔍 Get Chapter by ID
http
Copy
Edit
GET /api/v1/chapters/:id
📘 Sample JSON File Format
json
Copy
Edit
[
  {
    "subject": "Maths",
    "chapter": "Trigonometry",
    "class": "12",
    "unit": "Unit 2",
    "yearWiseQuestionCount": { "2019": 5, "2020": 8 },
    "questionSolved": 7,
    "status": "In Progress",
    "isWeakChapter": true
  },
  {
    "subject": "Physics",
    "chapter": "Kinematics",
    "class": "11",
    "unit": "Unit 1",
    "yearWiseQuestionCount": { "2021": 4 },
    "questionSolved": 4,
    "status": "Completed",
    "isWeakChapter": false
  }
]
🔐 Admin Authentication
Set the following header to access admin routes:

yaml
Copy
Edit
x-admin: true
🚦 Rate Limiting
Max 30 requests per minute per IP.

Configurable in middleware/rateLimiter.js.

🧠 Caching
Cached using Upstash Redis.

Query parameters act as keys.

TTL: 3600 seconds (1 hour).

Invalidate cache automatically after upload using flushall.

🧪 Postman Collection
You can import the Postman collection by:

Exporting from Postman → Export as Collection v2.1

Or sharing a public link from your workspace

🤝 Contributing
Fork the repository

Create a new branch (git checkout -b feature-branch)

Commit your changes

Push to the branch (git push origin feature-branch)

Open a pull request 🎉

📄 License
MIT License

🙋‍♂️ Author
Your Name
Made with 💻 for MathonGO Assignment

