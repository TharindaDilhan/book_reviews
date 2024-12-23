const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup MariaDB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "codingsl", // Change this to your MariaDB password
  database: "book_reviews"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MariaDB!");
  }
});

// Get all reviews
app.get("/reviews", (req, res) => {
    const { rating, sort } = req.query;
  
    let query = "SELECT * FROM reviews";
    const queryParams = [];
  
    // Apply rating filter
    if (rating) {
      query += " WHERE rating = ?";
      queryParams.push(rating);
    }
  
    // Apply sorting
    if (sort === "asc") {
      query += " ORDER BY date_added ASC";
    } else if (sort === "desc") {
      query += " ORDER BY date_added DESC";
    }
  
    db.query(query, queryParams, (err, results) => {
      if (err) return res.status(500).send(err);
  
      res.json(results);
    });
  });
  
  

// Add a review
app.post("/reviews", (req, res) => {
    const { book_title, review_text, rating } = req.body;
  
    if (!book_title || !review_text || !rating) {
      return res.status(400).json({ error: "All fields (book_title, review_text, rating) are required." });
    }
  
    db.query(
      "INSERT INTO reviews (book_title, review_text, rating) VALUES (?, ?, ?)",
      [book_title, review_text, rating],
      (err, result) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({ error: "Failed to add review." });
        }
  
        res.status(201).json({ id: result.insertId, book_title, review_text, rating });
      }
    );
  });
  
  
  

// Update a review
app.put("/reviews/:id", (req, res) => {
    const { id } = req.params;
    const { book_title, review_text } = req.body;
  
    console.log("Incoming data for update:", { id, book_title, review_text });
  
    // Validate that both fields exist
    if (!book_title || !review_text) {
      return res.status(400).json({ error: "Both book_title and review_text are required." });
    }
  
    // Perform the database update
    db.query(
      "UPDATE reviews SET book_title = ?, review_text = ? WHERE id = ?",
      [book_title, review_text, id],
      (err, result) => {
        if (err) {
          console.error("Database update error:", err);
          return res.status(500).send({ error: "Failed to update review." });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Review not found." });
        }
  
        console.log("Update successful for ID:", id);
        res.status(200).json({ id, book_title, review_text });
      }
    );
  });
  
  
  
  // Delete a review
  app.delete("/reviews/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM reviews WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Review not found." });
      }
      res.sendStatus(200);
    });
  });
  

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
