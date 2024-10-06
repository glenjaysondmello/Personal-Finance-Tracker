import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { signInAnonymously } from "firebase/auth";
import axios from "axios";

const Tracker = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    category: "",
    type: "Select",
    date: "",
    time: "",
  });

  useEffect(() => {
    signInAnonymously(auth).then((userCredential) => {
      setUser(userCredential.user);
    });
  }, []);

  const fetchTransactions = async () => {
    if (user) {
      const res = await axios.get("http://localhost:8000/transaction", {
        params: { userId: user.uid },
      });
      setTransactions(res.data);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const transaction = {
        ...newTransaction,
        userId: user.uid,
        date: `${newTransaction.date}T${newTransaction.time}`,
      };
      await axios.post("http://localhost:8000/add-transaction", transaction);
      setNewTransaction({
        amount: "",
        category: "",
        type: "Select",
        date: "",
        time: "",
      });
      fetchTransactions();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Personal Finance Tracker
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="number"
              placeholder="Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, amount: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTransaction.category}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  category: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTransaction.type}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, type: e.target.value })
              }
            >
              <option value="select">Select</option>
              <option value="income">Income</option>
              <option value="expence">Expense</option>
            </select>

            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, date: e.target.value })
              }
              required
            />

            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTransaction.time}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, time: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all duration-300"
          >
            Add Transaction
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Transactions
          </h2>
          <ul className="space-y-2">
            {sortedTransactions.map((transaction, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <span>{formatDate(transaction.date)}</span>
                <span className="font-medium text-gray-700">
                  {transaction.category}
                </span>
                <span className="font-semibold text-green-500">
                  ${transaction.amount}
                </span>
                <span
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
