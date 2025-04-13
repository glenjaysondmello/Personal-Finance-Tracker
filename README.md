# Personal Finance Tracker

This is a full-stack Personal Finance Tracker web application that allows users to anonymously log, view, and manage their income and expense transactions. It uses Firebase for authentication, Firestore for data storage, and Express.js for backend APIs. The frontend is built using React and Tailwind CSS.

## Features

- Anonymous user authentication via Firebase
- Add, view, and manage personal finance transactions
- Income and expense categorization
- Data persisted in Firestore (Firebase Cloud Firestore)
- Responsive UI built using Tailwind CSS

---

## Technologies Used

### Frontend:
- React.js (vite)
- Tailwind CSS
- Axios
- Firebase Authentication (Anonymous Sign-in)

### Backend:
- Node.js
- Express.js
- Firebase Admin SDK (Firestore)
- CORS for cross-origin requests

---

## Folder Structure

```
├── client
│   ├── App.jsx
│   ├── Tracker.jsx
│   ├── firebase-config.js
│   ├── index.css
│   └── main.jsx
├── server
│   ├── index.js
│   └── serviceAccountKey.json
```

---

## Setup Instructions

### 1. Clone the repository
```bash
https://github.com/your-username/finance-tracker.git
cd finance-tracker
```

### 2. Install Dependencies

#### For Client:
```bash
cd client
npm install
```

#### For Server:
```bash
cd server
npm install
```

### 3. Firebase Setup
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Anonymous Authentication
- Create a Firestore database
- Generate a new private key under Project Settings > Service Accounts > Generate New Private Key
- Save it as `serviceAccountKey.json` in your `server` directory

### 4. Environment Variables for Frontend
Create a `.env` file in the root of your client project with:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 5. Start the Server
```bash
cd server
node index.js
```
Runs on [http://localhost:8000](http://localhost:8000)

### 6. Start the Client
```bash
cd client
npm run dev
```
Runs on [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

### `POST /add-transaction`
Add a new transaction to Firestore.

**Request Body:**
```json
{
  "userId": "string",
  "amount": "number",
  "category": "string",
  "type": "income | expense",
  "date": "ISODateString"
}
```

### `GET /transaction?userId=xyz`
Fetch all transactions for a specific user.

**Query Parameter:**
- `userId`: Firebase Auth UID

---

## Deployment Suggestions

- Use Firebase Hosting or Vercel for deploying the React app
- Host the Express backend on services like Render, Railway, or Firebase Cloud Functions

---

## Future Enhancements

- Add authentication with Google/Email
- Add edit and delete options for transactions
- Monthly/Weekly financial reports
- Charts and analytics (e.g., using Chart.js or Recharts)

---

## License
MIT License

