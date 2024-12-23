import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddReviewForm from "./components/AddReviewForm";
import ReviewList from "./components/ReviewList";

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Review</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ReviewList reviews={reviews} />} />
        <Route path="/add" element={<AddReviewForm onAddReview={handleAddReview} />} />
        {/* Default route redirects to "/" */}
        <Route path="*" element={<ReviewList reviews={reviews} />} />
      </Routes>
    </Router>
  );
}

export default App;
