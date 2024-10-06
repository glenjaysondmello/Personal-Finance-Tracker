const express = require("express");
const admin = require("firebase-admin");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

const path = require("path");
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.post("/add-transaction", async (req, res) => {
  try {
    const { userId, amount, category, type, date } = req.body;
    const transaction = {
      userId,
      amount,
      category,
      type,
      date: admin.firestore.Timestamp.fromDate(new Date(date)),
    };
    await db.collection("transaction").add(transaction);
    res.status(200).json("Transaction added Successfully");
  } catch (err) {
    res.status(500).json("Error adding Transaction");
  }
});

app.get("/transaction", async (req, res) => {
  try {
    const { userId } = req.query;
    const transactionRef = db
      .collection("transaction")
      .where("userId", "==", userId);
    const snapshot = await transactionRef.get();

    if (snapshot.empty) {
      res.status(404).json("No transaction found");
      return;
    }

    const transactions = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        date: data.date.toDate().toISOString(),
      };
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json("Error fetching Transaction");
  }
});

app.listen(8000, () => {
  console.log("Server is Running");
});
